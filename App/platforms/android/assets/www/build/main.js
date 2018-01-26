webpackJsonp([16],{

/***/ 139:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocationService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__storage_service__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__ = __webpack_require__(141);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var LocationService = (function () {
    function LocationService(geoLocation, storageService, modalCtrl, loadingCtrl) {
        this.geoLocation = geoLocation;
        this.storageService = storageService;
        this.modalCtrl = modalCtrl;
        this.loadingCtrl = loadingCtrl;
        this.locationChange = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"]();
        this.locationChangeObservable = this.locationChange.asObservable();
    }
    LocationService.prototype.notifiyLocationSelection = function (location) {
        this.locationChange.next(location);
    };
    LocationService.prototype.selectLocation = function () {
        this.modalCtrl.create("SearchPlacePage").present();
        return this.locationChangeObservable;
    };
    //Get current location either a saved value (if not expired) or a new value from the device GPS
    //TODO Store and get in Local Storage
    LocationService.prototype.getCurrentLocation = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            return _this.storageService.getLocalStorage("location").then(function (value) {
                if (value)
                    reject(new Error("Keine Berechtigung! Kann in den Einstellungen geändert werden"));
                if (_this.currentLocation && _this.currentLocation.timestamp > new Date().getMilliseconds() - 1800000) {
                    resolve(_this.currentLocation);
                }
                _this.geoLocation.getCurrentPosition({ timeout: 10000 }).then(function (coordinates) {
                    _this.currentLocation = coordinates;
                    resolve(_this.currentLocation);
                }).catch(function (error) {
                    reject(error);
                });
            });
        });
    };
    LocationService.prototype.findPlaceName = function (latLng, map) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var loader = _this.loadingCtrl.create({
                content: "Getting place information..."
            });
            loader.present().then(function () {
                _this.placesService = new google.maps.places.PlacesService(map);
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode({ "location": latLng }, function (result, status) {
                    if (status === "OK") {
                        if (result[2]) {
                            _this.placesService.getDetails({ "placeId": result[2].place_id }, function (placeDetails, status) {
                                if (status === google.maps.places.PlacesServiceStatus.OK) {
                                    loader.dismiss();
                                    resolve(placeDetails.name);
                                }
                                else {
                                    loader.dismiss();
                                    reject();
                                }
                            });
                        }
                    }
                    else {
                        loader.dismiss();
                        reject();
                    }
                });
            });
        });
    };
    return LocationService;
}());
LocationService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__["a" /* Geolocation */],
        __WEBPACK_IMPORTED_MODULE_0__storage_service__["a" /* StorageService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */]])
], LocationService);

//# sourceMappingURL=location-service.js.map

/***/ }),

/***/ 152:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 152;

/***/ }),

/***/ 153:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__storage_service__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_constants_NetworkConstants__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_firebase__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_local_notifications__ = __webpack_require__(362);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var NotificationService = (function () {
    function NotificationService(firebase, http, platform, storageService, localNotification) {
        var _this = this;
        this.firebase = firebase;
        this.http = http;
        this.platform = platform;
        this.storageService = storageService;
        this.localNotification = localNotification;
        this.currentNotifications = [];
        this.platform.ready().then(function () {
            console.log("bla");
            _this.firebase.hasPermission().then(function (data) {
                if (!data.isEnabled)
                    _this.firebase.grantPermission();
            });
            _this.localNotification.hasPermission().then(function (value) {
                if (!value)
                    _this.localNotification.registerPermission();
            });
            _this.firebase.onTokenRefresh().subscribe(function (token) {
                _this.storeTokenToServer(token).catch(function (e) {
                    console.log(e);
                });
            });
            _this.localNotification.on("click", function (event) {
                //window.location.href = url;
                console.log(_this.currentNotifications[_this.findNotification(event.id)]);
            });
            _this.firebase.onNotificationOpen().subscribe(function (notification) {
                if (!notification)
                    return;
                _this.storageService.getLocalStorage("notification").then(function (value) {
                    if (!value) {
                        notification["id"] = Date.now();
                        _this.currentNotifications.push(notification);
                        switch (notification.type) {
                            case "newApplication":
                                _this.localNotification.schedule({
                                    id: notification.id,
                                    title: "Project Finder",
                                    text: 'Du hast eine neue Bewerbung im Projekt ' + notification.projectTitle + ' erhalten!',
                                    smallIcon: 'res://calendar'
                                });
                                break;
                            case "applicationStatusChanged":
                                _this.localNotification.schedule({
                                    id: notification.id,
                                    title: "Project Finder",
                                    text: 'Deine Bewerbung fürs Projekt ' + notification.projectTitle + ' wurde bearbeitet!'
                                });
                                break;
                            case "projectClosed":
                                _this.localNotification.schedule({
                                    id: notification.id,
                                    title: "Project Finder",
                                    text: 'Das Projekt ' + notification.projectTitle + ' wurde geschlossen!'
                                });
                                break;
                            case "memberJoined":
                                _this.localNotification.schedule({
                                    id: notification.id,
                                    title: "Project Finder",
                                    text: 'Das Projekt ' + notification.projectTitle + ' hat ein neues Mitglied!'
                                });
                                break;
                            case "projectRemoved":
                                _this.localNotification.schedule({
                                    id: notification.id,
                                    title: "Project Finder",
                                    text: 'Das Projekt ' + notification.projectTitle + ' wurde entfernt!'
                                });
                                break;
                            case "removedFromProject":
                                _this.localNotification.schedule({
                                    id: notification.id,
                                    title: "Project Finder",
                                    text: 'Das Mitglied ' + notification.firstname + ' wurde vom Projekt ' + notification.projectTitle + ' entfernt!'
                                });
                                break;
                            default:
                                break;
                        }
                    }
                });
            });
        });
    }
    NotificationService.prototype.findNotification = function (id) {
        for (var i = 0; i < this.currentNotifications.length; i++) {
            if (this.currentNotifications[i].id == id)
                return i;
        }
    };
    NotificationService.prototype.storeNotificationToken = function () {
        var _this = this;
        this.firebase.getToken().then(function (token) {
            console.log(token);
            _this.storeTokenToServer(token).catch(function (e) {
                console.log("Store token Error");
                console.log(e);
            });
        }).catch(function (e) {
            console.log("Token error");
            console.log(e);
        });
    };
    NotificationService.prototype.storeTokenToServer = function (token) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post(__WEBPACK_IMPORTED_MODULE_2__data_constants_NetworkConstants__["a" /* NetworkConstants */].HOME_URL + "/notifications/token", { token: token }, { responseType: "text" }).subscribe(function (res) {
                console.log("success");
                resolve();
            }, function (error) {
                console.log(error);
                reject(error);
            });
        });
    };
    return NotificationService;
}());
NotificationService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__ionic_native_firebase__["a" /* Firebase */],
        __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["b" /* HttpClient */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_0__storage_service__["a" /* StorageService */],
        __WEBPACK_IMPORTED_MODULE_6__ionic_native_local_notifications__["a" /* LocalNotifications */]])
], NotificationService);

//# sourceMappingURL=notification-service.js.map

/***/ }),

/***/ 197:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/add-project/add-project.module": [
		732,
		2
	],
	"../pages/application/application.module": [
		733,
		5
	],
	"../pages/change-password/change-password.module": [
		734,
		8
	],
	"../pages/delete-account/delete-account.module": [
		735,
		15
	],
	"../pages/edit-project/edit-project.module": [
		736,
		4
	],
	"../pages/feed/feed.module": [
		737,
		3
	],
	"../pages/forgot-password/forgot-password.module": [
		738,
		0
	],
	"../pages/intro/intro.module": [
		739,
		14
	],
	"../pages/login/login.module": [
		740,
		13
	],
	"../pages/password-reset/password-reset.module": [
		741,
		12
	],
	"../pages/project/project.module": [
		742,
		1
	],
	"../pages/registration/registration.module": [
		743,
		6
	],
	"../pages/search-filter/search-filter.module": [
		744,
		11
	],
	"../pages/search-place/search-place.module": [
		745,
		9
	],
	"../pages/search/search.module": [
		746,
		7
	],
	"../pages/settings/settings.module": [
		747,
		10
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 197;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 316:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Tag; });
var Tag = (function () {
    function Tag(id, title) {
        this.id = id;
        this.title = title;
    }
    return Tag;
}());

//# sourceMappingURL=Tag.js.map

/***/ }),

