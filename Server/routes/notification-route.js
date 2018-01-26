var express = require('express');
var router = express.Router();
var projectService = require('../services/project-service');
var ObjectOperations = require("../utils/objectOperations");
var TagsModel = require("../data/models/TagsModel");
var NotificationModel = require("../data/models/NotificationTokenModel");
var NotificationService = require("../services/notificationService");

router.get("/", (req, res, next) => {
    async function start() {
        try {
            await NotificationService.test();
            res.sendStatus(200);
        } catch (e) {
            next(e);
        }

    }

    start();
});

router.post('/token', (req, res, next) => {

    let id = req.user._id;
    let token = req.body.token;

    if (!token) {
        return res.sendStatus(400);
    }

    async function start() {
        try {
            const alreadyExists = await NotificationModel.findOne({
                notificationToken: token
            }).exec();

            if (alreadyExists) {
                res.sendStatus(200);
            } else {
                await new NotificationModel({
                    userID: id,
                    notificationToken: token
                }).save();

                res.sendStatus(201);
            }
        } catch (e) {
            next(e);
        }
    }

    start();
});

module.exports = router;