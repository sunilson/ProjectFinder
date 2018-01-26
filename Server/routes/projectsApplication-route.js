var express = require('express');
var router = express.Router();
var projectService = require('../services/project-service');
var ObjectOperations = require("../utils/objectOperations");
var ProjectModel = require("../data/models/ProjectModel");
var userModel = require("../data/models/UserModel");
var ApplicationModel = require("../data/models/ProjectApplicationModel");
var NotificationService = require("../services/NotificationService");

//Route for adding new Applications for Projects
router.post('/', (req, res, next) => {

    let parsedApplication = ObjectOperations.parseObject(req.body.data);
    parsedApplication.status = 1;
    let id = req.user._id;
    let projectAuthorID;
    let projectTitle;

    //Check if applicant is author of project 
    ProjectModel.findById(parsedApplication.project).lean().exec().then((project) => {

        if (!project) {
            let error = new Error("Incorrect project!");
            error.status = 400;
            throw error;
        }

        if (id == project.author) {
            let error = new Error("Application from author not allowed!");
            error.status = 400;
            return next(error);
        }

        if (project.status != 0) {
            let error = new Error("Project already closed!");
            error.status = 400;
            return next(error);
        }

        projectAuthorID = project.author.toString();
        projectTitle = project.title;

        //Check if author already applied
        return ApplicationModel.find({
            author: id,
            project: parsedApplication.project
        }).lean().exec()
    }).then((result) => {

        if (result && result.length > 0) {
            let error = new Error("Duplicate application not allowed!");
            error.status = 400;
            throw error;
        }

        return projectService.saveProjectApplication(parsedApplication, req.user);
    }).then((result) => {
        NotificationService.sendNewApplicationNotification(projectAuthorID, result.project.toString(), result._id.toString(), projectTitle);
        return res.status(201).json({
            "applicationId": result.id.toString()
        });
    }).catch((error) => {
        if (error) return next(error);
    });
});

router.post('/decline/:id', (req, res, next) => {
    if (!req.params.id) {
        return res.sendStatus(400);
    }

    //ID of requesting user
    let id = req.user._id;

    let applicationAuthor;
    let applicationID;
    let projectTitle;
    let project;

    //Check if user is author of project
    ApplicationModel.findById(req.params.id).exec().then((application) => {
        applicationResult = application;
        return ProjectModel.findById(application.project);
    }).then((projectResult) => {
        project = projectResult;
        if (project.author.toString() != id) {
            let error = new Error("Not authorized");
            error.status = 401;
            throw error;
        }
        applicationID = applicationResult.id.toString();
        applicationAuthor = applicationResult.author.toString();
        projectTitle = project.title;
        applicationResult.status = 0;
        return applicationResult.save();
    }).then(() => {
        NotificationService.sendApplicationChangedNotification(applicationAuthor, applicationID, projectTitle, 0);
        res.sendStatus(200);
    }).catch((error) => {
        next(error);
    });

});


router.post('/accept/:id', (req, res, next) => {

    if (!req.params.id) {
        return res.sendStatus(400);
    }

    //ID of requesting user
    let id = req.user._id;

    let applicationAuthor;
    let applicationID;
    let applicationResult;
    let projectTitle;
    let project;

    //Check if user is author of project
    ApplicationModel.findById(req.params.id).exec().then((application) => {
        applicationResult = application;
        return ProjectModel.findById(application.project);
    }).then((projectResult) => {
        project = projectResult;
        if (project.author.toString() != id) {
            let error = new Error("Not authorized");
            error.status = 401;
            throw error;
        }

        applicationID = applicationResult.id.toString();
        applicationAuthor = applicationResult.author.toString();
        projectTitle = project.title;
        applicationResult.status = 2;
        return applicationResult.save();
    }).then(() => {
        return ProjectModel.update({
            _id: applicationResult.project
        }, {
            $addToSet: {
                members: applicationResult.author
            }
        });
    }).then(() => {
        return userModel.update({
            _id: applicationResult.author
        }, {
            $addToSet: {
                memberProjects: applicationResult.project
            }
        });
    }).then(() => {
        NotificationService.sendApplicationChangedNotification(applicationAuthor, applicationID, projectTitle, 2);
        res.sendStatus(200);
    }).catch((error) => {
        next(error);
    });

});

router.get('/:id', (req, res, next) => {

    //Id of requesting user
    let id = req.user._id;

    ApplicationModel.findById(req.params.id).populate({
        path: "project",
        select: "author",
        populate: {
            path: "author",
            select: "_id"
        }
    }).populate({
        path: "author",
        select: "firstname lastname email profilepicture tags",
        populate: {
            path: "tags"
        }
    }).exec().then((result) => {
        if (!result) {
            var error = new Error("Application not found");
            error.status = 404;
            throw error;
        }

        if (id != result.author.id && id != result.project.author.id) {
            return res.sendStatus(401);
        }

        return res.status(200).json(result);
    }).catch((error) => {
        return next(error);
    });
});

module.exports = router;