/***/ 36:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StorageService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_native_google_plus__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mapper_service__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Subject__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_Subject__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var StorageService = (function () {
    function StorageService(storage, mapperService, sqlite, platform, googlePlus) {
        this.storage = storage;
        this.mapperService = mapperService;
        this.sqlite = sqlite;
        this.platform = platform;
        this.googlePlus = googlePlus;
        this.userChange = new __WEBPACK_IMPORTED_MODULE_6_rxjs_Subject__["Subject"]();
        this.userChangeObservable = this.userChange.asObservable();
        this.projectChange = new __WEBPACK_IMPORTED_MODULE_6_rxjs_Subject__["Subject"]();
        this.projectChangeObservable = this.projectChange.asObservable();
    }
    StorageService.prototype.createDB = function () {
        var _this = this;
        if (this.db) {
            return new Promise(function (resolve, reject) {
                resolve();
            });
        }
        return this.platform.ready().then(function () {
            return _this.sqlite.create({
                name: 'data.db',
                location: 'default'
            });
        }).then(function (db) {
            _this.db = db;
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
    };
    StorageService.prototype.storeUser = function (user) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.createDB().then(function () {
                var queries = [];
                queries.push("INSERT OR REPLACE INTO USERS (userID, username, email, firstname, lastname, profilepicture) VALUES (\n                    \"" + user.id + "\", \n                    \"" + user.username + "\", \n                    \"" + user.email + "\", \n                    \"" + user.firstname + "\", \n                    \"" + user.lastname + "\", \n                    \"" + user.profilepicture + "\"\n                )");
                queries.push("DELETE FROM USERS_TAGS WHERE userID = '" + user.id + "'");
                for (var _i = 0, _a = user.tags; _i < _a.length; _i++) {
                    var tag = _a[_i];
                    queries.push(_this.storeTagFromUserObject(user.id, tag));
                }
                queries.push("DELETE FROM USERS_MEMBERPROJECTS WHERE userID = '" + user.id + "'");
                for (var _b = 0, _c = user.memberProjects; _b < _c.length; _b++) {
                    var project = _c[_b];
                    if (project)
                        queries.push(_this.storeProjectFromUserObject("USERS_MEMBERPROJECTS", user.id, project));
                }
                queries.push("DELETE FROM USERS_OWNPROJECTS WHERE userID = '" + user.id + "'");
                for (var _d = 0, _e = user.ownProjects; _d < _e.length; _d++) {
                    var project = _e[_d];
                    if (project)
                        queries.push(_this.storeProjectFromUserObject("USERS_OWNPROJECTS", user.id, project));
                }
                queries.push("DELETE FROM USERS_APPLICATIONS WHERE userID = '" + user.id + "'");
                for (var _f = 0, _g = user.applications; _f < _g.length; _f++) {
                    var application = _g[_f];
                    queries.push(_this.storeApplicationFromUserObject(user.id, application));
                }
                var finalQuery = [queries[0]];
                for (var i = 1; i < queries.length; i++) {
                    finalQuery = finalQuery.concat(queries[i]);
                }
                _this.db.sqlBatch(finalQuery).then(function (res) {
                    resolve(user);
                }, function (error) {
                    reject(error);
                }).catch(function (error) {
                    reject(error);
                });
            }).catch(function (error) {
                reject(error);
            });
        });
    };
    StorageService.prototype.storeProject = function (project) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.createDB().then(function () {
                var query = [];
                query.push("INSERT OR REPLACE INTO PROJECTS (projectID, title, description, startDate, endDate, location, payment, maxMemberAmount, author, status) VALUES (\n                \"" + project.id + "\", \n                \"" + project.title + "\", \n                \"" + project.description + "\", \n                \"" + project.startDate + "\", \n                \"" + project.endDate + "\", \n                '" + JSON.stringify(project.location) + "', \n                '" + JSON.stringify(project.payment) + "', \n                \"" + project.maxMemberAmount + "\",\n                \"" + project.author.id + "\",\n                \"" + project.status + "\"\n            )");
                var tempQueries = _this.storeUserFromProjectObject("PROJECTS_MEMBERS", project.id, project.author);
                for (var _i = 0, tempQueries_1 = tempQueries; _i < tempQueries_1.length; _i++) {
                    var q = tempQueries_1[_i];
                    query.push(q);
                }
                query.push("DELETE FROM PROJECTS_TAGS WHERE projectID = '" + project.id + "'");
                if (project.tags) {
                    for (var _a = 0, _b = project.tags; _a < _b.length; _a++) {
                        var tag = _b[_a];
                        var tempQueries_2 = _this.storeTagFromProjectObject(project.id, tag);
                        for (var _c = 0, tempQueries_3 = tempQueries_2; _c < tempQueries_3.length; _c++) {
                            var q = tempQueries_3[_c];
                            query.push(q);
                        }
                    }
                }
                query.push("DELETE FROM PROJECTS_MEMBERS WHERE projectID = '" + project.id + "'");
                if (project.members) {
                    for (var _d = 0, _e = project.members; _d < _e.length; _d++) {
                        var member = _e[_d];
                        var tempQueries_4 = _this.storeUserFromProjectObject("PROJECTS_MEMBERS", project.id, member);
                        for (var _f = 0, tempQueries_5 = tempQueries_4; _f < tempQueries_5.length; _f++) {
                            var q = tempQueries_5[_f];
                            query.push(q);
                        }
                    }
                }
                query.push("DELETE FROM PROJECTS_APPLICATIONS WHERE projectID = '" + project.id + "'");
                if (project.applications) {
                    for (var _g = 0, _h = project.applications; _g < _h.length; _g++) {
                        var application = _h[_g];
                        var tempQueries_6 = _this.storeApplicationFromProjectObject(project.id, application);
                        for (var _j = 0, tempQueries_7 = tempQueries_6; _j < tempQueries_7.length; _j++) {
                            var q = tempQueries_7[_j];
                            query.push(q);
                        }
                    }
                }
                _this.db.sqlBatch(query).then(function (res) {
                    resolve(project);
                }, function (error) {
                    reject(error);
                }).catch(function (error) {
                    reject(error);
                });
            }).catch(function (error) {
                reject(error);
            });
        });
    };
    StorageService.prototype.storeTags = function (tags) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.createDB().then(function () {
                var query = [];
                for (var _i = 0, tags_1 = tags; _i < tags_1.length; _i++) {
                    var tag = tags_1[_i];
                    query.push("INSERT OR REPLACE INTO TAGS (tagID, title) VALUES(\"" + tag.id + "\", \"" + tag.title + "\")");
                }
                _this.db.sqlBatch(query).then(function (res) {
                    resolve(tags);
                }, function (error) {
                    reject(error);
                }).catch(function (error) {
                    reject(error);
                });
            }).catch(function (error) {
                reject(error);
            });
        });
    };
    StorageService.prototype.storeApplication = function (application) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.createDB().then(function () {
                var query = [];
                var tempQuery = _this.storeProjectFromApplicationObject(application.project);
                for (var _i = 0, tempQuery_1 = tempQuery; _i < tempQuery_1.length; _i++) {
                    var q = tempQuery_1[_i];
                    query.push(q);
                }
                var tempQuery2 = _this.storeUserFromApplicationObject(application.author);
                for (var _a = 0, tempQuery2_1 = tempQuery2; _a < tempQuery2_1.length; _a++) {
                    var q = tempQuery2_1[_a];
                    query.push(q);
                }
                var tempQuery3 = [];
                for (var _b = 0, _c = application.author.tags; _b < _c.length; _b++) {
                    var tag = _c[_b];
                    tempQuery3.push(_this.storeTagFromUserObject(application.author.id, tag));
                }
                for (var _d = 0, tempQuery3_1 = tempQuery3; _d < tempQuery3_1.length; _d++) {
                    var q = tempQuery3_1[_d];
                    for (var _e = 0, q_1 = q; _e < q_1.length; _e++) {
                        var q2 = q_1[_e];
                        query.push(q2);
                    }
                }
                query.push("INSERT OR REPLACE INTO APPLICATIONS (applicationID, message, author, project, status) VALUES(\n                                    \"" + application.id + "\",\n                                    \"" + application.message + "\",\n                                    \"" + application.author.id + "\",\n                                    \"" + application.project.id + "\",\n                                    \"" + application.status + "\"\n                                )");
                _this.db.sqlBatch(query).then(function (res) {
                    resolve(application);
                }, function (error) {
                    reject(error);
                }).catch(function (error) {
                    reject(error);
                });
            }).catch(function (error) {
                reject(error);
            });
        });
    };
    StorageService.prototype.storeProjectFromApplicationObject = function (project) {
        var resultQuery = [];
        resultQuery.push("INSERT OR IGNORE INTO PROJECTS (projectID, title) VALUES (\n                            \"" + project.id + "\",\n                            \"" + project.title + "\"\n                        )");
        resultQuery.push("UPDATE PROJECTS SET \n                        title=\"" + project.title + "\"\n                        WHERE projectID = \"" + project.id + "\"\n                        ");
        return resultQuery;
    };
    StorageService.prototype.storeApplicationFromProjectObject = function (projectID, application) {
        var resultQuery = [];
        var tempQueries = this.storeUserFromApplicationObject(application.author);
        for (var _i = 0, tempQueries_8 = tempQueries; _i < tempQueries_8.length; _i++) {
            var q = tempQueries_8[_i];
            resultQuery.push(q);
        }
        resultQuery.push("INSERT OR IGNORE INTO PROJECTS_APPLICATIONS (projectID, applicationID) VALUES('" + projectID + "', '" + application.id + "')");
        resultQuery.push("INSERT OR REPLACE INTO APPLICATIONS (applicationID, message, author, project, status) VALUES(\n                            \"" + application.id + "\",\n                            \"" + application.message + "\",\n                            \"" + application.author.id + "\",\n                            \"" + application.project.id + "\",\n                            \"" + application.status + "\"\n                        )");
        return resultQuery;
    };
    StorageService.prototype.storeUserFromApplicationObject = function (user) {
        var resultQuery = [];
        resultQuery.push("INSERT OR IGNORE INTO USERS (userID, firstname, lastname, profilepicture, email) VALUES(\n                        \"" + user.id + "\",\n                        \"" + user.firstname + "\",\n                        \"" + user.lastname + "\",\n                        \"" + user.profilepicture + "\",\n                        \"" + user.email + "\"\n                )");
        resultQuery.push("UPDATE USERS SET\n                        firstname=\"" + user.firstname + "\",\n                        lastname=\"" + user.lastname + "\",\n                        profilepicture=\"" + user.profilepicture + "\",\n                        email=\"" + user.email + "\"\n                        WHERE userID = \"" + user.id + "\"\n                        ");
        return resultQuery;
    };
    StorageService.prototype.storeTagFromProjectObject = function (projectID, tag) {
        var resultQuery = [];
        resultQuery.push("INSERT OR IGNORE INTO PROJECTS_TAGS (tagID, projectID) VALUES ('" + tag.id + "', '" + projectID + "')");
        resultQuery.push("INSERT OR REPLACE INTO TAGS (tagID, title) VALUES(\n                        \"" + tag.id + "\",\n                        \"" + tag.title + "\"  \n                )");
        return resultQuery;
    };
    StorageService.prototype.storeUserFromProjectObject = function (joinTable, projectID, user) {
        var resultQuery = [];
        if (joinTable) {
            resultQuery.push("INSERT OR IGNORE INTO " + joinTable + " (userID, projectID) VALUES ('" + user.id + "', '" + projectID + "')");
        }
        resultQuery.push("INSERT OR IGNORE INTO USERS (userID, firstname, lastname, profilepicture" + ((user.email && user.email.length > 0) ? ", email" : "") + ") VALUES(\n            \"" + user.id + "\",\n            \"" + user.firstname + "\",\n            \"" + user.lastname + "\",\n            \"" + user.profilepicture + "\"" + ((user.email && user.email.length > 0) ? (", '" + user.email + "' ") : "") + "\n        )");
        resultQuery.push("UPDATE USERS SET\n        firstname=\"" + user.firstname + "\",\n        lastname=\"" + user.lastname + "\",\n        profilepicture=\"" + user.profilepicture + "\"" + ((user.email && user.email.length > 0) ? (", email='" + user.email + "' ") : "") + "\n        WHERE userID = \"" + user.id + "\"\n        ");
        return resultQuery;
    };
    StorageService.prototype.storeProjectFromUserObject = function (joinTable, userID, project) {
        var resultQuery = [];
        resultQuery.push("INSERT OR IGNORE INTO " + joinTable + " (userID, projectID) VALUES('" + userID + "', '" + project.id + "')");
        resultQuery.push("INSERT OR IGNORE INTO PROJECTS (projectID, title, author, startDate, status) VALUES (\n                    \"" + project.id + "\",\n                    \"" + project.title + "\",\n                    \"" + ((project.author) ? project.author.id : userID) + "\",\n                    \"" + project.startDate + "\",\n                    \"" + project.status + "\"\n                )");
        resultQuery.push("UPDATE PROJECTS SET \n                title=\"" + project.title + "\", \n                startDate=\"" + project.startDate + "\",\n                status=\"" + project.status + "\"\n                WHERE projectID = \"" + project.id + "\"\n                ");
        if (joinTable != "USERS_OWNPROJECTS") {
            var tempQueries = this.storeUserFromProjectObject(null, null, project.author);
            for (var _i = 0, tempQueries_9 = tempQueries; _i < tempQueries_9.length; _i++) {
                var q = tempQueries_9[_i];
                resultQuery.push(q);
            }
        }
        return resultQuery;
    };
    StorageService.prototype.storeApplicationFromUserObject = function (userID, application) {
        var resultQuery = [];
        resultQuery.push("INSERT OR IGNORE INTO USERS_APPLICATIONS (userID, applicationID) VALUES('" + userID + "', '" + application.id + "')");
        resultQuery.push("INSERT OR REPLACE INTO APPLICATIONS (applicationID, message, author, project, status) VALUES(\n                    \"" + application.id + "\",\n                    \"" + application.message + "\",\n                    \"" + application.author.id + "\",\n                    \"" + application.project.id + "\",\n                    \"" + application.status + "\"\n                )");
        var tempQuery = this.storeProjectFromApplicationObject(application.project);
        for (var _i = 0, tempQuery_2 = tempQuery; _i < tempQuery_2.length; _i++) {
            var q = tempQuery_2[_i];
            resultQuery.push(q);
        }
        return resultQuery;
    };
    StorageService.prototype.storeTagFromUserObject = function (userID, tag) {
        var resultQuery = [];
        resultQuery.push("INSERT OR IGNORE INTO USERS_TAGS (userID, tagID) VALUES('" + userID + "', '" + tag.id + "')");
        resultQuery.push("INSERT OR REPLACE INTO TAGS (tagID, title) VALUES(\"" + tag.id + "\", \"" + tag.title + "\")");
        return resultQuery;
    };
    StorageService.prototype.loadProject = function (projectId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.createDB().then(function () {
                var selectQuery = "SELECT DISTINCT * FROM PROJECTS WHERE projectID = '" + projectId + "'";
                var memberQuery = "SELECT u.userID as id, u.firstname, u.lastname, u.profilepicture FROM USERS as u\n                                    LEFT JOIN PROJECTS_MEMBERS AS pm ON pm.userID = u.userID\n                                    WHERE pm.projectID = \"" + projectId + "\"";
                var applicationsQuery = "SELECT a.applicationID as id, a.message, a.status, a.project as projectID, u.userID as userID, u.firstname as firstname, u.lastname as lastname, u.profilepicture as profilepicture FROM APPLICATIONS as a \n                                LEFT JOIN USERS AS u ON u.userID = a.author\n                                INNER JOIN PROJECTS_APPLICATIONS AS pa ON pa.applicationID = a.applicationID\n                                WHERE pa.projectID = \"" + projectId + "\"\n                                ";
                var tagsQuery = "SELECT t.tagID as id, t.title FROM TAGS AS t\n                                    INNER JOIN PROJECTS_TAGS AS pt ON pt.tagID = t.tagID\n                                    WHERE pt.projectID = \"" + projectId + "\"";
                // let applicationsAuthorQuery = `SELECT userID, firstname, lastname, profilepicture FROM USERS`
                var resObject = {};
                _this.db.executeSql(selectQuery, []).then(function (res) {
                    resObject = res.rows.item(0);
                    if (!resObject)
                        throw new Error("No Project found!");
                    resObject["location"] = JSON.parse(resObject["location"]);
                    resObject["payment"] = JSON.parse(resObject["payment"]);
                    resObject["id"] = resObject["projectID"];
                    var authorQuery = "SELECT userID as id, firstname, lastname, profilepicture, email FROM USERS WHERE userID = \"" + resObject['author'] + "\"";
                    return Promise.all([
                        _this.db.executeSql(memberQuery, []),
                        _this.db.executeSql(applicationsQuery, []),
                        _this.db.executeSql(authorQuery, []),
                        _this.db.executeSql(tagsQuery, [])
                    ]);
                }).then(function (res) {
                    resObject["members"] = [];
                    resObject["applications"] = [];
                    resObject["author"] = {};
                    resObject["tags"] = [];
                    resObject["local"] = true;
                    for (var i = 0; i < res[0].rows.length; i++) {
                        resObject["members"].push(_this.mapperService.jsonToUser(res[0].rows.item(i)));
                    }
                    for (var i = 0; i < res[1].rows.length; i++) {
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
                        resObject["applications"].push(_this.mapperService.jsonToApplication(res[1].rows.item(i)));
                    }
                    for (var i = 0; i < res[2].rows.length; i++) {
                        resObject["author"] = _this.mapperService.jsonToUser(res[2].rows.item(i));
                    }
                    for (var i = 0; i < res[3].rows.length; i++) {
                        resObject["tags"].push(_this.mapperService.jsonToTag(res[3].rows.item(i)));
                    }
                    resolve(_this.mapperService.jsonToProject(resObject));
                }).catch(function (error) {
                    reject(error);
                });
            }).catch(function (error) {
                reject(error);
            });
        });
    };
    StorageService.prototype.loadApplication = function (applicationID) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.createDB().then(function () {
                var applicationQuery = "SELECT DISTINCT a.*, u.userID, u.firstname, u.lastname, u.profilepicture, u.email, p.projectID, p.title, p.status from APPLICATIONS as a\n                                        LEFT JOIN USERS as u ON u.userID = a.author\n                                        LEFT JOIN PROJECTS as p ON p.projectID = a.project\n                                        WHERE a.applicationID = \"" + applicationID + "\"";
                var resObject = {};
                _this.db.executeSql(applicationQuery, []).then(function (res) {
                    var tagsQuery = "SELECT DISTINCT t.tagID, t.title FROM TAGS as t \n                                     INNER JOIN USERS_TAGS as ut\n                                     ON ut.tagID = t.tagID WHERE ut.userID = \"" + res.rows.item(0)["userID"] + "\"";
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
                    return _this.db.executeSql(tagsQuery, []);
                }).then(function (res) {
                    resObject["author"]["tags"] = [];
                    for (var i = 0; i < res.rows.length; i++) {
                        resObject["author"]["tags"].push(res.rows.item(i));
                    }
                    resolve(_this.mapperService.jsonToApplication(resObject));
                }).catch(function (error) {
                    reject(error);
                });
            });
        });
    };
    StorageService.prototype.loadUser = function (userID) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.createDB().then(function () {
                var selectQuery = "SELECT * FROM USERS WHERE userID = \"" + userID + "\"";
                var tagsQuery = "SELECT DISTINCT t.tagID, t.title FROM TAGS as t INNER JOIN \n                                USERS_TAGS as ut\n                                ON ut.tagID = t.tagID WHERE ut.userID = \"" + userID + "\"";
                var ownProjectQuery = "SELECT DISTINCT p.*, u.userID, u.firstname, u.lastname, u.profilepicture FROM PROJECTS as p \n                                    LEFT JOIN USERS as u ON u.userID = p.author\n                                    INNER JOIN USERS_OWNPROJECTS as op ON op.projectID = p.projectID \n                                    WHERE op.userID = \"" + userID + "\" ";
                var memberProjectQuery = "SELECT DISTINCT p.*, u.userID, u.firstname, u.lastname, u.profilepicture FROM PROJECTS as p\n                                        LEFT JOIN USERS as u ON u.userID = p.author\n                                        INNER JOIN USERS_MEMBERPROJECTS as mp ON mp.projectID = p.projectID \n                                        WHERE mp.userID = \"" + userID + "\" ";
                var applicationQuery = "SELECT a.*, u.userID, u.firstname, u.lastname, u.profilepicture, p.projectID, p.title from APPLICATIONS as a\n                                        LEFT JOIN USERS as u ON u.userID = a.author\n                                        LEFT JOIN PROJECTS as p ON p.projectID = a.project\n                                        INNER JOIN USERS_APPLICATIONS as ua ON ua.applicationID = a.applicationID\n                                        WHERE ua.userID = \"" + userID + "\"\n                                        ";
                var resObject = {};
                _this.db.executeSql(selectQuery, []).then(function (res) {
                    resObject = res.rows.item(0);
                    if (!resObject)
                        throw new Error("No User found!");
                    resObject["id"] = resObject["userID"];
                    return Promise.all([
                        _this.db.executeSql(tagsQuery, []),
                        _this.db.executeSql(ownProjectQuery, []),
                        _this.db.executeSql(memberProjectQuery, []),
                        _this.db.executeSql(applicationQuery, [])
                    ]);
                }).then(function (res) {
                    resObject["tags"] = [];
                    resObject["ownProjects"] = [];
                    resObject["memberProjects"] = [];
                    resObject["applications"] = [];
                    for (var i = 0; i < res[0].rows.length; i++) {
                        res[0].rows.item(i)["id"] = res[0].rows.item(i)["tagID"];
                        resObject["tags"].push(_this.mapperService.jsonToTag(res[0].rows.item(i)));
                    }
                    for (var i = 0; i < res[1].rows.length; i++) {
                        res[1].rows.item(i)["id"] = res[1].rows.item(i)["projectID"];
                        res[1].rows.item(i)["location"] = JSON.parse(res[1].rows.item(i)["location"]);
                        res[1].rows.item(i)["payment"] = JSON.parse(res[1].rows.item(i)["payment"]);
                        res[1].rows.item(i)["author"] = {
                            id: res[1].rows.item(i)["userID"],
                            firstname: res[1].rows.item(i)["firstname"],
                            lastname: res[1].rows.item(i)["lastname"],
                            profilepicture: res[1].rows.item(i)["profilepicture"]
                        };
                        resObject["ownProjects"].push(_this.mapperService.jsonToProject(res[1].rows.item(i)));
                    }
                    for (var i = 0; i < res[2].rows.length; i++) {
                        res[2].rows.item(i)["id"] = res[2].rows.item(i)["projectID"];
                        res[2].rows.item(i)["location"] = JSON.parse(res[2].rows.item(i)["location"]);
                        res[2].rows.item(i)["payment"] = JSON.parse(res[2].rows.item(i)["payment"]);
                        res[2].rows.item(i)["author"] = {
                            id: res[2].rows.item(i)["userID"],
                            firstname: res[2].rows.item(i)["firstname"],
                            lastname: res[2].rows.item(i)["lastname"],
                            profilepicture: res[2].rows.item(i)["profilepicture"]
                        };
                        resObject["memberProjects"].push(_this.mapperService.jsonToProject(res[2].rows.item(i)));
                    }
                    for (var i = 0; i < res[3].rows.length; i++) {
                        res[3].rows.item(i)["id"] = res[3].rows.item(i)["applicationID"];
                        res[3].rows.item(i)["author"] = {
                            id: res[3].rows.item(i)["userID"],
                            firstname: res[3].rows.item(i)["firstname"],
                            lastname: res[3].rows.item(i)["lastname"],
                            profilepicture: res[3].rows.item(i)["profilepicture"]
                        };
                        res[3].rows.item(i)["project"] = {
                            id: res[3].rows.item(i)["projectID"],
                            title: res[3].rows.item(i)["title"]
                        };
                        resObject["applications"].push(_this.mapperService.jsonToApplication(res[3].rows.item(i)));
                    }
                    resObject["local"] = true;
                    resolve(_this.mapperService.jsonToUser(resObject));
                }, function (error) {
                    reject(error);
                }).catch(function (error) {
                    reject(error);
                });
            }).catch(function (error) {
                reject(error);
            });
        });
    };
    StorageService.prototype.loadTags = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.createDB().then(function () {
                _this.db.executeSql("SELECT * FROM TAGS", []).then(function (tags) {
                    var result = [];
                    for (var i = 0; i < tags.rows.length; i++) {
                        result.push(_this.mapperService.jsonToTag(tags.rows.item(i)));
                    }
                    resolve(result);
                }).catch(function (error) {
                    reject(error);
                });
            });
        });
    };
    StorageService.prototype.removeProject = function (projectId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.createDB().then(function () {
                var queries = [
                    "DELETE FROM APPLICATIONS WHERE project = \"" + projectId + "\"",
                    "DELETE FROM PROJECTS_APPLICATIONS WHERE projectID = \"" + projectId + "\"",
                    "DELETE FROM PROJECTS_MEMBERS WHERE projectID = \"" + projectId + "\"",
                    "DELETE FROM PROJECTS_TAGS WHERE projectID = \"" + projectId + "\"",
                    "DELETE FROM USERS_OWNPROJECTS WHERE projectID = \"" + projectId + "\"",
                    "DELETE FROM USERS_MEMBERPROJECTS WHERE projectID = \"" + projectId + "\"",
                    "DELETE FROM PROJECTS WHERE projectID = \"" + projectId + "\""
                ];
                _this.db.sqlBatch(queries).then(function () {
                    return _this.getCurrentUser();
                }).then(function (userID) {
                    return _this.loadUser(userID);
                }).then(function (user) {
                    _this.userChange.next(user);
                    resolve();
                }).catch(function (e) {
                    reject(e);
                });
            }).catch(function (e) {
                reject(e);
            });
        });
    };
    StorageService.prototype.updateProfilePicture = function (userID, url) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.createDB().then(function () {
                var queries = [
                    "UPDATE USERS SET profilepicture = \"" + url + "\" WHERE userID = \"" + userID + "\""
                ];
                _this.db.sqlBatch(queries).then(function () {
                    return _this.loadUser(userID);
                }).then(function (user) {
                    _this.userChange.next(user);
                    resolve();
                }).catch(function (e) {
                    reject(e);
                });
            }).catch(function (e) {
                reject(e);
            });
        });
    };
    StorageService.prototype.removeMemberFromProject = function (projectID, userID, leaving) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.createDB().then(function () {
                var queries = ["DELETE FROM PROJECTS_MEMBERS WHERE userID = \"" + userID + "\" AND projectID = \"" + projectID + "\""];
                if (leaving) {
                    queries.push("DELETE FROM USERS_MEMBERPROJECTS WHERE userID =\"" + userID + "\" AND projectID = \"" + projectID + "\"");
                }
                _this.db.sqlBatch(queries).then(function () {
                    return _this.getCurrentUser();
                }).then(function (id) {
                    return Promise.all([_this.loadProject(projectID), _this.loadUser(id)]);
                }).then(function (res) {
                    _this.projectChange.next(res[0]);
                    _this.userChange.next(res[1]);
                    resolve();
                }).catch(function (e) {
                    reject(e);
                });
            }).catch(function (e) {
                reject(e);
            });
        });
    };
    StorageService.prototype.changeApplicationStatus = function (applicationID, projectID, userID, status) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.createDB().then(function () {
                var queries = [
                    "UPDATE APPLICATIONS SET status = " + status + " WHERE applicationID = \"" + applicationID + "\""
                ];
                if (status == 2) {
                    queries.push("INSERT INTO PROJECTS_MEMBERS (projectID, userID) VALUES(\"" + projectID + "\", \"" + userID + "\")");
                }
                _this.db.sqlBatch(queries).then(function () {
                    return _this.loadApplication(applicationID);
                }).then(function (application) {
                    return _this.loadProject(application.project.id);
                }).then(function (project) {
                    _this.projectChange.next(project);
                    resolve();
                }).catch(function (e) {
                    reject(e);
                });
            }).catch(function (e) {
                reject(e);
            });
        });
    };
    StorageService.prototype.closeProject = function (projectID) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.createDB().then(function () {
                var queries = [
                    "UPDATE PROJECTS SET status = 1 WHERE projectID = \"" + projectID + "\"",
                    "DELETE FROM APPLICATIONS WHERE project = \"" + projectID + "\"",
                    "DELETE FROM PROJECTS_APPLICATIONS WHERE projectID = \"" + projectID + "\""
                ];
                _this.db.sqlBatch(queries).then(function () {
                    return _this.getCurrentUser();
                }).then(function (userID) {
                    return Promise.all([_this.loadProject(projectID), _this.loadUser(userID)]);
                }).then(function (res) {
                    _this.projectChange.next(res[0]);
                    _this.userChange.next(res[1]);
                    resolve();
                }).catch(function (e) {
                    reject(e);
                });
            }).catch(function (e) {
                reject(e);
            });
        });
    };
    //Adding application from project
    StorageService.prototype.addApplication = function (application) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.createDB().then(function () {
                var queries = [
                    "INSERT INTO USERS_APPLICATIONS (userID, applicationID) VALUES (\n                        \"" + application.authorId + "\",\n                        \"" + application.id + "\"\n                    )",
                    "INSERT OR REPLACE INTO APPLICATIONS (applicationID, message, author, project, status) VALUES (\n                        \"" + application.id + "\",\n                        \"" + application.message + "\",\n                       \" " + application.authorId + "\",\n                       \" " + application.projectId + "\",\n                        \"" + application.status + "\"\n                    )",
                    "INSERT INTO PROJECTS_APPLICATIONS (projectID, applicationID) VALUES (\n                        \"" + application.projectId + "\",\n                        \"" + application.id + "\"\n                    )"
                ];
                _this.db.sqlBatch(queries).then(function () {
                    return Promise.all([_this.loadUser(application.authorId), _this.loadProject(application.projectId)]);
                }).then(function (res) {
                    _this.userChange.next(res[0]);
                    _this.projectChange.next(res[1]);
                    resolve();
                }).catch(function (e) {
                    reject(e);
                });
            }).catch(function (e) {
                reject(e);
            });
        });
    };
    StorageService.prototype.addOwnProjectToUser = function (project) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.createDB().then(function () {
                var manyQuery = "INSERT OR IGNORE INTO USERS_OWNPROJECTS (userID, projectID) VALUES (\n                    \"" + project.author.id + "\",\n                    \"" + project.id + "\"\n                )";
                var insertQuery = "INSERT OR REPLACE INTO PROJECTS (projectID, title, description, startDate, endDate, location, payment, maxMemberAmount, status) VALUES (\n                    \"" + project.id + "\",\n                    \"" + project.title + "\",\n                    \"" + project.description + "\",\n                    \"" + project.startDate + "\",\n                    \"" + project.endDate + "\",\n                    '" + JSON.stringify(project.location) + "',\n                    '" + JSON.stringify(project.payment) + "',\n                    \"" + project.maxMemberAmount + "\",\n                    \"" + project.status + "\"\n                )";
                _this.db.sqlBatch([
                    manyQuery,
                    insertQuery
                ]).then(function () {
                    return _this.loadUser(project.author.id);
                }).then(function (user) {
                    _this.userChange.next(user);
                    resolve();
                }).catch(function (e) {
                    reject(e);
                });
            }).catch(function (e) {
                reject(e);
            });
        });
    };
    StorageService.prototype.getTokens = function () {
        return this.storage.get("tokens");
    };
    StorageService.prototype.setTokens = function (tokens, access, refresh) {
        if (tokens) {
            return this.storage.set("tokens", tokens);
        }
        else {
            return this.storage.set("tokens", {
                accessToken: access,
                refreshToken: refresh
            });
        }
    };
    StorageService.prototype.getCurrentUser = function () {
        return this.storage.get("user");
    };
    StorageService.prototype.subscribeToUserChange = function () {
        return this.userChangeObservable;
    };
    StorageService.prototype.subscribeToProjectChange = function () {
        return this.projectChangeObservable;
    };
    StorageService.prototype.updateCurrentUser = function (user) {
        this.userChange.next(user);
        return Promise.all([this.storage.set("user", user.id), this.storeUser(user)]);
    };
    StorageService.prototype.storeLocalStorage = function (key, value) {
        return this.storage.set(key, value);
    };
    StorageService.prototype.getLocalStorage = function (key) {
        return this.storage.get(key);
    };
    StorageService.prototype.logOut = function () {
        return Promise.all([/*this.googlePlus.logout(),*/ this.storage.remove("tokens"), this.storage.remove("user")]);
    };
    return StorageService;
}());
StorageService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_5__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_3__mapper_service__["a" /* MapperService */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__["a" /* SQLite */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_0__ionic_native_google_plus__["a" /* GooglePlus */]])
], StorageService);

