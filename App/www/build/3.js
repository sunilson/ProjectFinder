webpackJsonp([3],{

/***/ 737:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeedPageModule", function() { return FeedPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pipes_pipes_module__ = __webpack_require__(798);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__feed__ = __webpack_require__(800);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_components_module__ = __webpack_require__(761);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var FeedPageModule = (function () {
    function FeedPageModule() {
    }
    return FeedPageModule;
}());
FeedPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__feed__["a" /* FeedPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_4__components_components_module__["a" /* ComponentsModule */],
            __WEBPACK_IMPORTED_MODULE_0__pipes_pipes_module__["a" /* PipesModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__feed__["a" /* FeedPage */]),
        ],
    })
], FeedPageModule);

//# sourceMappingURL=feed.module.js.map

/***/ }),

/***/ 757:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProjectConstants; });
var ProjectConstants = (function () {
    function ProjectConstants() {
    }
    return ProjectConstants;
}());

ProjectConstants.START_LOCATION = [48.3683495, 14.5128533];
ProjectConstants.REFRESH = {
    projects: "projects"
};
//# sourceMappingURL=ProjectConstants.js.map

/***/ }),

/***/ 761:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComponentsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__project_card_project_card__ = __webpack_require__(762);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ComponentsModule = (function () {
    function ComponentsModule() {
    }
    return ComponentsModule;
}());
ComponentsModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [__WEBPACK_IMPORTED_MODULE_2__project_card_project_card__["a" /* ProjectCardComponent */]],
        imports: [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["g" /* IonicModule */]],
        exports: [__WEBPACK_IMPORTED_MODULE_2__project_card_project_card__["a" /* ProjectCardComponent */]]
    })
], ComponentsModule);

//# sourceMappingURL=components.module.js.map

/***/ }),

