import { Tag } from './../data/Tag';
import { GooglePlus } from '@ionic-native/google-plus';
import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { MapperService } from './mapper-service';
import { User } from './../data/User';
import { Project } from './../data/Project';
import { Application } from './../data/Application';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class StorageService {

    private userChange: Subject<User> = new Subject();
    private userChangeObservable: Observable<User> = this.userChange.asObservable();

    private projectChange: Subject<Project> = new Subject();
    private projectChangeObservable: Observable<Project> = this.projectChange.asObservable();

    private db: SQLiteObject;

    constructor(private storage: Storage,
        private mapperService: MapperService,
        private sqlite: SQLite,
        private platform: Platform,
        private googlePlus: GooglePlus) {

    }

    private createDB() {
        if (this.db) {
            return new Promise((resolve, reject) => {
                resolve();
            });
        }


        return this.platform.ready().then(() => {
            return this.sqlite.create({
                name: 'data.db',
                location: 'default'
            });
        }).then((db: SQLiteObject) => {
            this.db = db;
            return Promise.all([
                db.executeSql('CREATE TABLE IF NOT EXISTS USERS(userID VARCHAR(255) PRIMARY KEY, username TEXT, email TEXT, firstname TEXT, lastname TEXT, profilepicture TEXT)', {}),
                db.executeSql("CREATE TABLE IF NOT EXISTS TAGS(tagID VARCHAR(255) PRIMARY KEY, title TEXT)", {}),
                db.executeSql("CREATE TABLE IF NOT EXISTS PROJECTS(projectID VARCHAR(255) PRIMARY KEY, title TEXT, description TEXT, startDate TEXT, endDate TEXT, location TEXT, payment TEXT, maxMemberAmount INTEGER, author VARCHAR(255), status INTEGER, FOREIGN KEY(author) REFERENCES USERS (userID))", {}),
                db.executeSql("CREATE TABLE IF NOT EXISTS APPLICATIONS(applicationID VARCHAR(255) PRIMARY KEY, message TEXT, author VARCHAR(255), project VARCHAR(255), status INTEGER, FOREIGN KEY(author) REFERENCES USERS(userID), FOREIGN KEY(project) REFERENCES PROJECTS(projectID))", {}),
                db.executeSql("CREATE TABLE IF NOT EXISTS USERS_TAGS(userID VARCHAR(255), tagID VARCHAR(255), PRIMARY KEY(userID, tagID), FOREIGN KEY(userID) REFERENCES USERS(userID), FOREIGN KEY(tagID) REFERENCES TAGS(tagID))", {}),
                db.executeSql("CREATE TABLE IF NOT EXISTS USERS_MEMBERPROJECTS(userID VARCHAR(255), projectID VARCHAR(255), PRIMARY KEY(userID, projectID), FOREIGN KEY(userID) REFERENCES USERS(userID), FOREIGN KEY(projectID) REFERENCES PROJECTS(projectID))", {}),
                db.executeSql("CREATE TABLE IF NOT EXISTS USERS_OWNPROJECTS(userID VARCHAR(255), projectID VARCHAR(255), PRIMARY KEY(userID, projectID), FOREIGN KEY(userID) REFERENCES USERS(userID), FOREIGN KEY(projectID) REFERENCES PROJECTS(projectID))", {}),
                db.executeSql("CREATE TABLE IF NOT EXISTS USERS_APPLICATIONS(userID VARCHAR(255), applicationID VARCHAR(255), PRIMARY KEY(userID, applicationID), FOREIGN KEY(userID) REFERENCES USERS(userID), FOREIGN KEY(applicationID) REFERENCES APPLICATIONS(applicationID))", {}),
                db.executeSql("CREATE TABLE IF NOT EXISTS PROJECTS_APPLICATIONS(projectID VARCHAR(255), applicationID VARCHAR(255), PRIMARY KEY(projectID, applicationID), FOREIGN KEY(projectID) REFERENCES PROJECTS(projectID), FOREIGN KEY(applicationID) REFERENCES APPLICATIONS(applicationID))", {}),
                db.executeSql("CREATE TABLE IF NOT EXISTS PROJECTS_MEMBERS(projectID VARCHAR(255), userID VARCHAR(255), PRIMARY KEY(projectID, userID), FOREIGN KEY(projectID) REFERENCES PROJECTS(projectID), FOREIGN KEY(userID) REFERENCES USERS(userID))", {}),
                db.executeSql("CREATE TABLE IF NOT EXISTS PROJECTS_TAGS(projectID VARCHAR(255), tagID VARCHAR(255), PRIMARY KEY(projectID, tagID), FOREIGN KEY(projectID) REFERENCES PROJECTS(projectID), FOREIGN KEY(tagID) REFERENCES TAGS(tagID))", {})
            ]);
        });

        /*

return this.platform.ready().then(() => {
    return this.deleteDatabase();
}).then(() => {
    return this.sqlite.create({
        name: 'data.db',
        location: 'default'
    });
}).then((db: SQLiteObject) => {
    this.db = db;
    return Promise.all([
        db.executeSql('CREATE TABLE IF NOT EXISTS USERS(userID VARCHAR(255) PRIMARY KEY, username TEXT, email TEXT, firstname TEXT, lastname TEXT, profilepicture TEXT)', {}),
        db.executeSql("CREATE TABLE IF NOT EXISTS TAGS(tagID VARCHAR(255) PRIMARY KEY, title TEXT)", {}),
        db.executeSql("CREATE TABLE IF NOT EXISTS PROJECTS(projectID VARCHAR(255) PRIMARY KEY, title TEXT, description TEXT, startDate TEXT, endDate TEXT, location TEXT, payment TEXT, maxMemberAmount INTEGER, author VARCHAR(255), status INTEGER, FOREIGN KEY(author) REFERENCES USERS (userID))", {}),
        db.executeSql("CREATE TABLE IF NOT EXISTS APPLICATIONS(applicationID VARCHAR(255) PRIMARY KEY, message TEXT, author VARCHAR(255), project VARCHAR(255), status INTEGER, FOREIGN KEY(author) REFERENCES USERS(userID), FOREIGN KEY(project) REFERENCES PROJECTS(projectID))", {}),
        db.executeSql("CREATE TABLE IF NOT EXISTS USERS_TAGS(userID VARCHAR(255), tagID VARCHAR(255), PRIMARY KEY(userID, tagID), FOREIGN KEY(userID) REFERENCES USERS(userID), FOREIGN KEY(tagID) REFERENCES TAGS(tagID))", {}),
        db.executeSql("CREATE TABLE IF NOT EXISTS USERS_MEMBERPROJECTS(userID VARCHAR(255), projectID VARCHAR(255), PRIMARY KEY(userID, projectID), FOREIGN KEY(userID) REFERENCES USERS(userID), FOREIGN KEY(projectID) REFERENCES PROJECTS(projectID))", {}),
        db.executeSql("CREATE TABLE IF NOT EXISTS USERS_OWNPROJECTS(userID VARCHAR(255), projectID VARCHAR(255), PRIMARY KEY(userID, projectID), FOREIGN KEY(userID) REFERENCES USERS(userID), FOREIGN KEY(projectID) REFERENCES PROJECTS(projectID))", {}),
        db.executeSql("CREATE TABLE IF NOT EXISTS USERS_APPLICATIONS(userID VARCHAR(255), applicationID VARCHAR(255), PRIMARY KEY(userID, applicationID), FOREIGN KEY(userID) REFERENCES USERS(userID), FOREIGN KEY(applicationID) REFERENCES APPLICATIONS(applicationID))", {}),
        db.executeSql("CREATE TABLE IF NOT EXISTS PROJECTS_APPLICATIONS(projectID VARCHAR(255), applicationID VARCHAR(255), PRIMARY KEY(projectID, applicationID), FOREIGN KEY(projectID) REFERENCES PROJECTS(projectID), FOREIGN KEY(applicationID) REFERENCES APPLICATIONS(applicationID))", {}),
        db.executeSql("CREATE TABLE IF NOT EXISTS PROJECTS_MEMBERS(projectID VARCHAR(255), userID VARCHAR(255), PRIMARY KEY(projectID, userID), FOREIGN KEY(projectID) REFERENCES PROJECTS(projectID), FOREIGN KEY(userID) REFERENCES USERS(userID))", {}),
        db.executeSql("CREATE TABLE IF NOT EXISTS PROJECTS_TAGS(projectID VARCHAR(255), tagID VARCHAR(255), PRIMARY KEY(projectID, tagID), FOREIGN KEY(projectID) REFERENCES PROJECTS(projectID), FOREIGN KEY(tagID) REFERENCES TAGS(tagID))", {})
    ]);
});

    }

    private deleteDatabase() {
        return this.sqlite.deleteDatabase({
            name: 'data.db',
            location: 'default'
        });
    }

    */
    }

    public storeUser(user: User) {
        return new Promise((resolve, reject) => {
            this.createDB().then(() => {
                let queries = [];
                queries.push(`INSERT OR REPLACE INTO USERS (userID, username, email, firstname, lastname, profilepicture) VALUES (
                    "${user.id}", 
                    "${user.username}", 
                    "${user.email}", 
                    "${user.firstname}", 
                    "${user.lastname}", 
                    "${user.profilepicture}"
                )`);

                queries.push("DELETE FROM USERS_TAGS WHERE userID = '" + user.id + "'");
                for (let tag of user.tags) {
                    queries.push(this.storeTagFromUserObject(user.id, tag));
                }

                queries.push("DELETE FROM USERS_MEMBERPROJECTS WHERE userID = '" + user.id + "'");
                for (let project of user.memberProjects) {
                    if (project) queries.push(this.storeProjectFromUserObject("USERS_MEMBERPROJECTS", user.id, project));
                }

                queries.push("DELETE FROM USERS_OWNPROJECTS WHERE userID = '" + user.id + "'");
                for (let project of user.ownProjects) {
                    if (project) queries.push(this.storeProjectFromUserObject("USERS_OWNPROJECTS", user.id, project));
                }

                queries.push("DELETE FROM USERS_APPLICATIONS WHERE userID = '" + user.id + "'");
                for (let application of user.applications) {
                    queries.push(this.storeApplicationFromUserObject(user.id, application));
                }

                let finalQuery = [queries[0]];
                for (let i = 1; i < queries.length; i++) {
                    finalQuery = finalQuery.concat(queries[i]);
                }

                this.db.sqlBatch(finalQuery).then((res) => {
                    resolve(user);
                }, (error) => {
                    reject(error);
                }).catch((error) => {
                    reject(error);
                });
            }).catch((error) => {
                reject(error);
            });
        });
    }

    public storeProject(project: Project) {

        return new Promise((resolve, reject) => {
            this.createDB().then(() => {
                let query = [];

                query.push(`INSERT OR REPLACE INTO PROJECTS (projectID, title, description, startDate, endDate, location, payment, maxMemberAmount, author, status) VALUES (
                "${project.id}", 
                "${project.title}", 
                "${project.description}", 
                "${project.startDate}", 
                "${project.endDate}", 
                '${JSON.stringify(project.location)}', 
                '${JSON.stringify(project.payment)}', 
                "${project.maxMemberAmount}",
                "${project.author.id}",
                "${project.status}"
            )`);

                let tempQueries = this.storeUserFromProjectObject("PROJECTS_MEMBERS", project.id, project.author);
                for (let q of tempQueries) {
                    query.push(q);
                }

                query.push("DELETE FROM PROJECTS_TAGS WHERE projectID = '" + project.id + "'");
                if (project.tags) {
                    for (let tag of project.tags) {
                        let tempQueries = this.storeTagFromProjectObject(project.id, tag);
                        for (let q of tempQueries) {
                            query.push(q);
                        }
                    }
                }

                query.push("DELETE FROM PROJECTS_MEMBERS WHERE projectID = '" + project.id + "'");
                if (project.members) {
                    for (let member of project.members) {
                        let tempQueries = this.storeUserFromProjectObject("PROJECTS_MEMBERS", project.id, member);
                        for (let q of tempQueries) {
                            query.push(q);
                        }
                    }
                }

                query.push("DELETE FROM PROJECTS_APPLICATIONS WHERE projectID = '" + project.id + "'");
                if (project.applications) {
                    for (let application of project.applications) {
                        let tempQueries = this.storeApplicationFromProjectObject(project.id, application);
                        for (let q of tempQueries) {
                            query.push(q);
                        }
                    }
                }

                this.db.sqlBatch(query).then((res) => {
                    resolve(project);
                }, (error) => {
                    reject(error);
                }).catch((error) => {
                    reject(error);
                });
            }).catch((error) => {
                reject(error);
            });
        });
    }

    public storeTags(tags: Tag[]) {
        return new Promise((resolve, reject) => {
            this.createDB().then(() => {

                let query = [];
                for (let tag of tags) {
                    query.push(`INSERT OR REPLACE INTO TAGS (tagID, title) VALUES("${tag.id}", "${tag.title}")`);
                }

                this.db.sqlBatch(query).then((res) => {
                    resolve(tags);
                }, (error) => {
                    reject(error);
                }).catch((error) => {
                    reject(error);
                });
            }).catch((error) => {
                reject(error);
            });
        });
    }

    public storeApplication(application: Application) {
        return new Promise((resolve, reject) => {
            this.createDB().then(() => {
                let query = [];

                let tempQuery = this.storeProjectFromApplicationObject(application.project);
                for (let q of tempQuery) {
                    query.push(q);
                }

                let tempQuery2 = this.storeUserFromApplicationObject(application.author);
                for (let q of tempQuery2) {
                    query.push(q);
                }

                let tempQuery3 = [];
                for (let tag of application.author.tags) {
                    tempQuery3.push(this.storeTagFromUserObject(application.author.id, tag));
                }

                for (let q of tempQuery3) {
                    for (let q2 of q) {
                        query.push(q2);
                    }
                }

                query.push(`INSERT OR REPLACE INTO APPLICATIONS (applicationID, message, author, project, status) VALUES(
                                    "${application.id}",
                                    "${application.message}",
                                    "${application.author.id}",
                                    "${application.project.id}",
                                    "${application.status}"
                                )`);

                this.db.sqlBatch(query).then((res) => {
                    resolve(application);
                }, (error) => {
                    reject(error);
                }).catch((error) => {
                    reject(error);
                });
            }).catch((error) => {
                reject(error);
            });
        });
    }

    private storeProjectFromApplicationObject(project: Project) {
        let resultQuery = [];

        resultQuery.push(`INSERT OR IGNORE INTO PROJECTS (projectID, title) VALUES (
                            "${project.id}",
                            "${project.title}"
                        )`);

        resultQuery.push(`UPDATE PROJECTS SET 
                        title="${project.title}"
                        WHERE projectID = "${project.id}"
                        `);

        return resultQuery;
    }

    private storeApplicationFromProjectObject(projectID, application: Application) {
        let resultQuery = [];

        let tempQueries = this.storeUserFromApplicationObject(application.author);
        for (let q of tempQueries) {
            resultQuery.push(q);
        }

        resultQuery.push("INSERT OR IGNORE INTO PROJECTS_APPLICATIONS (projectID, applicationID) VALUES('" + projectID + "', '" + application.id + "')");
        resultQuery.push(`INSERT OR REPLACE INTO APPLICATIONS (applicationID, message, author, project, status) VALUES(
                            "${application.id}",
                            "${application.message}",
                            "${application.author.id}",
                            "${application.project.id}",
                            "${application.status}"
                        )`);

        return resultQuery;
    }

    private storeUserFromApplicationObject(user: User) {
        let resultQuery = [];

        resultQuery.push(`INSERT OR IGNORE INTO USERS (userID, firstname, lastname, profilepicture, email) VALUES(
                        "${user.id}",
                        "${user.firstname}",
                        "${user.lastname}",
                        "${user.profilepicture}",
                        "${user.email}"
                )`);
        resultQuery.push(`UPDATE USERS SET
                        firstname="${user.firstname}",
                        lastname="${user.lastname}",
                        profilepicture="${user.profilepicture}",
                        email="${user.email}"
                        WHERE userID = "${user.id}"
                        `);

        return resultQuery;
    }

    private storeTagFromProjectObject(projectID, tag: Tag) {
        let resultQuery = [];

        resultQuery.push("INSERT OR IGNORE INTO PROJECTS_TAGS (tagID, projectID) VALUES ('" + tag.id + "', '" + projectID + "')");
        resultQuery.push(`INSERT OR REPLACE INTO TAGS (tagID, title) VALUES(
                        "${tag.id}",
                        "${tag.title}"  
                )`);

        return resultQuery;
    }

    private storeUserFromProjectObject(joinTable: string, projectID: string, user: User) {
        let resultQuery = [];

        if (joinTable) {
            resultQuery.push("INSERT OR IGNORE INTO " + joinTable + " (userID, projectID) VALUES ('" + user.id + "', '" + projectID + "')");
        }

        resultQuery.push(`INSERT OR IGNORE INTO USERS (userID, firstname, lastname, profilepicture${(user.email && user.email.length > 0) ? ", email" : ""}) VALUES(
            "${user.id}",
            "${user.firstname}",
            "${user.lastname}",
            "${user.profilepicture}"${(user.email && user.email.length > 0) ? (", '" + user.email + "' ") : ""}
        )`);

        resultQuery.push(`UPDATE USERS SET
        firstname="${user.firstname}",
        lastname="${user.lastname}",
        profilepicture="${user.profilepicture}"${(user.email && user.email.length > 0) ? (", email='" + user.email + "' ") : ""}
        WHERE userID = "${user.id}"
        `);

        return resultQuery;
    }

    private storeProjectFromUserObject(joinTable: string, userID: string, project: Project) {

        let resultQuery = [];

        resultQuery.push("INSERT OR IGNORE INTO " + joinTable + " (userID, projectID) VALUES('" + userID + "', '" + project.id + "')");
        resultQuery.push(`INSERT OR IGNORE INTO PROJECTS (projectID, title, author, startDate, status) VALUES (
                    "${project.id}",
                    "${project.title}",
                    "${(project.author) ? project.author.id : userID}",
                    "${project.startDate}",
                    "${project.status}"
                )`);

        resultQuery.push(`UPDATE PROJECTS SET 
                title="${project.title}", 
                startDate="${project.startDate}",
                status="${project.status}"
                WHERE projectID = "${project.id}"
                `);

        if (joinTable != "USERS_OWNPROJECTS") {
            let tempQueries = this.storeUserFromProjectObject(null, null, project.author);
            for (let q of tempQueries) {
                resultQuery.push(q);
            }
        }

        return resultQuery;
    }

    private storeApplicationFromUserObject(userID: string, application: Application) {

        let resultQuery = [];

        resultQuery.push("INSERT OR IGNORE INTO USERS_APPLICATIONS (userID, applicationID) VALUES('" + userID + "', '" + application.id + "')");
        resultQuery.push(`INSERT OR REPLACE INTO APPLICATIONS (applicationID, message, author, project, status) VALUES(
                    "${application.id}",
                    "${application.message}",
                    "${application.author.id}",
                    "${application.project.id}",
                    "${application.status}"
                )`);

        let tempQuery = this.storeProjectFromApplicationObject(application.project);
        for (let q of tempQuery) {
            resultQuery.push(q);
        }

        return resultQuery;
    }

    private storeTagFromUserObject(userID: string, tag: Tag) {

        let resultQuery = [];

        resultQuery.push("INSERT OR IGNORE INTO USERS_TAGS (userID, tagID) VALUES('" + userID + "', '" + tag.id + "')");
        resultQuery.push(`INSERT OR REPLACE INTO TAGS (tagID, title) VALUES("${tag.id}", "${tag.title}")`);

        return resultQuery;
    }

    public loadProject(projectId: string): Promise<Project> {
        return new Promise((resolve, reject) => {
            this.createDB().then(() => {
                let selectQuery = "SELECT DISTINCT * FROM PROJECTS WHERE projectID = '" + projectId + "'";

                let memberQuery = `SELECT u.userID as id, u.firstname, u.lastname, u.profilepicture FROM USERS as u
                                    LEFT JOIN PROJECTS_MEMBERS AS pm ON pm.userID = u.userID
                                    WHERE pm.projectID = "${projectId}"`;

                let applicationsQuery = `SELECT a.applicationID as id, a.message, a.status, a.project as projectID, u.userID as userID, u.firstname as firstname, u.lastname as lastname, u.profilepicture as profilepicture FROM APPLICATIONS as a 
                                LEFT JOIN USERS AS u ON u.userID = a.author
                                INNER JOIN PROJECTS_APPLICATIONS AS pa ON pa.applicationID = a.applicationID
                                WHERE pa.projectID = "${projectId}"
                                `;

                let tagsQuery = `SELECT t.tagID as id, t.title FROM TAGS AS t
                                    INNER JOIN PROJECTS_TAGS AS pt ON pt.tagID = t.tagID
                                    WHERE pt.projectID = "${projectId}"`;

                // let applicationsAuthorQuery = `SELECT userID, firstname, lastname, profilepicture FROM USERS`

                let resObject = {};
                this.db.executeSql(selectQuery, []).then((res) => {
                    resObject = res.rows.item(0);
                    if (!resObject) throw new Error("No Project found!");

                    resObject["location"] = JSON.parse(resObject["location"]);
                    resObject["payment"] = JSON.parse(resObject["payment"]);
                    resObject["id"] = resObject["projectID"];

                    let authorQuery = `SELECT userID as id, firstname, lastname, profilepicture, email FROM USERS WHERE userID = "${resObject['author']}"`;
                    return Promise.all([
                        this.db.executeSql(memberQuery, []),
                        this.db.executeSql(applicationsQuery, []),
                        this.db.executeSql(authorQuery, []),
                        this.db.executeSql(tagsQuery, [])
                    ]);
                }).then((res) => {
                    resObject["members"] = [];
                    resObject["applications"] = [];
                    resObject["author"] = {};
                    resObject["tags"] = [];
                    resObject["local"] = true;

                    for (let i = 0; i < res[0].rows.length; i++) {
                        resObject["members"].push(this.mapperService.jsonToUser(res[0].rows.item(i)));
                    }

                    for (let i = 0; i < res[1].rows.length; i++) {
                        console.log(res[1].rows.item(i));
                        res[1].rows.item(i)["author"] = {
                            id: res[1].rows.item(i)["userID"],
                            firstname: res[1].rows.item(i)["firstname"],
                            lastname: res[1].rows.item(i)["lastname"],
                            profilepicture: res[1].rows.item(i)["profilepicture"]
                        };
                        res[1].rows.item(i)["project"] = {
                            id: res[1].rows.item(i)["projectID"]
                        };
                        resObject["applications"].push(this.mapperService.jsonToApplication(res[1].rows.item(i)));
                    }

                    for (let i = 0; i < res[2].rows.length; i++) {
                        resObject["author"] = this.mapperService.jsonToUser(res[2].rows.item(i));
                    }

                    for (let i = 0; i < res[3].rows.length; i++) {
                        resObject["tags"].push(this.mapperService.jsonToTag(res[3].rows.item(i)));
                    }
                    resolve(this.mapperService.jsonToProject(resObject));
                }).catch((error) => {
                    reject(error);
                });
            }).catch((error) => {
                reject(error);
            });
        });
    }

    public loadApplication(applicationID: string): Promise<Application> {
        return new Promise((resolve, reject) => {
            this.createDB().then(() => {
                let applicationQuery = `SELECT DISTINCT a.*, u.userID, u.firstname, u.lastname, u.profilepicture, u.email, p.projectID, p.title, p.status from APPLICATIONS as a
                                        LEFT JOIN USERS as u ON u.userID = a.author
                                        LEFT JOIN PROJECTS as p ON p.projectID = a.project
                                        WHERE a.applicationID = "${applicationID}"`;

                let resObject = {};
                this.db.executeSql(applicationQuery, []).then((res) => {
                    let tagsQuery = `SELECT DISTINCT t.tagID, t.title FROM TAGS as t 
                                     INNER JOIN USERS_TAGS as ut
                                     ON ut.tagID = t.tagID WHERE ut.userID = "${res.rows.item(0)["userID"]}"`;
                    resObject = res.rows.item(0);
                    resObject["author"] = {
                        id: res.rows.item(0)["userID"],
                        firstname: res.rows.item(0)["firstname"],
                        lastname: res.rows.item(0)["lastname"],
                        profilepicture: res.rows.item(0)["profilepicture"],
                        email: res.rows.item(0)["email"]
                    };
                    resObject["project"] = {
                        id: res.rows.item(0)["projectID"],
                        title: res.rows.item(0)["title"]
                    };
                    return this.db.executeSql(tagsQuery, []);
                }).then((res) => {
                    resObject["author"]["tags"] = [];
                    for (let i = 0; i < res.rows.length; i++) {
                        resObject["author"]["tags"].push(res.rows.item(i));
                    }

                    resolve(this.mapperService.jsonToApplication(resObject));
                }).catch((error) => {
                    reject(error);
                });
            });
        });
    }

    public loadUser(userID: string): Promise<User> {
        return new Promise((resolve, reject) => {
            this.createDB().then(() => {
                let selectQuery = `SELECT * FROM USERS WHERE userID = "${userID}"`;

                let tagsQuery = `SELECT DISTINCT t.tagID, t.title FROM TAGS as t INNER JOIN 
                                USERS_TAGS as ut
                                ON ut.tagID = t.tagID WHERE ut.userID = "${userID}"`;

                let ownProjectQuery = `SELECT DISTINCT p.*, u.userID, u.firstname, u.lastname, u.profilepicture FROM PROJECTS as p 
                                    LEFT JOIN USERS as u ON u.userID = p.author
                                    INNER JOIN USERS_OWNPROJECTS as op ON op.projectID = p.projectID 
                                    WHERE op.userID = "${userID}" `;

                let memberProjectQuery = `SELECT DISTINCT p.*, u.userID, u.firstname, u.lastname, u.profilepicture FROM PROJECTS as p
                                        LEFT JOIN USERS as u ON u.userID = p.author
                                        INNER JOIN USERS_MEMBERPROJECTS as mp ON mp.projectID = p.projectID 
                                        WHERE mp.userID = "${userID}" `;

                let applicationQuery = `SELECT a.*, u.userID, u.firstname, u.lastname, u.profilepicture, p.projectID, p.title from APPLICATIONS as a
                                        LEFT JOIN USERS as u ON u.userID = a.author
                                        LEFT JOIN PROJECTS as p ON p.projectID = a.project
                                        INNER JOIN USERS_APPLICATIONS as ua ON ua.applicationID = a.applicationID
                                        WHERE ua.userID = "${userID}"
                                        `;

                let resObject = {};
                this.db.executeSql(selectQuery, []).then((res) => {
                    resObject = res.rows.item(0);
                    if (!resObject) throw new Error("No User found!");
                    resObject["id"] = resObject["userID"];

                    return Promise.all([
                        this.db.executeSql(tagsQuery, []),
                        this.db.executeSql(ownProjectQuery, []),
                        this.db.executeSql(memberProjectQuery, []),
                        this.db.executeSql(applicationQuery, [])
                    ]);
                }).then((res) => {
                    resObject["tags"] = [];
                    resObject["ownProjects"] = [];
                    resObject["memberProjects"] = [];
                    resObject["applications"] = [];

                    for (let i = 0; i < res[0].rows.length; i++) {
                        res[0].rows.item(i)["id"] = res[0].rows.item(i)["tagID"];
                        resObject["tags"].push(this.mapperService.jsonToTag(res[0].rows.item(i)));
                    }

                    for (let i = 0; i < res[1].rows.length; i++) {
                        res[1].rows.item(i)["id"] = res[1].rows.item(i)["projectID"];
                        res[1].rows.item(i)["location"] = JSON.parse(res[1].rows.item(i)["location"]);
                        res[1].rows.item(i)["payment"] = JSON.parse(res[1].rows.item(i)["payment"]);
                        res[1].rows.item(i)["author"] = {
                            id: res[1].rows.item(i)["userID"],
                            firstname: res[1].rows.item(i)["firstname"],
                            lastname: res[1].rows.item(i)["lastname"],
                            profilepicture: res[1].rows.item(i)["profilepicture"]
                        }

                        resObject["ownProjects"].push(this.mapperService.jsonToProject(res[1].rows.item(i)));
                    }

                    for (let i = 0; i < res[2].rows.length; i++) {
                        res[2].rows.item(i)["id"] = res[2].rows.item(i)["projectID"];
                        res[2].rows.item(i)["location"] = JSON.parse(res[2].rows.item(i)["location"]);
                        res[2].rows.item(i)["payment"] = JSON.parse(res[2].rows.item(i)["payment"]);
                        res[2].rows.item(i)["author"] = {
                            id: res[2].rows.item(i)["userID"],
                            firstname: res[2].rows.item(i)["firstname"],
                            lastname: res[2].rows.item(i)["lastname"],
                            profilepicture: res[2].rows.item(i)["profilepicture"]
                        }

                        resObject["memberProjects"].push(this.mapperService.jsonToProject(res[2].rows.item(i)));
                    }

                    for (let i = 0; i < res[3].rows.length; i++) {
                        res[3].rows.item(i)["id"] = res[3].rows.item(i)["applicationID"];
                        res[3].rows.item(i)["author"] = {
                            id: res[3].rows.item(i)["userID"],
                            firstname: res[3].rows.item(i)["firstname"],
                            lastname: res[3].rows.item(i)["lastname"],
                            profilepicture: res[3].rows.item(i)["profilepicture"]
                        }
                        res[3].rows.item(i)["project"] = {
                            id: res[3].rows.item(i)["projectID"],
                            title: res[3].rows.item(i)["title"]
                        }
                        resObject["applications"].push(this.mapperService.jsonToApplication(res[3].rows.item(i)));
                    }

                    resObject["local"] = true;
                    resolve(this.mapperService.jsonToUser(resObject));
                }, (error) => {
                    reject(error);
                }).catch((error) => {
                    reject(error);
                });
            }).catch((error) => {
                reject(error);
            });
        });
    }

    public loadTags(): Promise<Tag[]> {
        return new Promise((resolve, reject) => {
            this.createDB().then(() => {
                this.db.executeSql("SELECT * FROM TAGS", []).then((tags) => {
                    let result: Tag[] = [];

                    for (let i = 0; i < tags.rows.length; i++) {
                        result.push(this.mapperService.jsonToTag(tags.rows.item(i)));
                    }

                    resolve(result);
                }).catch((error) => {
                    reject(error);
                });
            });
        });
    }

    public removeProject(projectId: string) {
        return new Promise((resolve, reject) => {
            this.createDB().then(() => {
                let queries = [
                    `DELETE FROM APPLICATIONS WHERE project = "${projectId}"`,
                    `DELETE FROM PROJECTS_APPLICATIONS WHERE projectID = "${projectId}"`,
                    `DELETE FROM PROJECTS_MEMBERS WHERE projectID = "${projectId}"`,
                    `DELETE FROM PROJECTS_TAGS WHERE projectID = "${projectId}"`,
                    `DELETE FROM USERS_OWNPROJECTS WHERE projectID = "${projectId}"`,
                    `DELETE FROM USERS_MEMBERPROJECTS WHERE projectID = "${projectId}"`,
                    `DELETE FROM PROJECTS WHERE projectID = "${projectId}"`
                ];

                this.db.sqlBatch(queries).then(() => {
                    return this.getCurrentUser();
                }).then((userID) => {
                    return this.loadUser(userID);
                }).then(user => {
                    this.userChange.next(user);
                    resolve();
                }).catch((e) => {
                    reject(e);
                });
            }).catch((e) => {
                reject(e);
            });
        });
    }

    public updateProfilePicture(userID: string, url: string) {
        return new Promise((resolve, reject) => {
            this.createDB().then(() => {
                let queries = [
                    `UPDATE USERS SET profilepicture = "${url}" WHERE userID = "${userID}"`
                ];

                this.db.sqlBatch(queries).then(() => {
                    return this.loadUser(userID);
                }).then(user => {
                    this.userChange.next(user);
                    resolve();
                }).catch((e) => {
                    reject(e);
                });
            }).catch((e) => {
                reject(e);
            });
        });
    }

    public removeMemberFromProject(projectID: string, userID: string, leaving: boolean) {
        return new Promise((resolve, reject) => {
            this.createDB().then(() => {
                let queries = [`DELETE FROM PROJECTS_MEMBERS WHERE userID = "${userID}" AND projectID = "${projectID}"`];

                if (leaving) {
                    queries.push(`DELETE FROM USERS_MEMBERPROJECTS WHERE userID ="${userID}" AND projectID = "${projectID}"`)
                }

                this.db.sqlBatch(queries).then(() => {
                    return this.getCurrentUser();
                }).then(id => {
                    return Promise.all([this.loadProject(projectID), this.loadUser(id)]);
                }).then((res: any) => {
                    this.projectChange.next(res[0]);
                    this.userChange.next(res[1]);
                    resolve();
                }).catch((e) => {
                    reject(e);
                });
            }).catch((e) => {
                reject(e);
            });
        });
    }

    public changeApplicationStatus(applicationID: string, projectID: string, userID: string, status: number) {
        return new Promise((resolve, reject) => {
            this.createDB().then(() => {
                let queries = [
                    `UPDATE APPLICATIONS SET status = ${status} WHERE applicationID = "${applicationID}"`
                ];

                if (status == 2) {
                    queries.push(`INSERT INTO PROJECTS_MEMBERS (projectID, userID) VALUES("${projectID}", "${userID}")`);
                }

                this.db.sqlBatch(queries).then(() => {
                    return this.loadApplication(applicationID);
                }).then(application => {
                    return this.loadProject(application.project.id);
                }).then((project) => {
                    this.projectChange.next(project);
                    resolve();
                }).catch((e) => {
                    reject(e);
                });
            }).catch((e) => {
                reject(e);
            });
        });
    }

    public closeProject(projectID: string) {
        return new Promise((resolve, reject) => {
            this.createDB().then(() => {
                let queries = [
                    `UPDATE PROJECTS SET status = 1 WHERE projectID = "${projectID}"`,
                    `DELETE FROM APPLICATIONS WHERE project = "${projectID}"`,
                    `DELETE FROM PROJECTS_APPLICATIONS WHERE projectID = "${projectID}"`
                ];

                this.db.sqlBatch(queries).then(() => {
                    return this.getCurrentUser();
                }).then((userID) => {
                    return Promise.all([this.loadProject(projectID), this.loadUser(userID)]);
                }).then(res => {
                    this.projectChange.next(res[0]);
                    this.userChange.next(res[1]);
                    resolve();
                }).catch((e) => {
                    reject(e);
                });
            }).catch((e) => {
                reject(e);
            });
        });
    }

    //Adding application from project
    public addApplication(application: Application): Promise<User> {
        return new Promise((resolve, reject) => {
            this.createDB().then(() => {
                let queries = [
                    `INSERT INTO USERS_APPLICATIONS (userID, applicationID) VALUES (
                        "${application.authorId}",
                        "${application.id}"
                    )`,
                    `INSERT OR REPLACE INTO APPLICATIONS (applicationID, message, author, project, status) VALUES (
                        "${application.id}",
                        "${application.message}",
                       " ${application.authorId}",
                       " ${application.projectId}",
                        "${application.status}"
                    )`,
                    `INSERT INTO PROJECTS_APPLICATIONS (projectID, applicationID) VALUES (
                        "${application.projectId}",
                        "${application.id}"
                    )`
                ];

                this.db.sqlBatch(queries).then(() => {
                    return Promise.all([this.loadUser(application.authorId), this.loadProject(application.projectId)]);
                }).then(res => {
                    this.userChange.next(res[0]);
                    this.projectChange.next(res[1]);
                    resolve();
                }).catch((e) => {
                    reject(e);
                });
            }).catch((e) => {
                reject(e);
            });
        });
    }

    public addOwnProjectToUser(project: Project) {
        return new Promise((resolve, reject) => {
            this.createDB().then(() => {
                let manyQuery = `INSERT OR IGNORE INTO USERS_OWNPROJECTS (userID, projectID) VALUES (
                    "${project.author.id}",
                    "${project.id}"
                )`;
                let insertQuery = `INSERT OR REPLACE INTO PROJECTS (projectID, title, description, startDate, endDate, location, payment, maxMemberAmount, status) VALUES (
                    "${project.id}",
                    "${project.title}",
                    "${project.description}",
                    "${project.startDate}",
                    "${project.endDate}",
                    '${JSON.stringify(project.location)}',
                    '${JSON.stringify(project.payment)}',
                    "${project.maxMemberAmount}",
                    "${project.status}"
                )`;

                this.db.sqlBatch([
                    manyQuery,
                    insertQuery
                ]).then(() => {
                    return this.loadUser(project.author.id);
                }).then(user => {
                    this.userChange.next(user);
                    resolve();
                }).catch((e) => {
                    reject(e);
                });
            }).catch((e) => {
                reject(e);
            });
        });
    }

    public getTokens() {
        return this.storage.get("tokens");
    }

    public setTokens(tokens?, access?: string, refresh?: string) {
        if (tokens) {
            return this.storage.set("tokens", tokens);
        } else {
            return this.storage.set("tokens", {
                accessToken: access,
                refreshToken: refresh
            });
        }
    }

    public getCurrentUser(): Promise<any> {
        return this.storage.get("user");
    }

    public subscribeToUserChange(): Observable<User> {
        return this.userChangeObservable;
    }

    public subscribeToProjectChange(): Observable<Project> {
        return this.projectChangeObservable;
    }

    public updateCurrentUser(user: User) {
        this.userChange.next(user);
        return Promise.all([this.storage.set("user", user.id), this.storeUser(user)]);
    }

    public storeLocalStorage(key: string, value: any) {
        return this.storage.set(key, value);
    }

    public getLocalStorage(key: string) {
        return this.storage.get(key);
    }

    public logOut() {
        return Promise.all([/*this.googlePlus.logout(),*/ this.storage.remove("tokens"), this.storage.remove("user")]);
    }
}