//# sourceMappingURL=storage-service.js.map

/***/ }),

/***/ 387:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TagService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__storage_service__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__data_constants_NetworkConstants__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__data_Tag__ = __webpack_require__(316);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var TagService = (function () {
    function TagService(http, alertCtrl, loadingCtrl, storageService, toastCtrl) {
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.storageService = storageService;
        this.toastCtrl = toastCtrl;
    }
    TagService.prototype.getTags = function () {
        var _this = this;
        var local = __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].fromPromise(this.storageService.loadTags());
        var network = this.http.get(__WEBPACK_IMPORTED_MODULE_3__data_constants_NetworkConstants__["a" /* NetworkConstants */].HOME_URL + "/tags").flatMap(function (result) {
            var tempResult = [];
            result.forEach(function (element) {
                tempResult.push(new __WEBPACK_IMPORTED_MODULE_4__data_Tag__["a" /* Tag */](element._id, element.title));
            });
            return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].fromPromise(_this.storageService.storeTags(tempResult));
        }).flatMap(function (result) {
            return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].of(result);
        });
        return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].zip(local, network);
    };
    TagService.prototype.askForMissingTags = function () {
        this.alertCtrl.create({
            title: 'Noch keine Skills',
            subTitle: 'Du hast noch keine Skills festgelegt!',
            message: 'Bitte wähle in den Einstellungen mindestens einen Skill aus. Klicke links oben um zu den Einstellungen zu gelangen',
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Weiter',
                    role: 'cancel'
                }
            ]
        }).present();
    };
    TagService.prototype.openTagDialog = function (selected) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var loader = _this.loadingCtrl.create({
                content: 'Lade Tags...'
            });
            loader.present();
            _this.getTags().take(1).subscribe(function (results) {
                loader.dismiss();
                var result;
                if (results[1] && results[1].length > 0) {
                    result = results[1];
                }
                else if (results[0] && results[0].length > 0) {
                    result = results[0];
                }
                else {
                    return;
                }
                var alert = _this.alertCtrl.create();
                alert.setTitle("Wähle Tags");
                var _loop_1 = function (i) {
                    alert.addInput({
                        type: "checkbox",
                        label: result[i].title,
                        value: result[i].id + "," + result[i].title,
                        checked: function () {
                            if (selected) {
                                return (selected.find(function (tag) {
                                    return tag.id === result[i].id;
                                }) ? true : false);
                            }
                            return false;
                        }()
                    });
                };
                for (var i = 0; i < result.length; i++) {
                    _loop_1(i);
                }
                alert.addButton({
                    text: "Abbrechen",
                    handler: function (data) {
                    }
                });
                alert.addButton({
                    text: "Fertig",
                    handler: function (data) {
                        var tags = [];
                        data.forEach(function (element) {
                            var values = element.split(",");
                            tags.push(new __WEBPACK_IMPORTED_MODULE_4__data_Tag__["a" /* Tag */](values[0], values[1]));
                        });
                        if (tags.length > 0) {
                            resolve(tags);
                        }
                        else {
                            _this.toastCtrl.create({
                                message: "Es muss mindestens ein Tag ausgewählt sein!",
                                duration: 3000
                            }).present();
                            return false;
                        }
                    }
                });
                alert.present();
            }, function (error) {
                loader.dismiss();
                reject(error);
            });
        });
    };
    return TagService;
}());
TagService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_6__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__angular_common_http__["b" /* HttpClient */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1__storage_service__["a" /* StorageService */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["o" /* ToastController */]])
], TagService);

