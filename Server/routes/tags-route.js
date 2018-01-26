var express = require('express');
var router = express.Router();
var projectService = require('../services/project-service');
var ObjectOperations = require("../utils/objectOperations");
var TagsModel = require("../data/models/TagsModel");
var allSkills = require("./skills");

router.get('/new', (req, res, next) => {

    //TODO Nur Admin erlauben

    TagsModel.remove().then(() => {
        let promises = [];
        for (let skill of allSkills.skills) {
            promises.push(new TagsModel({
                title: skill
            }).save());
        }

        Promise.all(promises).then(() => {
            res.sendStatus(201);
        }).catch(e => {
            console.log(e);
        })
    })
});

router.get('/', (req, res, next) => {
    TagsModel.find({}).sort("title").lean().exec().then((result) => {
        res.status(200).json(result);
    }).catch((e) => {
        next(e);
    });
});

module.exports = router;