const express = require('express');
const router = express.Router();
const projectService = require('../services/project-service');
const ObjectOperations = require("../utils/objectOperations");
const TagsModel = require("../data/models/TagsModel");
const ProjectModel = require("../data/models/ProjectModel");
const searchTools = require("../utils/searchTools");
const config = require("../config");
const algoliasearch = require("algoliasearch");
const ProjectVariables = require("../variables/ProjectVariables");
const UserVariables = require("../variables/UserVariables");
const algoliaClient = algoliasearch(config.algolia.appId, config.algolia.apiKey);
const algoliaProjectIndex = algoliaClient.initIndex('pro5_projects');
const ApplicationModel = require("../data/models/ProjectApplicationModel");
algoliaProjectIndex.setSettings(config.algoliaIndexSettings);
const UserModel = require("../data/models/UserModel");
const NotificationService = require("../services/NotificationService");
const Transaction = require('mongoose-transactions');

//Edit a project
router.put('/edit', (req, res, next) => {

});

//Get projects that fit the tags of a user
router.get('/interestingProjects', (req, res, next) => {

    let user = req.user;
    if (!user.tags) {
        user.tags = [];
    }
    ProjectModel.find({
        tags: {
            "$in": user.tags
        },
        author: {
            "$ne": user._id
        },
        startDate: {
            $gte: new Date()
        },
        location: null
    }).limit(5).select("title author startDate payment status").populate("author", "firstname lastname profilepicture").exec().then((result) => {
        res.status(200).json(result);
    }).catch((error) => {
        next(error);
    });
});

//Creating a new project
router.post('/new', (req, res, next) => {

    //Parse project from HTTP Body
    const parsedProject = ObjectOperations.parseObject(req.body.data);

    //Save project to database
    projectService.saveProject(parsedProject, req.user).then((result) => {

        //Update search index
        let searchIndex = {};
        searchIndex["description"] = result.description;
        searchIndex["projectId"] = result.id;
        searchIndex["title"] = result.title;
        searchIndex["date"] = Date.parse(result.startDate);
        searchIndex["_tags"] = [];

        result.tags.forEach(element => {
            searchIndex["_tags"].push(element);
        });

        if (result.payment && result.payment.paid) {
            searchIndex["_tags"].push("paid");
        }

        if (result.location && result.location.coordinates) {
            searchIndex["_geoloc"] = {
                lat: result.location.coordinates[0],
                lng: result.location.coordinates[1]
            }
        }

        searchIndex["objectID"] = result.id;
        algoliaProjectIndex.addObject(searchIndex);
        return res.status(201).json(result);
    }).catch((error) => {
        if (error) return next(error);
    });
});

//Delete a specific project
router.delete('/:id', (req, res, next) => {
    const id = req.user._id;

    if (!req.params.id) {
        return res.status(400).json({});
    }

    let projectID = req.params.id;

    const transaction = new Transaction();

    async function start() {
        try {
            //Find project
            const project = await ProjectModel.findById(projectID).exec();
            if (!project) {
                let error = new Error("Project not found");
                error.status = 400;
                throw error;
            }

            //Only allowed when user is author of project
            if (project.author.toString() != id) {
                let error = new Error("Not author");
                error.status = 400;
                throw error;
            }

            //Remove all applications from database
            for (let application of project.applications) {
                transaction.remove("Application", application);
            }

            //Find all users who had an application
            const applicationUsers = await UserModel.find({
                applications: {
                    $in: project.applications
                }
            }).exec();

            //Remove applications from users and update them
            for (let user of applicationUsers) {
                for (let i = 0; i < user.applications.length; i++) {
                    if (project.applications.includes(user.applications[i])) {
                        user.applications.splice(i, 1);
                    }
                }
                let array = user.applications.slice(0);
                transaction.update("User", user.id, {
                    applications: array
                });
            }

            //Find all users who were members of the project
            const projectUsers = await UserModel.find({
                memberProjects: projectID
            }).exec();

            //Remove projects from users and update user Objects
            for (let user of projectUsers) {
                for (let i = 0; i < user.memberProjects.length; i++) {
                    if (user.memberProjects[i] == projectID) {
                        user.memberProjects.splice(i, 1);
                        i = user.memberProjects.length;
                    }
                }

                let array = user.memberProjects.slice(0);
                transaction.update("User", user.id, {
                    memberProjects: array
                });
            }

            //Delete the project itself
            transaction.remove("Project", projectID);
            const result = await transaction.run();

            //Delete from search index
            algoliaProjectIndex.deleteObject(projectID);
            //Notify users about removed project
            NotificationService.sendProjectRemovedNotification(project);

            res.sendStatus(200);
        } catch (e) {
            next(e);
            await transaction.rollback().catch(console.log("Rollback failed"));
            transaction.clean();
        }
    }

    start();
});