//# sourceMappingURL=tag-service.js.map

/***/ }),

/***/ 388:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProjectService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__storage_service__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mapper_service__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__data_constants_NetworkConstants__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ProjectService = (function () {
    function ProjectService(http, mapperService, storageService) {
        this.http = http;
        this.mapperService = mapperService;
        this.storageService = storageService;
    }
    ProjectService.prototype.getSingleProject = function (projectId) {
        var _this = this;
        var networkRequest = this.http.get(__WEBPACK_IMPORTED_MODULE_3__data_constants_NetworkConstants__["a" /* NetworkConstants */].HOME_URL + '/projects/' + projectId).retry(3).flatMap(function (res) {
            var project = _this.mapperService.jsonToProject(res);
            return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].fromPromise(_this.storageService.storeProject(project));
        });
        var localRequest = __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].fromPromise(this.storageService.loadProject(projectId)).catch(function (error) {
            return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].empty();
        });
        return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].merge(localRequest, networkRequest);
    };
    ProjectService.prototype.getSingleApplication = function (applicationId) {
        var _this = this;
        var networkRequest = this.http.get(__WEBPACK_IMPORTED_MODULE_3__data_constants_NetworkConstants__["a" /* NetworkConstants */].HOME_URL + '/projects/applications/' + applicationId).retry(3).flatMap(function (result) {
            var application = _this.mapperService.jsonToApplication(result);
            return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].fromPromise(_this.storageService.storeApplication(application));
        });
        var localRequest = __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].fromPromise(this.storageService.loadApplication(applicationId)).catch(function (error) {
            return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].empty();
        });
        return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].merge(localRequest, networkRequest);
    };
    ProjectService.prototype.getInterestingProjects = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(__WEBPACK_IMPORTED_MODULE_3__data_constants_NetworkConstants__["a" /* NetworkConstants */].HOME_URL + '/projects/interestingProjects').subscribe(function (result) {
                var projects = _this.mapperService.jsonToProjectArray(result);
                var promises = [];
                for (var _i = 0, projects_1 = projects; _i < projects_1.length; _i++) {
                    var project = projects_1[_i];
                    promises.push(_this.storageService.storeProject(project));
                }
                Promise.all(promises).then(function () {
                    resolve(projects);
                }).catch(function (e) {
                    reject(e);
                });
            }, function (error) {
                reject(error);
            });
        });
    };
    ProjectService.prototype.addProject = function (project) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var body = {
                data: JSON.stringify(project)
            };
            _this.http.post(__WEBPACK_IMPORTED_MODULE_3__data_constants_NetworkConstants__["a" /* NetworkConstants */].HOME_URL + '/projects/new', body).subscribe(function (result) {
                project.id = result["_id"];
                _this.storageService.addOwnProjectToUser(project).then(function () {
                    resolve(result);
                }).catch(function (e) {
                    reject(e);
                });
            }, function (error) {
                reject(error);
            });
        });
    };
    ProjectService.prototype.removeProject = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.delete(__WEBPACK_IMPORTED_MODULE_3__data_constants_NetworkConstants__["a" /* NetworkConstants */].HOME_URL + '/projects/' + id, { responseType: "text" }).subscribe(function (result) {
                _this.storageService.removeProject(id).then(function () {
                    resolve();
                }).catch(function (error) {
                    reject(error);
                });
            }, function (error) {
                reject(error);
            });
        });
    };
    ProjectService.prototype.editProject = function (project) {
    };
    ProjectService.prototype.canApply = function (user, projectId) {
        if (user.applications) {
            for (var _i = 0, _a = user.applications; _i < _a.length; _i++) {
                var application = _a[_i];
                if (application.authorId == user.id && application.projectId == projectId) {
                    return application;
                }
            }
        }
        return null;
    };
    ProjectService.prototype.isMember = function (user, project) {
        for (var _i = 0, _a = project.members; _i < _a.length; _i++) {
            var member = _a[_i];
            if (user.id == member.id)
                return true;
        }
        return false;
    };
    ProjectService.prototype.sendApplication = function (application) {
        var _this = this;
        var body = {
            data: JSON.stringify(application)
        };
        body.data = body.data.replace("projectId", "project");
        body.data = body.data.replace("author", "unimportant");
        body.data = body.data.replace("authorId", "author");
        return new Promise(function (resolve, reject) {
            _this.http.post(__WEBPACK_IMPORTED_MODULE_3__data_constants_NetworkConstants__["a" /* NetworkConstants */].HOME_URL + '/projects/applications', body).subscribe(function (result) {
                application["id"] = result.applicationId;
                _this.storageService.addApplication(application).then(function () {
                    resolve();
                }).catch(function (error) {
                    reject(error);
                });
            }, function (error) {
                reject(error);
            });
        });
    };
    ProjectService.prototype.changeApplicationStatus = function (id, projectID, userID, status) {
        var _this = this;
        var url = "";
        switch (status) {
            case 0:
                url = "deline/";
                break;
            case 2:
                url = "accept/";
                break;
            default:
                return;
        }
        return new Promise(function (resolve, reject) {
            _this.http.post(__WEBPACK_IMPORTED_MODULE_3__data_constants_NetworkConstants__["a" /* NetworkConstants */].HOME_URL + '/projects/applications/' + url + id, null, { responseType: "text" }).subscribe(function (result) {
                _this.storageService.changeApplicationStatus(id, projectID, userID, status).then(function () {
                    resolve();
                }).catch(function (error) {
                    reject(error);
                });
            }, function (error) {
                reject(error);
            });
        });
    };
    ProjectService.prototype.removeMember = function (userID, projectID, leaving) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var body = { projectID: projectID, userID: userID };
            _this.http.post(__WEBPACK_IMPORTED_MODULE_3__data_constants_NetworkConstants__["a" /* NetworkConstants */].HOME_URL + '/projects/leave', body, { responseType: "text" }).subscribe(function (result) {
                _this.storageService.removeMemberFromProject(projectID, userID, leaving).then(function () {
                    resolve();
                }).catch(function (error) {
                    reject(error);
                });
            }, function (error) {
                reject(error);
            });
        });
    };
    ProjectService.prototype.closeProject = function (projectID) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var body = { projectID: projectID };
            _this.http.post(__WEBPACK_IMPORTED_MODULE_3__data_constants_NetworkConstants__["a" /* NetworkConstants */].HOME_URL + '/projects/close', body, { responseType: "text" }).subscribe(function (result) {
                _this.storageService.closeProject(projectID).then(function () {
                    resolve();
                }).catch(function (error) {
                    reject(error);
                });
            }, function (error) {
                reject(error);
            });
        });
    };
    ProjectService.prototype.formateDate = function (date) {
        __WEBPACK_IMPORTED_MODULE_6_moment___default.a.locale(navigator.language);
        return __WEBPACK_IMPORTED_MODULE_6_moment___default()(date).format("L");
    };
    ProjectService.prototype.calculateDuration = function (date1, date2) {
        var firstDate = __WEBPACK_IMPORTED_MODULE_6_moment___default()(date1);
        var secondDate = __WEBPACK_IMPORTED_MODULE_6_moment___default()(date2);
        var duration = __WEBPACK_IMPORTED_MODULE_6_moment___default.a.duration(secondDate.diff(firstDate));
        return Math.ceil(duration.asWeeks()).toString();
    };
    return ProjectService;
}());
ProjectService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_5__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__angular_common_http__["b" /* HttpClient */],
        __WEBPACK_IMPORTED_MODULE_2__mapper_service__["a" /* MapperService */],
        __WEBPACK_IMPORTED_MODULE_1__storage_service__["a" /* StorageService */]])
], ProjectService);