/***/ 762:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProjectCardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__data_Project__ = __webpack_require__(389);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_animations__ = __webpack_require__(138);
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
 * Generated class for the ProjectCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var ProjectCardComponent = (function () {
    function ProjectCardComponent() {
        console.log('Hello ProjectCardComponent Component');
        this.text = 'Hello World';
    }
    return ProjectCardComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["E" /* Input */])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__data_Project__["a" /* Project */])
], ProjectCardComponent.prototype, "project", void 0);
ProjectCardComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({
        selector: 'project-card',template:/*ion-inline-start:"C:\Users\linus_000\Documents\GitHub\PRO5\App\src\components\project-card\project-card.html"*/'<!-- Generated template for the ProjectCardComponent component -->\n\n<ion-card class="projectCard" [@cardAnimation]>\n\n  <ion-card-header>\n\n    <ion-row>\n\n      <ion-col col-10>\n\n        <h2>{{project?.title}}</h2>\n\n      </ion-col>\n\n      <ion-col col-2>\n\n        <h2>\n\n          <ion-icon name="people"></ion-icon> {{project?.memberAmount}}/{{project?.maxMemberAmount}}</h2>\n\n      </ion-col>\n\n    </ion-row>\n\n    <ion-row>\n\n      <ion-col>\n\n        <ion-badge class="tag" color="secondary" *ngFor="let tag of project?.tags">{{tag.title}}</ion-badge>\n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-card-header>\n\n  <ion-card-content class="noPaddingBottom">\n\n    <!--\n\n\n\n    <ion-row>\n\n      <ion-col col-6>\n\n        <button class="noPadding" ion-button icon-left clear small>\n\n          <ion-icon name="calendar"></ion-icon>\n\n          <div>01.01.2018</div>\n\n        </button>\n\n      </ion-col>\n\n      <ion-col col-6>\n\n        <button class="noPadding" ion-button left icon-left clear small>\n\n          <ion-icon name="pin"></ion-icon>\n\n          <div *ngIf="project?.location">{{project?.location.name}}</div>\n\n          <div *ngIf="!project?.location">Global</div>\n\n        </button>\n\n\n\n      </ion-col>\n\n    </ion-row>\n\n\n\n    <ion-row>\n\n      <ion-col>\n\n        <ion-badge class="tag" color="secondary" *ngFor="let tag of project?.tags">{{tag.title}}</ion-badge>\n\n      </ion-col>\n\n    </ion-row>\n\n    <hr>\n\n    <ion-item>\n\n      <ion-avatar item-start>\n\n        <img [src]="project?.author?.profilepicture">\n\n      </ion-avatar>\n\n      <p>{{project?.author?.firstname}} {{project?.author?.lastname}}</p>\n\n    </ion-item>\n\n\n\n  -->\n\n\n\n    <ion-list>\n\n      <ion-item>\n\n        <ion-avatar item-start>\n\n          <img [src]="project?.author?.profilepicture">\n\n        </ion-avatar>\n\n        <span>{{project?.author?.firstname}} {{project?.author?.lastname}}</span>\n\n      </ion-item>\n\n      <ion-item>\n\n        <ion-icon name="calendar" item-start></ion-icon>Startet am 22.10.2017</ion-item>\n\n      <ion-item>\n\n        <ion-icon name="pin" item-start></ion-icon>\n\n        <span *ngIf="project?.location">{{project?.location?.name}}</span>\n\n        <span *ngIf="!project?.location">Global</span>\n\n      </ion-item>\n\n      <ion-item>\n\n        <ion-icon name="cash" item-start></ion-icon>\n\n        <span *ngIf="project?.payment.paid">Paid</span>\n\n        <span *ngIf="!project?.payment.paid">Unpaid</span>\n\n      </ion-item>\n\n    </ion-list>\n\n  </ion-card-content>\n\n</ion-card>\n\n'/*ion-inline-end:"C:\Users\linus_000\Documents\GitHub\PRO5\App\src\components\project-card\project-card.html"*/,
        animations: [
            Object(__WEBPACK_IMPORTED_MODULE_2__angular_animations__["k" /* trigger */])('cardAnimation', [
                Object(__WEBPACK_IMPORTED_MODULE_2__angular_animations__["h" /* state */])('in', Object(__WEBPACK_IMPORTED_MODULE_2__angular_animations__["i" /* style */])({ transform: 'translateX(0)' })),
                Object(__WEBPACK_IMPORTED_MODULE_2__angular_animations__["j" /* transition */])('void => *', [
                    Object(__WEBPACK_IMPORTED_MODULE_2__angular_animations__["e" /* animate */])(400, Object(__WEBPACK_IMPORTED_MODULE_2__angular_animations__["f" /* keyframes */])([
                        Object(__WEBPACK_IMPORTED_MODULE_2__angular_animations__["i" /* style */])({ opacity: 0, transform: 'translateX(-100%)', offset: 0 }),
                        Object(__WEBPACK_IMPORTED_MODULE_2__angular_animations__["i" /* style */])({ opacity: 1, transform: 'translateX(15px)', offset: 0.3 }),
                        Object(__WEBPACK_IMPORTED_MODULE_2__angular_animations__["i" /* style */])({ opacity: 1, transform: 'translateX(0)', offset: 1.0 })
                    ]))
                ]),
                Object(__WEBPACK_IMPORTED_MODULE_2__angular_animations__["j" /* transition */])('* => void', [
                    Object(__WEBPACK_IMPORTED_MODULE_2__angular_animations__["e" /* animate */])(400, Object(__WEBPACK_IMPORTED_MODULE_2__angular_animations__["f" /* keyframes */])([
                        Object(__WEBPACK_IMPORTED_MODULE_2__angular_animations__["i" /* style */])({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
                        Object(__WEBPACK_IMPORTED_MODULE_2__angular_animations__["i" /* style */])({ opacity: 1, transform: 'translateX(-15px)', offset: 0.7 }),
                        Object(__WEBPACK_IMPORTED_MODULE_2__angular_animations__["i" /* style */])({ opacity: 0, transform: 'translateX(100%)', offset: 1.0 })
                    ]))
                ])
            ])
        ]
    }),
    __metadata("design:paramtypes", [])
], ProjectCardComponent);

//# sourceMappingURL=project-card.js.map

/***/ }),

/***/ 798:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PipesModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__date_pipe__ = __webpack_require__(799);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PipesModule = (function () {
    function PipesModule() {
    }
    return PipesModule;
}());
PipesModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_1__date_pipe__["a" /* DatePipe */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["g" /* IonicModule */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_1__date_pipe__["a" /* DatePipe */]
        ]
    })
], PipesModule);

//# sourceMappingURL=pipes.module.js.map

/***/ }),

/***/ 799:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DatePipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var DatePipe = (function () {
    function DatePipe() {
    }
    DatePipe.prototype.transform = function (value, args) {
        if (!value)
            return value;
        var date = __WEBPACK_IMPORTED_MODULE_1_moment___default()(value);
        return date.utc().format("DD.MM.YYYY");
    };
    return DatePipe;
}());
DatePipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Pipe */])({ name: 'formatDate' })
], DatePipe);

//# sourceMappingURL=date-pipe.js.map

/***/ }),

