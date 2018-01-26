const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const cfg = require("../config.js");
const mongoose = require("mongoose");
const refreshTokenModel = require("../data/models/RefreshTokenModel");
const ValidationTokenModel = require("../data/models/ValidationTokenModel");
const UserModel = require("../data/models/UserModel");
const validator = require("validator");
const GoogleAuth = require('google-auth-library');
const auth = new GoogleAuth;
const client = new auth.OAuth2(cfg.googleAuthClientId, '', '');
const userService = require("../services/userService");
const tokenService = require("../services/tokenService");
const UserVariables = require("../variables/UserVariables");
const ObjectOperations = require("../utils/objectOperations");
const validationService = require("../services/validationService");
const ResetTokenModel = require("../data/models/ResetTokenModel");
const moment = require("moment");
const passwordHash = require("password-hash");
const dots = require("dot").process({
    path: "./web-templates"
});

//Get new access token with refresh Token
router.post('/refreshToken', function (req, res) {
    if (!req.body.refreshToken) {
        return res.sendStatus(400);
    }
    //Get data from request
    const refreshToken = req.body.refreshToken;

    //Get token from database
    refreshTokenModel.findOne({
        refreshToken: refreshToken
    }).lean().exec((err, token) => {
        if (err) throw err;

        //Check if token is valid and not expired
        if (!token) {
            return res.sendStatus(400);
        }

        //Check if refresh token is valid and not expired
        jwt.verify(token.refreshToken, cfg.jwtRefreshSecret, (error, decoded) => {
            if (error) {
                res.sendStatus(401);
            } else {
                var userId = decoded.id;
                var accessToken = tokenService.generateToken(userId);
                res.status(200).json({
                    accessToken: accessToken
                })
            }
        });
    });
});

//Login and register via social networks
router.post("/socialLogin", function (req, res, next) {

    if (!req.body.token || !req.body.network) {
        return res.sendStatus(401);
    }

    //Get values from POST
    const token = req.body.token;
    const network = req.body.network;

    //Login via Google Authentication
    if (network === UserVariables.type.google) {
        client.verifyIdToken(token, "475022388364-nfcpv4ak0amnjhl0tksima99j1m8efns.apps.googleusercontent.com", (error, login) => {
            if (error) return next(error);

            const payload = login.getPayload();
            //Check if user already exists
            var existingUser = {};
            query = {
                email: payload.email
            };
            findUser(query).then((user) => {
                //User doesn't exist
                if (!user) {
                    //Create new user
                    return userService.saveUser({
                        username: payload.name,
                        email: payload.email,
                        type: UserVariables.type.google,
                        firstname: payload.given_name,
                        lastname: payload.family_name,
                        profilepicture: payload.picture,
                        activated: true
                    })
                } else {
                    existingUser = user;
                }
            }).then((result) => {
                //Generate tokens for return
                if (result) existingUser = result;
                socialLoginGenerateTokens(existingUser, res, next);
            }).catch((error) => {
                return next(error);
            });
        });
    } else {
        return res.sendStatus(401);
    }
});

//Login with email and password
router.post('/login', function (req, res, next) {
    if (!req.body || !req.body.name || !req.body.password) {
        return res.sendStatus(400);
    }

    const name = req.body.name;
    const password = req.body.password;

    //Compare request data with database and retrieve user object
    let query = {};
    if (validator.isEmail(name)) {
        query = {
            email: name
        };
    } else {
        query = {
            username: name
        };
    }

    findUser(query).then((result) => {
        checkLoginData(result, password, res, next);
    }).catch((error) => {
        next(error);
    });
});

//User clicked link in email. This route renders a form and first checks if the token of the request is still valid
router.get('/resetPassword', (req, res, next) => {
    if (!req.query.token) {
        return res.status(400).send("Invalid token!");
    }
    const token = req.query.token;

    ResetTokenModel.findOne({
        resetToken: token
    }).lean().exec().then((result) => {
        if (!validationService.validateToken(result)) {
            return res.send(dots.resetError({
                error: "Token not valid!"
            }));
        }
        return UserModel.findById(result.userID).lean().exec().then((user) => {
            res.send(dots.resetPassword({
                user: user,
                token: token,
                error: (req.query.error) ? req.query.error : ""
            }));
        }).catch((error) => {
            return res.send(dots.resetError({
                error: "User not found!"
            }));
        });
    }).catch((e) => {
        next(e);
    });
});