//# sourceMappingURL=project-service.js.map

/***/ }),

/***/ 389:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Project; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_moment__);

var Project = (function () {
    function Project(title, description, payment, tags, maxMemberAmount, startDate, endDate, status, author, location, applications, id, members, memberAmount, local) {
        this.title = title;
        this.description = description;
        this.payment = payment;
        this.tags = tags;
        this.maxMemberAmount = maxMemberAmount;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;
        this.author = author;
        this.location = location;
        this.applications = applications;
        this.id = id;
        this.members = members;
        this.memberAmount = memberAmount;
        this.local = local;
    }
    Project.prototype.formatDate = function () {
        var momentDate = __WEBPACK_IMPORTED_MODULE_0_moment___default()(this.startDate);
        return momentDate.format();
    };
    return Project;
}());

//# sourceMappingURL=Project.js.map

/***/ }),

/***/ 390:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Location; });
var Location = (function () {
    function Location(coordinates, name) {
        this.coordinates = coordinates;
        this.name = name;
    }
    return Location;
}());

//# sourceMappingURL=Location.js.map

/***/ }),

/***/ 391:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RefreshService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var RefreshService = (function () {
    function RefreshService() {
        this.userChange = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this.refreshObservable = this.userChange.asObservable();
    }
    RefreshService.prototype.refresh = function (data) {
        this.userChange.next(data);
    };
    return RefreshService;
}());
RefreshService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], RefreshService);

//# sourceMappingURL=refresh-service.js.map

/***/ }),

/***/ 392:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mapper_service__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__storage_service__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_constants_NetworkConstants__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__data_SearchSettings__ = __webpack_require__(437);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Subject__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_Subject__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var SearchService = (function () {
    function SearchService(http, storageService, mapperService) {
        this.http = http;
        this.storageService = storageService;
        this.mapperService = mapperService;
        this.searchSettings = new __WEBPACK_IMPORTED_MODULE_4__data_SearchSettings__["a" /* SearchSettings */]();
        this.searchSettingsSource = new __WEBPACK_IMPORTED_MODULE_6_rxjs_Subject__["Subject"]();
        this.searchSettingsObservable = this.searchSettingsSource.asObservable();
    }
    SearchService.prototype.updateSearchSettings = function (key, value) {
        this.searchSettings[key] = value;
        this.searchSettingsSource.next(this.searchSettings);
    };
    SearchService.prototype.getSearchSettings = function () {
        return this.searchSettingsObservable;
    };
    SearchService.prototype.clearSettings = function () {
        this.searchSettings = new __WEBPACK_IMPORTED_MODULE_4__data_SearchSettings__["a" /* SearchSettings */]();
    };
    SearchService.prototype.startSearch = function (searchSettings, page) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var query = "";
            if (searchSettings.query) {
                query += "&query=" + searchSettings.query;
            }
            if (searchSettings.location) {
                query += "&lat=" + searchSettings.location.coordinates[0];
                query += "&lng=" + searchSettings.location.coordinates[1];
            }
            if (searchSettings.tags && searchSettings.tags.length > 0) {
                for (var _i = 0, _a = searchSettings.tags; _i < _a.length; _i++) {
                    var tag = _a[_i];
                    query += "&tags=" + tag.id;
                }
            }
            if (searchSettings.paid) {
                query += "&paid=paid";
            }
            if (page) {
                query += "&page=" + page;
            }
            _this.http.get(__WEBPACK_IMPORTED_MODULE_2__data_constants_NetworkConstants__["a" /* NetworkConstants */].HOME_URL + "/projects/search?" + query).subscribe(function (result) {
                var projects = [];
                if (result && result.length > 0) {
                    result.forEach(function (element) {
                        var tempProject = _this.mapperService.jsonToProject(element);
                        _this.storageService.storeProject(tempProject);
                        projects.push(tempProject);
                    });
                }
                resolve(projects);
            }, function (error) {
                reject(error);
            });
        });
    };
    return SearchService;
}());
SearchService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_5__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__angular_common_http__["b" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_1__storage_service__["a" /* StorageService */],
        __WEBPACK_IMPORTED_MODULE_0__mapper_service__["a" /* MapperService */]])
], SearchService);

//# sourceMappingURL=search-service.js.map

/***/ }),

/***/ 393:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImageUploadService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__login_service__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_constants_NetworkConstants__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_file_transfer__ = __webpack_require__(363);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_file__ = __webpack_require__(364);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ImageUploadService = (function () {
    function ImageUploadService(transfer, loginService, loadingCtrl, file) {
        this.transfer = transfer;
        this.loginService = loginService;
        this.loadingCtrl = loadingCtrl;
        this.file = file;
    }
    ImageUploadService.prototype.uploadProfilePicture = function (fileName) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var loader = _this.loadingCtrl.create({
                content: "Lade hoch..."
            });
            loader.present();
            var fileTransfer = _this.transfer.create();
            var uploadName;
            try {
                uploadName = _this.pathForImage(fileName);
            }
            catch (error) {
                reject(error);
            }
            if (!uploadName) {
                loader.dismiss();
                reject();
            }
            _this.loginService.loginValidation().then(function (token) {
                var options = {
                    fileKey: "file",
                    fileName: fileName,
                    chunkedMode: false,
                    mimeType: "multipart/form-data",
                    headers: { "Authorization": "Bearer " + token },
                    params: { 'fileName': fileName }
                };
                return fileTransfer.upload(uploadName, __WEBPACK_IMPORTED_MODULE_2__data_constants_NetworkConstants__["a" /* NetworkConstants */].HOME_URL + "/profile/image", options);
            }).then(function (data) {
                loader.dismiss();
                resolve(JSON.parse(data.response).url);
            }).catch(function (e) {
                loader.dismiss();
                reject(e);
            });
        });
    };
    ImageUploadService.prototype.pathForImage = function (img) {
        if (img === null) {
            return '';
        }
        else {
            return this.file.dataDirectory + img;
        }
    };
    ImageUploadService.prototype.storeImageLocal = function (namePath, currentName, newFileName) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.file.copyFile(namePath, currentName, _this.file.dataDirectory, newFileName).then(function (success) {
                resolve(newFileName);
            }, function (error) {
                reject(error);
            });
        });
    };
    return ImageUploadService;
}());
ImageUploadService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__ionic_native_file_transfer__["a" /* FileTransfer */], __WEBPACK_IMPORTED_MODULE_0__login_service__["a" /* LoginService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_file__["a" /* File */]])
], ImageUploadService);

//# sourceMappingURL=image-upload-service.js.map

/***/ }),

/***/ 394:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Payment; });
var Payment = (function () {
    function Payment(paid, amount) {
        this.paid = paid;
        this.amount = amount;
    }
    return Payment;
}());

