webpackJsonp([10],{

/***/ 747:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsPageModule", function() { return SettingsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__settings__ = __webpack_require__(887);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SettingsPageModule = (function () {
    function SettingsPageModule() {
    }
    return SettingsPageModule;
}());
SettingsPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__settings__["a" /* SettingsPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__settings__["a" /* SettingsPage */]),
        ],
    })
], SettingsPageModule);

//# sourceMappingURL=settings.module.js.map

/***/ }),

/***/ 887:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_tag_service__ = __webpack_require__(387);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_file_path__ = __webpack_require__(402);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_image_upload_service__ = __webpack_require__(393);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__ = __webpack_require__(403);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_storage_service__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_login_service__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ionic_angular__ = __webpack_require__(29);
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
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SettingsPage = (function () {
    function SettingsPage(navCtrl, navParams, platform, alertCtrl, storageService, actionSheetCtrl, loginService, imageUploadService, filePath, camera, tagService, toastCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        this.storageService = storageService;
        this.actionSheetCtrl = actionSheetCtrl;
        this.loginService = loginService;
        this.imageUploadService = imageUploadService;
        this.filePath = filePath;
        this.camera = camera;
        this.tagService = tagService;
        this.toastCtrl = toastCtrl;
        this.notification = true;
        this.location = true;
        this.loginService.getLocalUser().subscribe(function (user) {
            _this.user = user;
            Promise.all([_this.storageService.getLocalStorage("notification"),
                _this.storageService.getLocalStorage("location")
            ]).then(function (res) {
                if (res != null && res != undefined) {
                    _this.notification = res[0];
                    _this.location = res[1];
                }
            }).catch(function (err) {
            });
        }, function (error) {
            _this.navCtrl.pop();
        });
        this.storageService.subscribeToUserChange().subscribe(function (user) {
            _this.user = user;
        });
    }
    SettingsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SettingsPage');
    };
    SettingsPage.prototype.toggleChanged = function (event, key) {
        this.storageService.storeLocalStorage(key, event.value);
    };
    SettingsPage.prototype.openChangePassword = function () {
        var _this = this;
        this.alertCtrl.create({
            title: 'Passwort ändern',
            message: 'Du erhältst eine Email mit weiteren Anweisungen',
            buttons: [
                {
                    text: 'Abbrechen',
                    role: 'cancel',
                    handler: function () {
                    }
                },
                {
                    text: 'Senden',
                    handler: function () {
                        _this.loginService.resetPassword(_this.user.email).then(function () {
                            _this.toastCtrl.create({
                                message: "Email wurde gesendet!",
                                duration: 3000
                            }).present();
                        }).catch(function (error) {
                            _this.toastCtrl.create({
                                message: "Fehler! Bitte erneut versuchen",
                                duration: 3000
                            }).present();
                        });
                    }
                }
            ]
        }).present();
    };
    SettingsPage.prototype.editUserTags = function () {
        var _this = this;
        this.tagService.openTagDialog(this.user.tags).then(function (res) {
            var oldTags = _this.user.tags;
            _this.user.tags = res;
            _this.loginService.updateUser(_this.user).then(function () {
                _this.toastCtrl.create({
                    message: "Änderung erfolgreich",
                    duration: 3000
                }).present();
            }).catch(function (error) {
                _this.user.tags = oldTags;
                _this.toastCtrl.create({
                    message: "Fehler beim Aktualisieren des Nutzers aufgetreten",
                    duration: 5000
                }).present();
            });
        }).catch(function (e) {
            _this.toastCtrl.create({
                message: "Fehler beim Aktualisieren des Nutzers aufgetreten",
                duration: 5000
            }).present();
        });
    };
    SettingsPage.prototype.openDeleteAccount = function () {
        var _this = this;
        this.alertCtrl.create({
            title: 'Account löschen',
            message: 'Willst du deinen Account permanent löschen?',
            buttons: [
                {
                    text: 'Abbrechen',
                    role: 'cancel',
                    handler: function () {
                    }
                },
                {
                    text: 'Löschen',
                    handler: function () {
                        _this.loginService.deleteAccount(_this.user.email).then(function () {
                            _this.toastCtrl.create({
                                message: "Bestätigungs-Email wurde an Sie gesendet!",
                                duration: 3000
                            }).present();
                        }).catch(function (e) {
                            _this.toastCtrl.create({
                                message: "Fehler!",
                                duration: 3000
                            }).present();
                        });
                    }
                }
            ]
        }).present();
    };
    SettingsPage.prototype.editProfilePicture = function () {
        var _this = this;
        this.actionSheetCtrl.create({
            title: "Quelle von Bild auswählen:",
            buttons: [
                {
                    text: "Aus Gallerie laden",
                    handler: function () {
                        _this.takePicture(_this.camera.PictureSourceType.PHOTOLIBRARY);
                    }
                },
                {
                    text: "Mit Kamera aufnehmen",
                    handler: function () {
                        _this.takePicture(_this.camera.PictureSourceType.CAMERA);
                    }
                }
            ]
        }).present();
    };
    SettingsPage.prototype.takePicture = function (sourceType) {
        var _this = this;
        this.camera.getPicture({
            quality: 100,
            saveToPhotoAlbum: false,
            sourceType: sourceType,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true
        }).then(function (imagePath) {
            var correctPath;
            var currentName;
            if (_this.platform.is('android') && sourceType === _this.camera.PictureSourceType.PHOTOLIBRARY) {
                _this.filePath.resolveNativePath(imagePath)
                    .then(function (filePath) {
                    correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                    currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                    _this.processImage(correctPath, currentName);
                });
            }
            else {
                currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                _this.processImage(correctPath, currentName);
            }
        }, function (err) {
        });
    };
    SettingsPage.prototype.processImage = function (correctPath, currentName) {
        var _this = this;
        this.imageUploadService.storeImageLocal(correctPath, currentName, this.createFileName()).then(function (res) {
            _this.imageUploadService.uploadProfilePicture(res).then(function (url) {
                _this.storageService.updateProfilePicture(_this.user.id, url);
            }).catch(function (e) {
                _this.toastCtrl.create({
                    message: "Fehler beim Hochladen!",
                    duration: 3000
                }).present();
            });
        }).catch(function (e) {
            _this.toastCtrl.create({
                message: "Fehler beim Speichern von Bild!",
                duration: 3000
            }).present();
        });
    };
    SettingsPage.prototype.createFileName = function () {
        var d = new Date(), n = d.getTime(), newFileName = n + ".jpg";
        return newFileName;
    };
    SettingsPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.loginService.freshAccessCheck().then(function (result) {
            if (!result) {
                _this.navCtrl.setRoot("LoginPage");
            }
        });
    };
    return SettingsPage;
}());
SettingsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_6__angular_core__["n" /* Component */])({
        selector: 'page-settings',template:/*ion-inline-start:"C:\Users\linus_000\Documents\GitHub\PRO5\App\src\pages\settings\settings.html"*/'<!--\n\n  Generated template for the SettingsPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>Einstellungen</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n  <div class="profile_header">\n\n    <div class="header_content">\n\n      <img class="avatar" [src]="user?.profilepicture">\n\n      <p class="header_username">{{user?.firstname}} {{user?.lastname}}</p>\n\n      <p class="email">{{user?.email}}</p>\n\n    </div>\n\n  </div>\n\n  <ion-item>\n\n    <ion-label>Push Benachrichtigungen erlauben</ion-label>\n\n    <ion-toggle [(ngModel)]="!notification" (ionChange)="toggleChanged($event, \'notification\')"></ion-toggle>\n\n  </ion-item>\n\n  <ion-item>\n\n    <ion-label>Standortzugriff erlauben</ion-label>\n\n    <ion-toggle [(ngModel)]="!location" (ionChange)="toggleChanged($event, \'location\')"></ion-toggle>\n\n  </ion-item>\n\n  <button ion-item (click)="editProfilePicture()">\n\n    Profilbild bearbeiten\n\n  </button>\n\n  <button ion-item (click)="editUserTags()">\n\n    Skills bearbeiten\n\n    <div>\n\n      <ion-badge *ngFor="let tag of user?.tags" class="tag" color="secondary">{{tag?.title}}</ion-badge>\n\n      <ion-badge *ngIf="user?.tags.length == 0" class="tag" color="secondary">Keine Skills</ion-badge>\n\n    </div>\n\n  </button>\n\n  <button ion-item (click)="openChangePassword()">\n\n    Passwort ändern\n\n  </button>\n\n  <button ion-item disabled (click)="openDeleteAccount()">\n\n    Account löschen (bald möglich)\n\n  </button>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\linus_000\Documents\GitHub\PRO5\App\src\pages\settings\settings.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_7_ionic_angular__["k" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["l" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["m" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_4__services_storage_service__["a" /* StorageService */],
        __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["a" /* ActionSheetController */],
        __WEBPACK_IMPORTED_MODULE_5__services_login_service__["a" /* LoginService */],
        __WEBPACK_IMPORTED_MODULE_2__services_image_upload_service__["a" /* ImageUploadService */],
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_file_path__["a" /* FilePath */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__["a" /* Camera */],
        __WEBPACK_IMPORTED_MODULE_0__services_tag_service__["a" /* TagService */],
        __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["o" /* ToastController */]])
], SettingsPage);

//# sourceMappingURL=settings.js.map

/***/ })

});
//# sourceMappingURL=10.js.map