const projectService = module.exports = {};
const projectModel = require("../data/models/ProjectModel");
const validator = require("validator");
const projectVariables = require("../variables/ProjectVariables");
const projectApplicationModel = require("../data/models/ProjectApplicationModel");
const userModel = require("../data/models/UserModel");

/**
 * This service is used for operations like saving projects or applications
 */

//Saves a new application
projectService.saveProjectApplication = (application, user) => {
    application.author = user._id;

    let tempProject;
    return new Promise((resolve, reject) => {
        var applicationId;
        var tempApplication;
        new projectApplicationModel(application).save().then((result) => {
            applicationId = result._id;
            tempApplication = result;
            return projectModel.update({
                _id: tempApplication.project
            }, {
                $addToSet: {
                    applications: applicationId
                }
            });
        }).then(() => {
            return userModel.update({
                _id: tempApplication.author
            }, {
                $addToSet: {
                    applications: applicationId
                }
            });
        }).then(() => {
            resolve(tempApplication);
        }).catch((error) => {
            reject(error);
        });;
    });
}

//Saves a new project
projectService.saveProject = (project, user) => {

    let savedProject;
    return new Promise((resolve, reject) => {

        if (!project.startDate || new Date(project.startDate) < new Date()) {
            project.startDate = new Date().toISOString();
        }

        if (!project.endDate || new Date(project.endDate) < new Date(project.startDate)) {
            project.endDate = function (startDate) {
                let result = new Date();
                result.setDate(startDate.getDate() + 1);
                return result.toISOString();
            }(new Date(project.startDate));
        }

        project.author = user;
        project.members = [user._id];

        new projectModel(project).save().then((projectResult) => {
            savedProject = projectResult;
            return userModel.update({
                _id: project.author
            }, {
                $addToSet: {
                    ownProjects: projectResult.id
                }
            });
        }).then(() => {
            resolve(savedProject);
        }).catch((error) => {
            reject(error);
        });
    });
}