//Get information of a single user
router.get('/user', (req, res, next) => {
    UserModel.findById(req.user._id).populate({
        path: 'applications',
        populate: [{
                path: "author",
                select: "firstname lastname profilepicture"
            },
            {
                path: "project",
                select: "title status"
            }
        ]
    }).populate({
        path: "memberProjects",
        select: "author title startDate status",
        populate: {
            path: "author",
            select: "firstname lastname profilepicture"
        }
    }).populate("ownProjects", "title startDate _id status").populate("tags").exec().then((user) => {
        delete user.password;
        res.status(200).json(user);
    }).catch((error) => {
        next(error);
    });
});

//Route to close a project. A closed project cannot be joined or be applied to anymore
router.post("/close", (req, res, next) => {
    const projectID = req.body.projectID;
    const id = req.user._id;

    if (!projectID) return res.sendStatus(400);

    const transaction = new Transaction();
    async function start() {
        try {
            const project = await ProjectModel.findById(projectID).exec();

            if (!project) {
                let error = new Error("Project not found");
                error.status = 400;
                throw error;
            }

            if (id != project.author.toString()) {
                let error = new Error("Wrong user");
                error.status = 400;
                throw error;
            }

            for (let application of project.applications) {
                transaction.remove("Application", application);
            }

            project.applications = [];
            transaction.update("Project", projectID, {
                applications: project.applications,
                status: 1
            });

            const result = await transaction.run();

            algoliaProjectIndex.deleteObject(projectID);
            NotificationService.sendProjectClosedNotification(project);

            res.sendStatus(200);
        } catch (e) {
            next(e);
            await transaction.rollback().catch(console.log("Rollback error"));
            transaction.clean();
        }
    }

    start();
});

//Route to leave a project or kick a member of a project
router.post("/leave", (req, res, next) => {
    const projectID = req.body.projectID;
    const userID = req.body.userID;
    const id = req.user._id;

    if (!projectID || !userID) return res.sendStatus(400);

    const transaction = new Transaction();

    async function start() {
        try {
            //Load project
            const project = await ProjectModel.findById(projectID).exec();

            //Check if user is allowed to leave or user is allowed to kick
            if (id != userID && id != project.author.toString()) {
                let error = new Error("Not allowed");
                error.status = 400;
                throw error;
            }

            //Author can't leave project
            if (userID == project.author.toString()) {
                let error = new Error("Can't remove author!");
                error.status = 400;
                throw error;
            }

            //Remove member from project
            for (let i = 0; i < project.members.length; i++) {
                if (project.members[i] == userID) {
                    project.members.splice(i, 1);
                }
            }

            //Update project with transaction
            transaction.update("Project", projectID, {
                members: project.members
            });

            const user = await UserModel.findById(userID).exec();

            //Remove project from user memberProjects array
            for (let i = 0; i < user.memberProjects.length; i++) {
                if (user.memberProjects[i] == projectID) {
                    user.memberProjects.splice(i, 1);
                }
            }

            //Update user with transaction
            transaction.update("User", userID, {
                memberProjects: user.memberProjects
            });
            const result = await transaction.run();

            //Send notifications
            NotificationService.sendRemovedFromProjectNotification(userID, user.firstname, project);

            res.sendStatus(200);
        } catch (e) {
            next(e);
            //If transaction fails, rollback
            await transaction.rollback().catch(() => {
                console.log("Rollback failed");
            });
            transaction.clean();
        }
    }

    start();
});