//Action from new password form
router.post("/newPassword", (req, res, next) => {
    if (!req.body.token) {
        return res.status(400).send("Invalid token!");
    }
    const token = req.body.token;

    ResetTokenModel.findOne({
        resetToken: token
    }).exec().then((result) => {
        if (!validationService.validateToken(result)) return res.status(400).send("Invalid token!");
        if (!req.body.password || !req.body.password2 || req.body.password !== req.body.password2) return res.sendStatus(400);

        return UserModel.findById(result.userID).exec().then((user) => {
            user.password = req.body.password;
            return user.save();
        }).then((saveResult) => {
            return result.remove();
        }).then(() => {
            refreshTokenModel.remove({
                userID: result.userID
            });
            res.send(dots.resetSuccess());
        }).catch((error) => {
            return res.redirect('/auth/resetPassword?token=' + token + "&error=" + error.message);
        });
    }).catch((e) => {
        next(e);
    });
});

//Generate token and send it to user via email to reset password
router.post('/resetPassword', (req, res, next) => {
    if (!req.body.name) {
        return res.sendStatus(400);
    }
    const name = req.body.name;

    UserModel.findOne({
        $or: [{
            'username': name
        }, {
            'email': name
        }]
    }).lean().exec().then((user) => {
        if (!user) return res.sendStatus(200);
        return validationService.sendResetVerification(user);
    }).then(() => {
        res.sendStatus(200);
    }).catch((error) => {
        next(error);
    });
});

//Route to register new User with email and password
router.post('/register', function (req, res, next) {

    const parsedUser = ObjectOperations.parseObject(req.body.data);

    var results = {}
    //Validate and save data to database
    userService.saveUser(parsedUser).then((user) => {
        //User was succesfully inserted
        //Generate fresh tokens so user can login immediately
        results.user = user;
        return tokenService.generateTokens(user.id);
    }).then((tokens) => {
        //Send verification mail to new user
        results.tokens = tokens;
        return validationService.sendVerification(results.user.id, results.user.email);
    }).then((validationResult) => {
        //Return login tokens to the requester
        return res.status(201).json({
            tokens: {
                accessToken: results.tokens.accessToken,
                refreshToken: results.tokens.refreshToken
            }
        });
    }).catch((err) => {
        //If user can't be saved, give error to error handler
        return next(err);
    });
});

//Route to verify account via link that was sent to the users email
router.get('/verify', function (req, res, next) {

    if (!req.query.token) {
        //No token given
        return res.sendStatus(401);
    }

    const token = req.query.token;
    //Find verification Token
    ValidationTokenModel.findOne({
        validationToken: token
    }).exec((error, result) => {
        if (error) return next(error);
        //If a token has been found
        if (!result) {
            //No token found
            return res.send(dots.accountActivationError({
                error: "Token not valid!"
            }));
        }

        //Get userID from database entry and set user to activated
        var id = result.userID;
        UserModel.update({
            _id: id
        }, {
            activated: true
        }, null, (error) => {
            if (error) return next(error);
            //Remove verification token
            result.remove((error, result) => {
                if (error) return next(error);
                //Return success to client
                res.send(dots.accountActivationSuccess({}));
            });
        });
    });
});

//Check if login data is correct and return access/refresh tokens and the user details
function checkLoginData(user, password, res, next) {
    //Check if user is already activated
    if (!user.activated) {
        let error = new Error("User not verified!");
        error.status = 401;
        return next(error);
    }

    if (user && user.type === UserVariables.type.standard && passwordHash.verify(password, user.password)) {
        //Generate fresh tokens
        tokenService.generateTokens(user._id).then((tokens) => {
            //Return the tokens to the requester
            delete user.password;
            res.json({
                tokens: {
                    accessToken: tokens.accessToken,
                    refreshToken: tokens.refreshToken
                },
                user: user
            });
        }).catch((error) => {
            return next(error);
        });
    } else {
        res.sendStatus(400);
    }
}

//Generate access and refresh token to return
function socialLoginGenerateTokens(user, res, next) {
    tokenService.generateTokens(user._id).then((tokens) => {

        delete user.password;

        res.status(201).json({
            tokens: {
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken
            },
            user: user
        });
    }).catch((error) => {
        return next(error);
    });
}

function findUser(query) {
    return UserModel.findOne(query).populate({
            path: 'applications',
            populate: [{
                    path: "author",
                    select: "firstname lastname profilepicture"
                },
                {
                    path: "project",
                    select: "title"
                }
            ]
        }).populate({
            path: "memberProjects",
            select: "author title startDate status",
            populate: {
                path: "author",
                select: "firstname lastname profilepicture"
            }
        }).populate("ownProjects", "title startDate _id status")
        .populate("tags").exec();
}

module.exports = router;