//# sourceMappingURL=Payment.js.map

/***/ }),

/***/ 396:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Application; });
var Application = (function () {
    function Application(message, projectId, authorId, status, author, id, project) {
        this.message = message;
        this.projectId = projectId;
        this.authorId = authorId;
        this.status = status;
        this.author = author;
        this.id = id;
        this.project = project;
    }
    return Application;
}());

//# sourceMappingURL=Application.js.map

/***/ }),

/***/ 397:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return User; });
var User = (function () {
    function User(username, email, password, firstname, lastname, profilepicture, tags, id, applications, ownProjects, memberProjects, local) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
        this.profilepicture = profilepicture;
        this.tags = tags;
        this.id = id;
        this.applications = applications;
        this.ownProjects = ownProjects;
        this.memberProjects = memberProjects;
        this.local = local;
    }
    return User;
}());

//# sourceMappingURL=User.js.map

/***/ }),

/***/ 404:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(405);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(409);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 409:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_image_upload_service__ = __webpack_require__(393);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_firebase__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_notification_service__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_local_notifications__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_refresh_service__ = __webpack_require__(391);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_storage_service__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_mapper_service__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_google_plus__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_tag_service__ = __webpack_require__(387);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_project_service__ = __webpack_require__(388);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_search_service__ = __webpack_require__(392);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_location_service__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__angular_platform_browser__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_splash_screen__ = __webpack_require__(365);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_status_bar__ = __webpack_require__(366);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__angular_common_http__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__services_http_interceptor__ = __webpack_require__(461);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__app_component__ = __webpack_require__(728);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_home_home__ = __webpack_require__(729);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__services_login_service__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__angular_forms__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__ionic_storage__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__ionic_native_geolocation__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__angular_platform_browser_animations__ = __webpack_require__(730);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__ionic_native_google_maps__ = __webpack_require__(401);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__ionic_native_sqlite__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__ionic_native_camera__ = __webpack_require__(403);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__ionic_native_clipboard__ = __webpack_require__(400);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__ionic_native_file_transfer__ = __webpack_require__(363);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__ionic_native_file__ = __webpack_require__(364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__ionic_native_file_path__ = __webpack_require__(402);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__ionic_native_social_sharing__ = __webpack_require__(399);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



































var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_13__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_19__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_20__pages_home_home__["a" /* HomePage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_12__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_25__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_17__angular_common_http__["c" /* HttpClientModule */],
            __WEBPACK_IMPORTED_MODULE_14_ionic_angular__["g" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_19__app_component__["a" /* MyApp */], {}, {
                links: [
                    { loadChildren: '../pages/add-project/add-project.module#AddProjectPageModule', name: 'AddProjectPage', segment: 'add-project', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/application/application.module#ApplicationPageModule', name: 'ApplicationPage', segment: 'application', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/change-password/change-password.module#ChangePasswordPageModule', name: 'ChangePasswordPage', segment: 'change-password', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/delete-account/delete-account.module#DeleteAccountPageModule', name: 'DeleteAccountPage', segment: 'delete-account', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/edit-project/edit-project.module#EditProjectPageModule', name: 'EditProjectPage', segment: 'edit-project', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/feed/feed.module#FeedPageModule', name: 'FeedPage', segment: 'feed', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/forgot-password/forgot-password.module#ForgotPasswordPageModule', name: 'ForgotPasswordPage', segment: 'forgot-password', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/intro/intro.module#IntroPageModule', name: 'IntroPage', segment: 'intro', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/password-reset/password-reset.module#PasswordResetPageModule', name: 'PasswordResetPage', segment: 'password-reset', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/project/project.module#ProjectPageModule', name: 'ProjectPage', segment: 'project', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/registration/registration.module#RegistrationPageModule', name: 'RegistrationPage', segment: 'registration', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/search-filter/search-filter.module#SearchFilterPageModule', name: 'SearchFilterPage', segment: 'search-filter', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/search-place/search-place.module#SearchPlacePageModule', name: 'SearchPlacePage', segment: 'search-place', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/search/search.module#SearchPageModule', name: 'SearchPage', segment: 'search', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/settings/settings.module#SettingsPageModule', name: 'SettingsPage', segment: 'settings', priority: 'low', defaultHistory: [] }
                ]
            }),
            __WEBPACK_IMPORTED_MODULE_22__angular_forms__["d" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_22__angular_forms__["g" /* ReactiveFormsModule */],
            __WEBPACK_IMPORTED_MODULE_23__ionic_storage__["a" /* IonicStorageModule */].forRoot()
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_14_ionic_angular__["e" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_19__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_20__pages_home_home__["a" /* HomePage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_33__ionic_native_social_sharing__["a" /* SocialSharing */],
            __WEBPACK_IMPORTED_MODULE_31__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_32__ionic_native_file_path__["a" /* FilePath */],
            __WEBPACK_IMPORTED_MODULE_30__ionic_native_file_transfer__["a" /* FileTransfer */],
            __WEBPACK_IMPORTED_MODULE_0__services_image_upload_service__["a" /* ImageUploadService */],
            __WEBPACK_IMPORTED_MODULE_28__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_29__ionic_native_clipboard__["a" /* Clipboard */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_local_notifications__["a" /* LocalNotifications */],
            __WEBPACK_IMPORTED_MODULE_1__ionic_native_firebase__["a" /* Firebase */],
            __WEBPACK_IMPORTED_MODULE_16__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_15__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_11__services_location_service__["a" /* LocationService */],
            __WEBPACK_IMPORTED_MODULE_21__services_login_service__["a" /* LoginService */],
            __WEBPACK_IMPORTED_MODULE_24__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_9__services_project_service__["a" /* ProjectService */],
            __WEBPACK_IMPORTED_MODULE_26__ionic_native_google_maps__["a" /* GoogleMaps */],
            __WEBPACK_IMPORTED_MODULE_8__services_tag_service__["a" /* TagService */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_google_plus__["a" /* GooglePlus */],
            __WEBPACK_IMPORTED_MODULE_27__ionic_native_sqlite__["a" /* SQLite */],
            __WEBPACK_IMPORTED_MODULE_10__services_search_service__["a" /* SearchService */],
            __WEBPACK_IMPORTED_MODULE_6__services_mapper_service__["a" /* MapperService */],
            __WEBPACK_IMPORTED_MODULE_4__services_refresh_service__["a" /* RefreshService */],
            __WEBPACK_IMPORTED_MODULE_2__services_notification_service__["a" /* NotificationService */],
            __WEBPACK_IMPORTED_MODULE_5__services_storage_service__["a" /* StorageService */],
            {
                provide: __WEBPACK_IMPORTED_MODULE_17__angular_common_http__["a" /* HTTP_INTERCEPTORS */],
                useClass: __WEBPACK_IMPORTED_MODULE_18__services_http_interceptor__["a" /* TokenInterceptor */],
                multi: true
            },
            { provide: __WEBPACK_IMPORTED_MODULE_13__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_14_ionic_angular__["f" /* IonicErrorHandler */] }
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 435:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 198,
	"./af.js": 198,
	"./ar": 199,
	"./ar-dz": 200,
	"./ar-dz.js": 200,
	"./ar-kw": 201,
	"./ar-kw.js": 201,
	"./ar-ly": 202,
	"./ar-ly.js": 202,
	"./ar-ma": 203,
	"./ar-ma.js": 203,
	"./ar-sa": 204,
	"./ar-sa.js": 204,
	"./ar-tn": 205,
	"./ar-tn.js": 205,
	"./ar.js": 199,
	"./az": 206,
	"./az.js": 206,
	"./be": 207,
	"./be.js": 207,
	"./bg": 208,
	"./bg.js": 208,
	"./bm": 209,
	"./bm.js": 209,
	"./bn": 210,
	"./bn.js": 210,
	"./bo": 211,
	"./bo.js": 211,
	"./br": 212,
	"./br.js": 212,
	"./bs": 213,
	"./bs.js": 213,
	"./ca": 214,
	"./ca.js": 214,
	"./cs": 215,
	"./cs.js": 215,
	"./cv": 216,
	"./cv.js": 216,
	"./cy": 217,
	"./cy.js": 217,
	"./da": 218,
	"./da.js": 218,
	"./de": 219,
	"./de-at": 220,
	"./de-at.js": 220,
	"./de-ch": 221,
	"./de-ch.js": 221,
	"./de.js": 219,
	"./dv": 222,
	"./dv.js": 222,
	"./el": 223,
	"./el.js": 223,
	"./en-au": 224,
	"./en-au.js": 224,
	"./en-ca": 225,
	"./en-ca.js": 225,
	"./en-gb": 226,
	"./en-gb.js": 226,
	"./en-ie": 227,
	"./en-ie.js": 227,
	"./en-nz": 228,
	"./en-nz.js": 228,
	"./eo": 229,
	"./eo.js": 229,
	"./es": 230,
	"./es-do": 231,
	"./es-do.js": 231,
	"./es-us": 232,
	"./es-us.js": 232,
	"./es.js": 230,
	"./et": 233,
	"./et.js": 233,
	"./eu": 234,
	"./eu.js": 234,
	"./fa": 235,
	"./fa.js": 235,
	"./fi": 236,
	"./fi.js": 236,
	"./fo": 237,
	"./fo.js": 237,
	"./fr": 238,
	"./fr-ca": 239,
	"./fr-ca.js": 239,
	"./fr-ch": 240,
	"./fr-ch.js": 240,
	"./fr.js": 238,
	"./fy": 241,
	"./fy.js": 241,
	"./gd": 242,
	"./gd.js": 242,
	"./gl": 243,
	"./gl.js": 243,
	"./gom-latn": 244,
	"./gom-latn.js": 244,
	"./gu": 245,
	"./gu.js": 245,
	"./he": 246,
	"./he.js": 246,
	"./hi": 247,
	"./hi.js": 247,
	"./hr": 248,
	"./hr.js": 248,
	"./hu": 249,
	"./hu.js": 249,
	"./hy-am": 250,
	"./hy-am.js": 250,
	"./id": 251,
	"./id.js": 251,
	"./is": 252,
	"./is.js": 252,
	"./it": 253,
	"./it.js": 253,
	"./ja": 254,
	"./ja.js": 254,
	"./jv": 255,
	"./jv.js": 255,
	"./ka": 256,
	"./ka.js": 256,
	"./kk": 257,
	"./kk.js": 257,
	"./km": 258,
	"./km.js": 258,
	"./kn": 259,
	"./kn.js": 259,
	"./ko": 260,
	"./ko.js": 260,
	"./ky": 261,
	"./ky.js": 261,
	"./lb": 262,
	"./lb.js": 262,
	"./lo": 263,
	"./lo.js": 263,
	"./lt": 264,
	"./lt.js": 264,
	"./lv": 265,
	"./lv.js": 265,
	"./me": 266,
	"./me.js": 266,
	"./mi": 267,
	"./mi.js": 267,
	"./mk": 268,
	"./mk.js": 268,
	"./ml": 269,
	"./ml.js": 269,
	"./mr": 270,
	"./mr.js": 270,
	"./ms": 271,
	"./ms-my": 272,
	"./ms-my.js": 272,
	"./ms.js": 271,
	"./my": 273,
	"./my.js": 273,
	"./nb": 274,
	"./nb.js": 274,
	"./ne": 275,
	"./ne.js": 275,
	"./nl": 276,
	"./nl-be": 277,
	"./nl-be.js": 277,
	"./nl.js": 276,
	"./nn": 278,
	"./nn.js": 278,
	"./pa-in": 279,
	"./pa-in.js": 279,
	"./pl": 280,
	"./pl.js": 280,
	"./pt": 281,
	"./pt-br": 282,
	"./pt-br.js": 282,
	"./pt.js": 281,
	"./ro": 283,
	"./ro.js": 283,
	"./ru": 284,
	"./ru.js": 284,
	"./sd": 285,
	"./sd.js": 285,
	"./se": 286,
	"./se.js": 286,
	"./si": 287,
	"./si.js": 287,
	"./sk": 288,
	"./sk.js": 288,
	"./sl": 289,
	"./sl.js": 289,
	"./sq": 290,
	"./sq.js": 290,
	"./sr": 291,
	"./sr-cyrl": 292,
	"./sr-cyrl.js": 292,
	"./sr.js": 291,
	"./ss": 293,
	"./ss.js": 293,
	"./sv": 294,
	"./sv.js": 294,
	"./sw": 295,
	"./sw.js": 295,
	"./ta": 296,
	"./ta.js": 296,
	"./te": 297,
	"./te.js": 297,
	"./tet": 298,
	"./tet.js": 298,
	"./th": 299,
	"./th.js": 299,
	"./tl-ph": 300,
	"./tl-ph.js": 300,
	"./tlh": 301,
	"./tlh.js": 301,
	"./tr": 302,
	"./tr.js": 302,
	"./tzl": 303,
	"./tzl.js": 303,
	"./tzm": 304,
	"./tzm-latn": 305,
	"./tzm-latn.js": 305,
	"./tzm.js": 304,
	"./uk": 306,
	"./uk.js": 306,
	"./ur": 307,
	"./ur.js": 307,
	"./uz": 308,
	"./uz-latn": 309,
	"./uz-latn.js": 309,
	"./uz.js": 308,
	"./vi": 310,
	"./vi.js": 310,
	"./x-pseudo": 311,
	"./x-pseudo.js": 311,
	"./yo": 312,
	"./yo.js": 312,
	"./zh-cn": 313,
	"./zh-cn.js": 313,
	"./zh-hk": 314,
	"./zh-hk.js": 314,
	"./zh-tw": 315,
	"./zh-tw.js": 315
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 435;

/***/ }),

/***/ 436:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatMessage; });
var ChatMessage = (function () {
    function ChatMessage(message, author, sent) {
        this.message = message;
        this.author = author;
        this.sent = sent;
    }
    return ChatMessage;
}());

//# sourceMappingURL=ChatMessage.js.map

/***/ }),