/***/ 800:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeedPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_tag_service__ = __webpack_require__(387);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_constants_ProjectConstants__ = __webpack_require__(757);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_refresh_service__ = __webpack_require__(391);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_storage_service__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_project_service__ = __webpack_require__(388);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_login_service__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_animations__ = __webpack_require__(138);
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
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var FeedPage = (function () {
    function FeedPage(navCtrl, navParams, modalCtrl, loginService, storageService, projectService, tagService, refreshService, loadingController) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.loginService = loginService;
        this.storageService = storageService;
        this.projectService = projectService;
        this.tagService = tagService;
        this.refreshService = refreshService;
        this.loadingController = loadingController;
        this.loadEverything();
        this.storageService.subscribeToUserChange().subscribe(function (user) {
            _this.user = user;
            _this.content.resize();
        });
        this.refreshService.refreshObservable.subscribe(function (data) {
            if (data == __WEBPACK_IMPORTED_MODULE_1__data_constants_ProjectConstants__["a" /* ProjectConstants */].REFRESH.projects)
                _this.refresh();
        });
    }
    FeedPage.prototype.getApplicationIcon = function (a) {
        if (a.status == 0) {
            return "help-circle";
        }
        if (a.status == 1) {
            return "checkmark-circle";
        }
        if (a.status == 2) {
            return "close-circle";
        }
    };
    FeedPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.loginService.freshAccessCheck().then(function (result) {
            if (!result) {
                _this.navCtrl.setRoot("LoginPage");
            }
        });
    };
    FeedPage.prototype.openApplication = function (application) {
        this.modalCtrl.create("ApplicationPage", { applicationId: application.id }).present();
    };
    FeedPage.prototype.loadEverything = function () {
        var _this = this;
        var loader = this.loadingController.create({
            content: "Lade Daten..."
        });
        loader.present();
        this.loginService.getUser().subscribe(function (user) {
            if (loader) {
                loader.dismiss();
                loader = null;
            }
            if (user && user.id) {
                //Only on network user
                if (!user.local) {
                    //Check if intro was already shown. If not, start it
                    _this.storageService.getLocalStorage("intro" + user.id).then(function (value) {
                        if (!value) {
                            _this.modalCtrl.create("IntroPage", {
                                userID: user.id
                            }).present();
                        }
                    });
                    if (user.tags.length == 0) {
                        _this.tagService.askForMissingTags();
                    }
                }
                //Return if network call was faster
                if (_this.user && user.local) {
                    return;
                }
                _this.user = user;
                _this.content.resize();
            }
        }, function (error) {
            if (loader) {
                loader.dismiss();
                loader = null;
            }
        });
        this.projectService.getInterestingProjects().then(function (projects) {
            _this.interestingProjects = projects;
        }).catch(function (error) {
            console.log(error);
        });
    };
    FeedPage.prototype.refresh = function () {
        this.loadEverything();
    };
    return FeedPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_6__angular_core__["_14" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_7_ionic_angular__["d" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["d" /* Content */])
], FeedPage.prototype, "content", void 0);
FeedPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_6__angular_core__["n" /* Component */])({
        selector: 'page-feed',template:/*ion-inline-start:"C:\Users\linus_000\Documents\GitHub\PRO5\App\src\pages\feed\feed.html"*/'<!--\n\n  Generated template for the FeedPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>Feed von {{user?.firstname}}</ion-title>\n\n    <ion-buttons left>\n\n      <button ion-button icon-only menuToggle>\n\n        <ion-icon name="menu"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n    <ion-buttons right>\n\n      <button ion-button icon-only (click)="navCtrl.push(\'SearchPage\')">\n\n        <ion-icon name="search"></ion-icon>\n\n      </button>\n\n      <button ion-button icon-only (click)="refresh()">\n\n        <ion-icon name="refresh"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content id="mainContent">\n\n  <ion-fab bottom right>\n\n    <button color="secondary" ion-fab (click)="this.navCtrl.push(\'AddProjectPage\')">\n\n      <ion-icon name="add"></ion-icon>\n\n    </button>\n\n  </ion-fab>\n\n\n\n  <div style="padding: 10px" *ngIf="user" [@enterAnimation]>\n\n    <ion-card>\n\n      <ion-card-header class="boldText">\n\n        Meine Projekte\n\n      </ion-card-header>\n\n      <ion-list>\n\n        <button ion-item *ngFor="let project of user.ownProjects" (click)="navCtrl.push(\'ProjectPage\', {projectId: project.id})">\n\n          <ion-avatar item-start>\n\n            <img [src]="user.profilepicture">\n\n          </ion-avatar>\n\n          <ion-grid>\n\n            <ion-row>\n\n              <span style="padding-right: 5px" *ngIf="project.status != 0">[Closed]</span>{{project.title}}\n\n            </ion-row>\n\n            <ion-row class="small">\n\n              Startet am {{project.startDate | formatDate}}\n\n            </ion-row>\n\n          </ion-grid>\n\n        </button>\n\n        <ion-item *ngIf="user?.ownProjects?.length == 0">\n\n          Noch keine Projekte erstellt\n\n        </ion-item>\n\n      </ion-list>\n\n    </ion-card>\n\n\n\n    <ion-card>\n\n      <ion-card-header class="boldText">\n\n        Beigetretene Projekte\n\n      </ion-card-header>\n\n\n\n      <ion-list>\n\n        <button ion-item *ngFor="let project of user.memberProjects" (click)="navCtrl.push(\'ProjectPage\', {projectId: project.id})">\n\n          <ion-avatar item-start>\n\n            <img [src]="project.author.profilepicture">\n\n          </ion-avatar>\n\n          <ion-grid>\n\n            <ion-row>\n\n              <span style="padding-right: 5px" *ngIf="project.status != 0">[Closed]</span>{{project.title}}\n\n            </ion-row>\n\n            <ion-row class="small">\n\n              Startet am {{project.startDate | formatDate}}\n\n            </ion-row>\n\n          </ion-grid>\n\n        </button>\n\n        <ion-item *ngIf="!user?.memberProjects || user?.memberProjects?.length == 0">\n\n          Noch keinen Projekten beigetreten\n\n        </ion-item>\n\n      </ion-list>\n\n    </ion-card>\n\n\n\n    <ion-card>\n\n      <ion-card-header class="boldText">\n\n        Meine Projektanträge\n\n      </ion-card-header>\n\n\n\n      <ion-list>\n\n\n\n        <button ion-item *ngFor="let application of user.applications" (click)="openApplication(application)">\n\n          <ion-icon *ngIf="application.status == 0" name="close" item-start></ion-icon>\n\n          <ion-icon *ngIf="application.status == 1" name="help" item-start></ion-icon>\n\n          <ion-icon *ngIf="application.status == 2" name="checkmark" item-start></ion-icon>\n\n          {{application.project.title}}\n\n        </button>\n\n        <ion-item *ngIf="!user?.applications || user?.applications?.length < 1">\n\n          Keine Bewerbungen vorhanden\n\n        </ion-item>\n\n\n\n      </ion-list>\n\n    </ion-card>\n\n\n\n    <ion-card>\n\n      <ion-card-header class="boldText">\n\n        Projekte die dich interessieren könnten\n\n      </ion-card-header>\n\n\n\n      <ion-list>\n\n        <button ion-item *ngFor="let project of interestingProjects" (click)="navCtrl.push(\'ProjectPage\', {projectId: project.id})">\n\n          <ion-avatar item-start>\n\n            <img [src]="project.author.profilepicture">\n\n          </ion-avatar>\n\n          <ion-grid>\n\n            <ion-row>\n\n              <span style="padding-right: 5px" *ngIf="project.status != 0">[Closed]</span>{{project.title}}\n\n            </ion-row>\n\n            <ion-row class="small">\n\n              Startet am {{project.startDate | formatDate}}\n\n            </ion-row>\n\n          </ion-grid>\n\n        </button>\n\n        <ion-item *ngIf="interestingProjects?.length == 0">\n\n          Keine Projekte gefunden\n\n        </ion-item>\n\n      </ion-list>\n\n    </ion-card>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\linus_000\Documents\GitHub\PRO5\App\src\pages\feed\feed.html"*/,
        animations: [
            Object(__WEBPACK_IMPORTED_MODULE_8__angular_animations__["k" /* trigger */])('enterAnimation', [
                Object(__WEBPACK_IMPORTED_MODULE_8__angular_animations__["j" /* transition */])(':enter', [
                    Object(__WEBPACK_IMPORTED_MODULE_8__angular_animations__["i" /* style */])({ transform: 'translateY(50px)', opacity: 0 }),
                    Object(__WEBPACK_IMPORTED_MODULE_8__angular_animations__["e" /* animate */])('200ms', Object(__WEBPACK_IMPORTED_MODULE_8__angular_animations__["i" /* style */])({ transform: 'translateY(0)', opacity: 1 }))
                ])
            ])
        ],
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_7_ionic_angular__["k" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["l" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["j" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_5__services_login_service__["a" /* LoginService */],
        __WEBPACK_IMPORTED_MODULE_3__services_storage_service__["a" /* StorageService */],
        __WEBPACK_IMPORTED_MODULE_4__services_project_service__["a" /* ProjectService */],
        __WEBPACK_IMPORTED_MODULE_0__services_tag_service__["a" /* TagService */],
        __WEBPACK_IMPORTED_MODULE_2__services_refresh_service__["a" /* RefreshService */],
        __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["i" /* LoadingController */]])
], FeedPage);

//# sourceMappingURL=feed.js.map

/***/ })

});
//# sourceMappingURL=3.js.map