router.get('/search', (req, res, next) => {

    let query = {};

    //Build search query for Algolia
    query.query = req.query.query;

    //Filter search with given tags
    query.filters = "";
    let tags = req.query.tags;
    if (tags && Array.isArray(tags) && tags.length > 0) {
        for (let i = 0; i < tags.length; i++) {
            query.filters += tags[i];
            if (i != tags.length - 1) {
                query.filters += " AND ";
            }
        }
    } else if (tags) {
        query.filters = tags;
    }

    //Check if only paid results should be found and filter
    if (req.query.paid) {
        if (query.filters.length > 0) {
            query.filters += " AND ";
        }
        query.filters += "paid";
    }

    //Search in specific radius
    if (req.query.lat && req.query.lng) {
        query.aroundLatLng = req.query.lat + ", " + req.query.lng;
        query.aroundRadius = ProjectVariables.search.radius
    }

    //Pagination of search for infinite scroll
    if (req.query.page) {
        query.page = req.query.page;
    }

    query.hitsPerPage = 10;

    //Search for project on Algolia
    algoliaProjectIndex.search(query, (err, content) => {
        if (err) return next(err);

        if (content) {
            let projectIds = [];
            //Iterate over results
            for (let searchResult of content.hits) {
                projectIds.push(searchResult.projectId);
            }

            //Populate found project ID's from MongoDB
            ProjectModel.find({
                _id: {
                    $in: projectIds
                },
                startDate: {
                    $gte: new Date()
                }
            }, {
                description: 1,
                title: 1,
                payment: 1,
                author: 1,
                tags: 1,
                location: 1,
                startDate: 1,
                maxMemberAmount: 1,
                members: 1,
                status: 1
            }).populate("author", "firstname lastname profilepicture").populate("tags").lean().exec().then((result) => {
                //Remove members from result projects, only keep member amount
                for (let i = 0; i < result.length; i++) {
                    result[i]["memberAmount"] = result[i].members.length;
                    delete result[i]["members"];

                }

                //console.log(result);
                res.status(200).json(result);
            }).catch((error) => {
                return next(error);
            });
        }
    });
});

//Get a specific project
router.get('/:id', (req, res, next) => {

    //Find project and populate its references
    ProjectModel.findById(req.params.id)
        .populate('author', '_id firstname lastname email profilepicture')
        .populate('members', '_id firstname lastname profilepicture')
        .populate('tags')
        .exec().then((result) => {

            if (!result) {
                const error = new Error("Project not found");
                error.status = 404;
                throw error;
            }

            //Check if requester is a member of the project, if not, remove member array
            var isMember = false;
            for (let member of result.members) {
                if (req.user._id.toString() === member._id.toString()) {
                    isMember = true
                };
            }

            //Check if requester is author of project, if yes, populate applications, if not, remove applications
            if (req.user._id.toString() === result.author._id.toString()) {
                return result.populate({
                    path: 'applications',
                    populate: [{
                        path: "author",
                        select: "firstname lastname profilepicture"
                    }, {
                        path: "project"
                    }]
                }).execPopulate();
            } else {
                result = result.toObject();
                result["memberAmount"] = result["members"].length;
                if (!isMember) {
                    delete result["members"];
                }
                delete result["applications"];
                return res.json(result);
            }
        }).then((result) => {
            return res.json(result);
        }).catch((error) => {
            return next(error);
        });
});

module.exports = router;