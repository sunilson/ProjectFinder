var randtoken = require("rand-token");
var ValidationTokenModel = require("../data/models/ValidationTokenModel");
var ResetTokenModel = require("../data/models/ResetTokenModel");
var cfg = require("../config.js");
var mailgun = require('mailgun-js')({
    apiKey: cfg.mailGunKey,
    domain: cfg.mailGunDomain
});
var AccountActivationTemplate = require("../mail-templates/en/account-activation");
var ResetPasswordTemplate = require("../mail-templates/en/reset-password");
var DeleteAccountTemplate = require("../mail-templates/en/delete-account");
var projectVariables = require("../variables/ProjectVariables");
var userVariables = require("../variables/UserVariables");
var moment = require("moment");
var tokenService = module.exports = {};

/**
 * This service is used for sending verification emails
 */

tokenService.sendVerification = function (id, email) {

    return new Promise((resolve, reject) => {
        var token = randtoken.generate(24);

        new ValidationTokenModel({
            userID: id,
            validationToken: token
        }).save((err, result) => {
            if (err) reject(err);

            //Send verification email !!!Dont use arrow function, it breaks the code!!!
            var template = new AccountActivationTemplate(email, token);
            mailgun.messages().send(template.message, function (error, body) {
                if (error) return reject(error);
                resolve();
            });
        });
    });
}

tokenService.sendDeletionVerification = function (user) {
    return new Promise((resolve, reject) => {
        var token = randtoken.generate(24);

        new ResetTokenModel({
            userID: user._id,
            resetToken: token,
            expires: new Date(Date.now() + userVariables.deletion.token.expiresIn)
        }).save().then((res) => {
            var template = new DeleteAccountTemplate(user, token);

            mailgun.messages().send(template.message, function (error, body) {
                if (error) reject(error);
                resolve();
            });
        }).catch((error) => {
            reject(error);
        });
    });
}

tokenService.sendResetVerification = function (user) {

    return new Promise((resolve, reject) => {
        var token = randtoken.generate(24);

        new ResetTokenModel({
            userID: user._id,
            resetToken: token,
            expires: new Date(Date.now() + projectVariables.resetToken.expiresIn)
        }).save().then((res) => {
            var template = new ResetPasswordTemplate(user, token);

            mailgun.messages().send(template.message, function (error, body) {
                if (error) reject(error);
                resolve();
            });
        }).catch((error) => {
            reject(error);
        });
    });
}

tokenService.validateToken = function (token) {
    if (!token) return false;

    let date = moment(token.expires);
    if (!moment(token.expires).isAfter(moment())) {
        return false;
    }

    return true;
}