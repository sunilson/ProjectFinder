var express = require('express');
var router = express.Router();
var ObjectOperations = require("../utils/objectOperations");
var UserModel = require("../data/models/UserModel");
var ProjectModel = require("../data/models/ProjectModel");
var ApplicationModel = require("../data/models/ProjectApplicationModel");
var UserVariables = require("../variables/UserVariables");
const Transaction = require('mongoose-transactions')

router.post('/account', (req, res, next) => {
    validationService.sendDeletionVerification(req.user).then(() => {
        res.sendStatus(200);
    }).catch((error) => {
        next(error);
    });
});

router.get('/account', (req, res, next) => {

    let token = req.query.token;

    ResetTokenModel.findOne({
        resetToken: token
    }).lean().exec().then((result) => {
        if (!validationService.validateToken(result)) return res.status(400).send("Invalid token!");
        return UserModel.findById(result.userID).lean().exec().then((user) => {
            res.send(dots.deleteAccount({
                user: user,
                token: token,
                error: (req.query.error) ? req.query.error : ""
            }));
        }).catch((error) => {
            return res.status(400).send("User not found!");
        });
    }).catch((e) => {
        next(e);
    });
});


//TODO
router.post('/account/confirm', (req, res, next) => {
    let token = req.body.token;

    async function start() {
        const tokenResult = ResetTokenModel.findOne({
            resetToken: token
        }).exec();

        if (!validationService.validateToken(tokenResult)) return res.status(400).send("Invalid token!");

        //Delete Project
        //Delete From Projects where Member
        //Delete Applications
        //Delete Applications from Projects of other members
        //Delete User
        //Delete chat messages
    }

    start();
});

module.exports = router;