/***/ 437:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchSettings; });
var SearchSettings = (function () {
    function SearchSettings() {
    }
    return SearchSettings;
}());

//# sourceMappingURL=SearchSettings.js.map

/***/ }),

/***/ 44:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NetworkConstants; });
var NetworkConstants = (function () {
    function NetworkConstants() {
    }
    return NetworkConstants;
}());

//public static HOME_URL: string = "http://localhost:3000";
//public static HOME_URL: string = "http://192.168.1.103:3000";
//public static HOME_URL: string = "http://192.168.0.31:3000";
//public static HOME_URL: string = "http://192.168.0.66:3000";
NetworkConstants.HOME_URL = "http://172.16.16.155:3000";
//# sourceMappingURL=NetworkConstants.js.map

/***/ }),

/***/ 461:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TokenInterceptor; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__data_constants_NetworkConstants__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_service__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__ = __webpack_require__(462);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_observable_fromPromise__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_observable_fromPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_observable_fromPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_common_http__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/**
 * Interceptor for all HTTP calls which adds the auth token and checks for auth errors
 */
var TokenInterceptor = (function () {
    function TokenInterceptor(inj, app, toastCtrl) {
        this.inj = inj;
        this.app = app;
        this.toastCtrl = toastCtrl;
    }
    TokenInterceptor.prototype.intercept = function (request, next) {
        var _this = this;
        var auth = this.inj.get(__WEBPACK_IMPORTED_MODULE_3__login_service__["a" /* LoginService */]);
        if (request.url.startsWith(__WEBPACK_IMPORTED_MODULE_0__data_constants_NetworkConstants__["a" /* NetworkConstants */].HOME_URL + "/auth") || request.url.startsWith(__WEBPACK_IMPORTED_MODULE_0__data_constants_NetworkConstants__["a" /* NetworkConstants */].HOME_URL + "/tags")) {
            return next.handle(request).timeout(5000).do(function (event) {
            }, function (err) {
                if (err instanceof __WEBPACK_IMPORTED_MODULE_7__angular_common_http__["d" /* HttpErrorResponse */]) {
                    if (!request.url.endsWith("/login") && (err.status === 0 || err.status === 400 || err.status === 401 || err.status === 500)) {
                        _this.toastCtrl.create({
                            message: "Authentication error",
                            duration: 3000
                        }).present();
                        auth.logOut();
                        _this.app.getRootNav().setRoot("LoginPage");
                    }
                    return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(err);
                }
            });
        }
        //Check validation and get access token, then transform to Observable
        return Object(__WEBPACK_IMPORTED_MODULE_6_rxjs_observable_fromPromise__["fromPromise"])(auth.loginValidation()).switchMap(function (result) {
            if (result) {
                //Clone request and add auth header
                request = request.clone({
                    setHeaders: {
                        Authorization: "Bearer " + result,
                        'Cache-Control': 'no-cache',
                        Pragma: 'no-cache',
                        Expires: 'Sat, 01 Jan 2000 00:00:00 GMT'
                    }
                });
            }
            return next.handle(request).timeout(5000).do(function (event) {
            }, function (err) {
                if (err instanceof __WEBPACK_IMPORTED_MODULE_7__angular_common_http__["d" /* HttpErrorResponse */]) {
                    if (err.status === 0) {
                        _this.toastCtrl.create({
                            message: "Network request error. Are you connected to the internet?",
                            duration: 3000
                        }).present();
                    }
                    if (err.status === 401) {
                        auth.logOut().then(function () {
                            _this.toastCtrl.create({
                                message: "Not logged in.",
                                duration: 3000
                            }).present();
                            _this.app.getRootNav().setRoot("LoginPage");
                        });
                    }
                    if (err.status === 400) {
                        /*
                        this.toastCtrl.create({
                            message: "Network request error.",
                            duration: 3000
                        }).present();
                        */
                    }
                    if (err.status === 404) {
                        _this.toastCtrl.create({
                            message: "Not found!",
                            duration: 3000
                        }).present();
                        _this.app.getActiveNav().pop();
                    }
                    if (err.status === 500) {
                        /*
                        this.toastCtrl.create({
                            message: "Server error.",
                            duration: 3000
                        }).present();
                        */
                    }
                    return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(err);
                }
            });
        }).catch(function (error) {
            console.log(error.message);
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(new Error(error));
        });
    };
    return TokenInterceptor;
}());
TokenInterceptor = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__angular_core__["D" /* Injector */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */]])
], TokenInterceptor);

//# sourceMappingURL=http-interceptor.js.map

/***/ }),

/***/ 49:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapperService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__data_ChatMessage__ = __webpack_require__(436);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_Location__ = __webpack_require__(390);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_Payment__ = __webpack_require__(394);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__data_Project__ = __webpack_require__(389);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__data_Application__ = __webpack_require__(396);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__data_Tag__ = __webpack_require__(316);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__data_User__ = __webpack_require__(397);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var MapperService = (function () {
    function MapperService() {
    }
    MapperService.prototype.jsonToUser = function (json) {
        if (!json) {
            return null;
        }
        return new __WEBPACK_IMPORTED_MODULE_6__data_User__["a" /* User */](json["username"], json["email"], json["password"], json["firstname"], json["lastname"], json["profilepicture"], this.jsonToTagArray(json["tags"]), json["id"], this.jsonToApplicationArray(json["applications"]), this.jsonToProjectArray(json["ownProjects"]), this.jsonToProjectArray(json["memberProjects"]), json["local"]);
    };
    MapperService.prototype.jsonToUserArray = function (json) {
        var result = [];
        if (json && json.length > 0) {
            for (var _i = 0, json_1 = json; _i < json_1.length; _i++) {
                var user = json_1[_i];
                result.push(this.jsonToUser(user));
            }
        }
        return result;
    };
    MapperService.prototype.jsonToTagArray = function (json) {
        var result = [];
        if (json && json.length > 0) {
            for (var _i = 0, json_2 = json; _i < json_2.length; _i++) {
                var tag = json_2[_i];
                result.push(this.jsonToTag(tag));
            }
        }
        return result;
    };
    MapperService.prototype.jsonToTag = function (json) {
        if (!json) {
            return null;
        }
        return new __WEBPACK_IMPORTED_MODULE_5__data_Tag__["a" /* Tag */](json["id"], json["title"]);
    };
    MapperService.prototype.jsonToApplicationArray = function (json) {
        var result = [];
        if (json && json.length > 0) {
            for (var _i = 0, json_3 = json; _i < json_3.length; _i++) {
                var application = json_3[_i];
                result.push(this.jsonToApplication(application));
            }
        }
        return result;
    };
    MapperService.prototype.jsonToApplication = function (json) {
        if (!json) {
            return null;
        }
        if (!json["project"]) {
            return null;
        }
        return new __WEBPACK_IMPORTED_MODULE_4__data_Application__["a" /* Application */](json["message"], json["project"]["id"], json["author"]["id"], json["status"], this.jsonToUser(json["author"]), json["id"], this.jsonToProject(json["project"]));
    };
    MapperService.prototype.jsonToPayemnt = function (json) {
        if (!json) {
            return null;
        }
        return new __WEBPACK_IMPORTED_MODULE_2__data_Payment__["a" /* Payment */](json["paid"], json["amount"]);
    };
    MapperService.prototype.jsonToLocation = function (json) {
        if (!json) {
            return null;
        }
        return new __WEBPACK_IMPORTED_MODULE_1__data_Location__["a" /* Location */](json["coordinates"], json["name"]);
    };
    MapperService.prototype.jsonToProjectArray = function (json) {
        var result = [];
        if (json && json.length > 0) {
            for (var _i = 0, json_4 = json; _i < json_4.length; _i++) {
                var project = json_4[_i];
                result.push(this.jsonToProject(project));
            }
        }
        return result;
    };
    MapperService.prototype.jsonToProject = function (json) {
        if (!json) {
            return null;
        }
        return new __WEBPACK_IMPORTED_MODULE_3__data_Project__["a" /* Project */](json["title"], json["description"], this.jsonToPayemnt(json["payment"]), this.jsonToTagArray(json["tags"]), json["maxMemberAmount"], json["startDate"], json["endDate"], (json["status"]) ? json["status"] : 0, this.jsonToUser(json["author"]), this.jsonToLocation(json["location"]), this.jsonToApplicationArray(json["applications"]), (json["id"]) ? json["id"] : json["_id"], this.jsonToUserArray(json["members"]), json["memberAmount"], json["local"]);
    };
    MapperService.prototype.jsonToChatMessage = function (json) {
        if (!json) {
            return null;
        }
        return new __WEBPACK_IMPORTED_MODULE_0__data_ChatMessage__["a" /* ChatMessage */](json["message"], this.jsonToUser(json["author"]), new Date(json["sent"]));
    };
    MapperService.prototype.jsonToChatMessageArray = function (json) {
        var result = [];
        if (json && json.length > 0) {
            for (var _i = 0, json_5 = json; _i < json_5.length; _i++) {
                var message = json_5[_i];
                result.push(this.jsonToChatMessage(message));
            }
        }
        return result;
    };
    return MapperService;
}());
MapperService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_7__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], MapperService);

//# sourceMappingURL=mapper-service.js.map

/***/ }),

