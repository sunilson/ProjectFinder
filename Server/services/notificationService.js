var admin = require("firebase-admin");
var notificationService = module.exports = {};
var NotificationTokenModel = require("../data/models/NotificationTokenModel");

/**
 * This service is used to send notifications via Firebase Notifications
 */

notificationService.test = () => {
    return new Promise((resolve, reject) => {
        async function start() {
            try {
                const tokens = await NotificationTokenModel.find().exec();

                const deviceTokens = [];
                for (let token of tokens) {
                    deviceTokens.push(token.notificationToken);
                }

                const payload = {
                    data: {
                        type: "newApplication",
                        text: "HALLLOOOOO"
                    }
                };

                if (deviceTokens && deviceTokens.length > 0) {
                    await admin.messaging().sendToDevice(deviceTokens, payload);
                }
                resolve();
            } catch (e) {
                reject(e);
            }
        }

        start();
    });
}

notificationService.sendNewApplicationNotification = (projectAuthorID, projectID, applicationID, projectTitle) => {
    return new Promise((resolve, reject) => {
        async function start() {
            try {
                const tokens = await NotificationTokenModel.find({
                    userID: projectAuthorID
                }).exec();

                const deviceTokens = [];
                for (let token of tokens) {
                    deviceTokens.push(token.notificationToken);
                }

                const payload = {
                    data: {
                        type: "newApplication",
                        projectID: projectID,
                        projectTitle: projectTitle
                    }
                };

                if (deviceTokens && deviceTokens.length > 0) {
                    await admin.messaging().sendToDevice(deviceTokens, payload);
                }
                resolve();
            } catch (e) {
                reject(e);
            }
        }

        start();
    });
}


notificationService.sendApplicationChangedNotification = (authorID, applicationID, projectTitle, status) => {
    return new Promise((resolve, reject) => {
        async function start() {
            try {
                const tokens = await NotificationTokenModel.find({
                    userID: authorID
                }).exec();

                const deviceTokens = [];
                for (let token of tokens) {
                    deviceTokens.push(token.notificationToken);
                }

                const payload = {
                    data: {
                        type: "applicationStatusChanged",
                        applicationID: applicationID,
                        projectTitle: projectTitle,
                        status: status.toString()
                    }
                };

                if (deviceTokens && deviceTokens.length > 0) {
                    await admin.messaging().sendToDevice(deviceTokens, payload);
                }
                resolve();
            } catch (e) {
                reject(e);
            }
        }

        start();
    });
}

notificationService.sendProjectClosedNotification = (project) => {
    return new Promise((resolve, reject) => {
        async function start() {
            try {
                const tokens = await NotificationTokenModel.find({
                    userID: {
                        $in: project.members
                    }
                }).exec();

                const deviceTokens = [];
                for (let token of tokens) {
                    deviceTokens.push(token.notificationToken);
                }

                const payload = {
                    data: {
                        type: "projectClosed",
                        projectID: project.id,
                        projectTitle: project.title
                    }
                };

                if (deviceTokens && deviceTokens.length > 0) {
                    await admin.messaging().sendToDevice(deviceTokens, payload);
                }
                resolve();
            } catch (e) {
                reject(e);
            }
        }
        start();
    });
}

notificationService.sendRemovedFromProjectNotification = (userID, firstname, project) => {
    return new Promise((resolve, reject) => {
        async function start() {
            try {
                const tokens = await NotificationTokenModel.find({
                    userID: {
                        $in: project.members
                    }
                }).exec();

                const deviceTokens = [];
                for (let token of tokens) {
                    deviceTokens.push(token.notificationToken);
                }

                const payload = {
                    data: {
                        type: "removedFromProject",
                        projectID: project.id.toString(),
                        firstname: firstname,
                        projectTitle: project.title
                    }
                };

                if (deviceTokens && deviceTokens.length > 0) {
                    await admin.messaging().sendToDevice(deviceTokens, payload);
                }
                resolve();
            } catch (e) {
                reject(e);
            }
        }
        start();
    });
}


notificationService.sendProjectRemovedNotification = (project) => {
    return new Promise((resolve, reject) => {
        async function start() {
            try {
                const tokens = await NotificationTokenModel.find({
                    userID: {
                        $in: project.members
                    }
                }).exec();

                const deviceTokens = [];
                for (let token of tokens) {
                    deviceTokens.push(token.notificationToken);
                }

                const payload = {
                    data: {
                        type: "projectRemoved",
                        projectID: project.id.toString(),
                        projectTitle: project.title
                    }
                };

                if (deviceTokens && deviceTokens.length > 0) {
                    await admin.messaging().sendToDevice(deviceTokens, payload);
                }
                resolve();
            } catch (e) {
                reject(e);
            }
        }
        start();
    });
}

notificationService.sendUserJoinedProjectNotification = (project) => {
    return new Promise((resolve, reject) => {
        async function start() {
            try {
                const tokens = await NotificationTokenModel.find({
                    userID: {
                        $in: project.members
                    }
                }).exec();

                const deviceTokens = [];
                for (let token of tokens) {
                    deviceTokens.push(token.notificationToken);
                }

                const payload = {
                    data: {
                        type: "memberJoined",
                        projectID: project.id.toString(),
                        projectTitle: project.title
                    }
                };

                if (deviceTokens && deviceTokens.length > 0) {
                    await admin.messaging().sendToDevice(deviceTokens, payload);
                }
                resolve();
            } catch (e) {
                reject(e);
            }
        }
        start();
    });
}