/***/ 64:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__notification_service__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__storage_service__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mapper_service__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__data_constants_NetworkConstants__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_common_http__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var jwtDecode = __webpack_require__(458);
var LoginService = (function () {
    function LoginService(http, storageService, notificationService, mapperService) {
        this.http = http;
        this.storageService = storageService;
        this.notificationService = notificationService;
        this.mapperService = mapperService;
    }
    LoginService.prototype.login = function (username, password, idToken) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if ((!idToken) && (!username || !password)) {
                reject();
            }
            var body = {};
            var url = "";
            if (idToken) {
                body = { token: idToken, network: "google" };
                url = "/auth/socialLogin";
            }
            else {
                body = { name: username, password: password };
                url = "/auth/login";
            }
            _this.http.post(__WEBPACK_IMPORTED_MODULE_4__data_constants_NetworkConstants__["a" /* NetworkConstants */].HOME_URL + url, body).subscribe(function (result) {
                if (result["tokens"] && result["user"]) {
                    Promise.all([_this.storageService.setTokens(result["tokens"]), _this.storageService.updateCurrentUser(_this.mapperService.jsonToUser(result["user"]))]).then(function () {
                        _this.loggedIn = true;
                        _this.notificationService.storeNotificationToken();
                        resolve();
                    }).catch(function (e) {
                        reject(e);
                    });
                }
                else {
                    reject();
                }
            }, function (error) {
                reject(error);
            });
        });
    };
    LoginService.prototype.register = function (user) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var body = { data: JSON.stringify(user) };
            _this.http.post(__WEBPACK_IMPORTED_MODULE_4__data_constants_NetworkConstants__["a" /* NetworkConstants */].HOME_URL + '/auth/register', body).retry(3).subscribe(function (result) {
                resolve();
            }, function (error) {
                reject(error);
            });
        });
    };
    LoginService.prototype.accessCheck = function () {
        return this.loggedIn;
    };
    LoginService.prototype.freshAccessCheck = function () {
        var _this = this;
        return new Promise(function (resolve, rejct) {
            _this.loginValidation().then(function () {
                resolve(true);
            }).catch(function (error) {
                resolve(false);
            });
        });
    };
    /**
     * Validate current access Token
     *
     * If invalid or about to expire, try to refresh it
     */
    LoginService.prototype.loginValidation = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storageService.getTokens().then(function (result) {
                if (!result) {
                    _this.loggedIn = false;
                    reject();
                }
                var decoded = jwtDecode(result.accessToken);
                if (decoded.exp * 1000 > Date.now() + 300000) {
                    _this.loggedIn = true;
                    resolve(result.accessToken);
                }
                else {
                    return _this.refreshAccessToken(result.refreshToken);
                }
            }).then(function (accessToken) {
                _this.loggedIn = true;
                resolve(accessToken);
            }).catch(function (error) {
                _this.loggedIn = false;
                reject(error);
            });
        });
    };
    //Refreshes the current access token and saves it to Storage
    LoginService.prototype.refreshAccessToken = function (refreshToken) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var body = { refreshToken: refreshToken };
            _this.http.post(__WEBPACK_IMPORTED_MODULE_4__data_constants_NetworkConstants__["a" /* NetworkConstants */].HOME_URL + '/auth/refreshToken', body).subscribe(function (result) {
                if (result["accessToken"]) {
                    _this.storageService.setTokens(null, result["accessToken"], refreshToken);
                    resolve(result["accessToken"]);
                }
                reject();
            }, function (error) {
                reject(error);
            });
        });
    };
    LoginService.prototype.resetPassword = function (name) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var body = {
                name: name
            };
            _this.http.post(__WEBPACK_IMPORTED_MODULE_4__data_constants_NetworkConstants__["a" /* NetworkConstants */].HOME_URL + '/auth/resetPassword', body, { responseType: "text" }).subscribe(function (result) {
                resolve();
            }, function (error) {
                reject(error);
            });
        });
    };
    LoginService.prototype.simplyGetCurrentTokens = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storageService.getTokens().then(function (result) {
                resolve(result);
            }).catch(function () {
                resolve();
            });
        });
    };
    LoginService.prototype.getUser = function () {
        var _this = this;
        var localRequest = __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].fromPromise(this.storageService.getCurrentUser()).flatMap(function (userID) {
            return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].fromPromise(_this.storageService.loadUser(userID));
        }).catch(function (error) {
            return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].empty();
        });
        var networkRequest = this.http.get(__WEBPACK_IMPORTED_MODULE_4__data_constants_NetworkConstants__["a" /* NetworkConstants */].HOME_URL + "/projects/user").flatMap(function (user) {
            var parsedUser = _this.mapperService.jsonToUser(user);
            return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].fromPromise(_this.storageService.updateCurrentUser(parsedUser));
        }).flatMap(function (res) {
            return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].of(res[1]);
        });
        return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].merge(localRequest, networkRequest);
    };
    LoginService.prototype.updateUser = function (user) {
        var _this = this;
        var body = {};
        body["user"] = {};
        body["user"]["firstname"] = user.firstname;
        body["user"]["lastname"] = user.lastname;
        body["user"]["tags"] = [];
        for (var _i = 0, _a = user.tags; _i < _a.length; _i++) {
            var tag = _a[_i];
            body["user"]["tags"].push(tag.id);
        }
        return new Promise(function (resolve, reject) {
            _this.http.patch(__WEBPACK_IMPORTED_MODULE_4__data_constants_NetworkConstants__["a" /* NetworkConstants */].HOME_URL + "/profile", body, { responseType: "text" }).subscribe(function (res) {
                _this.storageService.updateCurrentUser(user).then(function () {
                    resolve();
                }).catch(function (error) {
                    reject(error);
                });
            }, function (error) {
                reject(error);
            });
        });
    };
    LoginService.prototype.getLocalUser = function () {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].fromPromise(this.storageService.getCurrentUser()).flatMap(function (userID) {
            return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].fromPromise(_this.storageService.loadUser(userID));
        });
    };
    LoginService.prototype.deleteAccount = function (email) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var body = {
                email: email
            };
            _this.http.post(__WEBPACK_IMPORTED_MODULE_4__data_constants_NetworkConstants__["a" /* NetworkConstants */].HOME_URL + '/deleteAccount/', body, { responseType: "text" }).subscribe(function (result) {
                resolve();
            }, function (error) {
                reject(error);
            });
        });
    };
    LoginService.prototype.logOut = function () {
        return this.storageService.logOut();
    };
    return LoginService;
}());
LoginService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_5__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6__angular_common_http__["b" /* HttpClient */],
        __WEBPACK_IMPORTED_MODULE_1__storage_service__["a" /* StorageService */],
        __WEBPACK_IMPORTED_MODULE_0__notification_service__["a" /* NotificationService */],
        __WEBPACK_IMPORTED_MODULE_2__mapper_service__["a" /* MapperService */]])
], LoginService);

//# sourceMappingURL=login-service.js.map

/***/ }),

/***/ 728:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_storage_service__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_login_service__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(366);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__ = __webpack_require__(365);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, loginService, storageService, alertCtrl, app) {
        var _this = this;
        this.loginService = loginService;
        this.storageService = storageService;
        this.alertCtrl = alertCtrl;
        this.app = app;
        this.rootPage = "FeedPage";
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
            branchInit();
            _this.loginService.getUser().subscribe(function (user) {
                _this.user = user;
            }, function (error) {
            });
            _this.storageService.subscribeToUserChange().subscribe(function (user) {
                _this.user = user;
            });
        });
        platform.resume.subscribe(function () {
            branchInit();
        });
        var branchInit = function () {
            // only on devices
            if (!platform.is('cordova')) {
                return;
            }
            var Branch = window['Branch'];
            Branch.initSession(function (data) {
                if (data['+clicked_branch_link']) {
                    // read deep link data on click
                    console.log(data);
                    if (data.projectID) {
                        _this.nav.push("ProjectPage", {
                            projectId: data.projectID
                        });
                    }
                }
            });
        };
    }
    MyApp.prototype.openImpressum = function () {
        this.alertCtrl.create({
            title: "Impressum",
            message: "Erstellt von Linu Weiss und Magdalena Mayrhofer. Bei Fragen und Anregungen bitte an weisslinus@gmail.com wenden. Mehr Infos zum Projekt finden Sie auf Github",
            buttons: [
                {
                    text: "Ok",
                    role: "cancel"
                },
                {
                    text: "Github",
                    handler: function () {
                    }
                }
            ]
        });
    };
    MyApp.prototype.logOut = function () {
        var _this = this;
        this.loginService.logOut().then(function () {
            _this.app.getRootNav().setRoot("LoginPage");
        });
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["_14" /* ViewChild */])("mycontent"),
    __metadata("design:type", Object)
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["n" /* Component */])({template:/*ion-inline-start:"C:\Users\linus_000\Documents\GitHub\PRO5\App\src\app\app.html"*/'<ion-menu [content]="mycontent">\n\n  <ion-content>\n\n    <div class="drawer_header">\n\n      <div class="header_content">\n\n        <img class="header_avatar" [src]="user?.profilepicture">\n\n        <p class="header_username">{{user?.firstname}} {{user?.lastname}}</p>\n\n        <p class="header_email">{{user?.email}}</p>\n\n      </div>\n\n    </div>\n\n    <ion-list>\n\n      <button ion-item menuClose (click)="app.getRootNav().push(\'SettingsPage\')">\n\n        <ion-icon name="settings" item-start></ion-icon>\n\n        <h2>Einstellungen</h2>\n\n      </button>\n\n      <button ion-item menuClose (click)="logOut()">\n\n        <ion-icon name="exit" item-start></ion-icon>\n\n        <h2>Ausloggen</h2>\n\n      </button>\n\n      <button ion-item menuClose (click)="openImpressum()">\n\n        <ion-icon name="help-circle" item-start></ion-icon>\n\n        <h2>Impressum</h2>\n\n      </button>\n\n    </ion-list>\n\n  </ion-content>\n\n</ion-menu>\n\n\n\n<ion-nav #mycontent [root]="rootPage"></ion-nav>\n\n'/*ion-inline-end:"C:\Users\linus_000\Documents\GitHub\PRO5\App\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["m" /* Platform */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__["a" /* SplashScreen */],
        __WEBPACK_IMPORTED_MODULE_1__services_login_service__["a" /* LoginService */],
        __WEBPACK_IMPORTED_MODULE_0__services_storage_service__["a" /* StorageService */],
        __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* App */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 729:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_location_service__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(29);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HomePage = (function () {
    function HomePage(navCtrl, locationService) {
        this.navCtrl = navCtrl;
        this.locationService = locationService;
    }
    HomePage.prototype.openLogin = function () {
        this.navCtrl.push("LoginPage");
    };
    HomePage.prototype.openFeed = function () {
        this.navCtrl.push("FeedPage");
    };
    HomePage.prototype.openApplication = function () {
        this.navCtrl.push("ApplicationPage", {
            project: "5a04b4d870bd504f94effe9e"
        });
    };
    HomePage.prototype.openAddProject = function () {
        this.navCtrl.push("AddProjectPage");
    };
    HomePage.prototype.openSettings = function () {
        this.navCtrl.push("SettingsPage");
    };
    HomePage.prototype.openProject = function () {
        this.navCtrl.push("ProjectPage", {
            projectId: "5a1ea10fbbf5d93514647751"
        });
    };
    HomePage.prototype.openSearchPlace = function () {
        this.locationService.selectLocation();
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"C:\Users\linus_000\Documents\GitHub\PRO5\App\src\pages\home\home.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>\n\n      Ionic Blank\n\n    </ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  The world is your oyster.\n\n  <p>\n\n    If you get lost, the\n\n    <a href="http://ionicframework.com/docs/v2">docs</a> will be your guide.\n\n  </p>\n\n  <button ion-button (click)="openLogin()">Login</button>\n\n  <button ion-button (click)="openFeed()">Feed</button>\n\n  <button ion-button (click)="openApplication()">Application</button>\n\n  <button ion-button (click)="openAddProject()">Add Project</button>\n\n  <button ion-button (click)="openProject()">View Project</button>\n\n  <button ion-button (click)="openSearchPlace()">Search Place</button>\n\n  <button ion-button (click)="openSettings()">Settings</button>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\linus_000\Documents\GitHub\PRO5\App\src\pages\home\home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_0__services_location_service__["a" /* LocationService */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ })

},[404]);
//# sourceMappingURL=main.js.map