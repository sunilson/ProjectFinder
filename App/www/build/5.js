webpackJsonp([5],{

/***/ 733:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApplicationPageModule", function() { return ApplicationPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_AutosizeModule__ = __webpack_require__(754);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__application__ = __webpack_require__(793);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ApplicationPageModule = (function () {
    function ApplicationPageModule() {
    }
    return ApplicationPageModule;
}());
ApplicationPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [__WEBPACK_IMPORTED_MODULE_3__application__["a" /* ApplicationPage */]],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__util_AutosizeModule__["a" /* AutosizeModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__application__["a" /* ApplicationPage */]),
        ],
    })
], ApplicationPageModule);

//# sourceMappingURL=application.module.js.map

/***/ }),

/***/ 750:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Autosize; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);

var Autosize = (function () {
    function Autosize(element) {
        this.element = element;
    }
    Autosize.prototype.onInput = function (textArea) {
        this.adjust();
    };
    Autosize.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () { return _this.adjust(); }, 0);
    };
    Autosize.prototype.adjust = function () {
        var textArea = this.element.nativeElement.getElementsByTagName('textarea')[0];
        textArea.style.overflow = 'hidden';
        textArea.style.height = 'auto';
        textArea.style.height = textArea.scrollHeight + "px";
    };
    return Autosize;
}());

Autosize.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* Directive */], args: [{
                selector: 'ion-textarea[autosize]'
            },] },
];
/** @nocollapse */
Autosize.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */], decorators: [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Inject */], args: [__WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */],] },] },
]; };
Autosize.propDecorators = {
    'onInput': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* HostListener */], args: ['input', ['$event.target'],] },],
};
//# sourceMappingURL=autosize.directive.js.map

/***/ }),

/***/ 754:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AutosizeModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic2_autosize__ = __webpack_require__(755);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var AutosizeModule = (function () {
    function AutosizeModule() {
    }
    return AutosizeModule;
}());
AutosizeModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [__WEBPACK_IMPORTED_MODULE_0_ionic2_autosize__["a" /* Autosize */]],
        imports: [],
        exports: [__WEBPACK_IMPORTED_MODULE_0_ionic2_autosize__["a" /* Autosize */]]
    })
], AutosizeModule);

//# sourceMappingURL=AutosizeModule.js.map

/***/ }),

/***/ 755:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic2_autosize_module__ = __webpack_require__(756);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__directives_autosize_directive__ = __webpack_require__(750);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__directives_autosize_directive__["a"]; });


//# sourceMappingURL=index.js.map

/***/ }),

/***/ 756:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export AutosizeModule */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__directives_autosize_directive__ = __webpack_require__(750);



var AutosizeModule = (function () {
    function AutosizeModule() {
    }
    return AutosizeModule;
}());

AutosizeModule.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */], args: [{
                declarations: [
                    __WEBPACK_IMPORTED_MODULE_2__directives_autosize_directive__["a" /* Autosize */]
                ],
                providers: [],
                exports: [
                    __WEBPACK_IMPORTED_MODULE_2__directives_autosize_directive__["a" /* Autosize */]
                ],
                imports: [
                    __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */]
                ],
                schemas: [
                    __WEBPACK_IMPORTED_MODULE_0__angular_core__["i" /* CUSTOM_ELEMENTS_SCHEMA */]
                ]
            },] },
];
/** @nocollapse */
AutosizeModule.ctorParameters = function () { return []; };
//# sourceMappingURL=ionic2-autosize.module.js.map

/***/ }),

/***/ 793:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApplicationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_login_service__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_refresh_service__ = __webpack_require__(391);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_storage_service__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__data_Application__ = __webpack_require__(396);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_project_service__ = __webpack_require__(388);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_animations__ = __webpack_require__(138);
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
 * Generated class for the ApplicationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ApplicationPage = (function () {
    function ApplicationPage(navCtrl, navParams, projectService, loginService, storageService, refreshService, loadingCtrl, toastCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.projectService = projectService;
        this.loginService = loginService;
        this.storageService = storageService;
        this.refreshService = refreshService;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.projectId = this.navParams.get("projectId");
        this.applicationId = this.navParams.get("applicationId");
        if (!this.projectId && !this.applicationId) {
            this.navCtrl.pop();
        }
        this.loginService.getLocalUser().subscribe(function (user) {
            _this.user = user;
            if (_this.applicationId) {
                _this.loadApplication();
            }
        }, function (error) {
            _this.navCtrl.pop();
        });
    }
    ApplicationPage.prototype.ionViewDidLoad = function () {
    };
    ApplicationPage.prototype.loadApplication = function () {
        var _this = this;
        this.projectService.getSingleApplication(this.applicationId).subscribe(function (result) {
            _this.application = result;
        }, function (error) {
            _this.toastCtrl.create({
                message: "Error loading application",
                duration: 3000
            }).present();
            _this.navCtrl.pop();
            console.log(error);
        });
    };
    ApplicationPage.prototype.applyEvent = function () {
        var _this = this;
        if (this.projectId && this.applicationText.value && this.applicationText.value.length > 0) {
            var loader_1 = this.loadingCtrl.create({
                content: "Sending application..."
            });
            loader_1.present();
            this.projectService.sendApplication(new __WEBPACK_IMPORTED_MODULE_3__data_Application__["a" /* Application */](this.applicationText.value, this.projectId, this.user.id, 1, this.user)).then(function () {
                loader_1.dismiss();
                _this.navCtrl.pop();
            }).catch(function (error) {
                console.log(error);
                loader_1.dismiss();
                _this.toastCtrl.create({
                    message: "Error sending your application. Please try again!",
                    duration: 4000
                }).present();
            });
        }
    };
    ApplicationPage.prototype.changeApplicationStatus = function (status) {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Loading..."
        });
        loader.present();
        this.projectService.changeApplicationStatus(this.applicationId, this.projectId, this.application.author.id, status).then(function (result) {
            loader.dismiss();
            _this.navCtrl.pop();
        }).catch(function (error) {
            console.log(error);
            _this.toastCtrl.create({
                message: "Error!",
                duration: 3000
            }).present();
            loader.dismiss();
        });
    };
    ApplicationPage.prototype.ionViewWillEnter = function () {
        if (!this.loginService.freshAccessCheck()) {
            this.navCtrl.setRoot("LoginPage");
        }
    };
    ApplicationPage.prototype.cancel = function () {
        this.navCtrl.pop();
    };
    return ApplicationPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_5__angular_core__["_14" /* ViewChild */])('applicationText'),
    __metadata("design:type", Object)
], ApplicationPage.prototype, "applicationText", void 0);
ApplicationPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_5__angular_core__["n" /* Component */])({
        selector: 'page-application',template:/*ion-inline-start:"C:\Users\linus_000\Documents\GitHub\PRO5\App\src\pages\application\application.html"*/'<!--\n\n  Generated template for the ApplicationPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n  <ion-navbar>\n\n    <ion-title *ngIf="projectId">Neue Bewerbung</ion-title>\n\n    <ion-title *ngIf="application">Bewerbung von {{application.author.firstname}}</ion-title>\n\n    <ion-buttons right>\n\n      <button ion-button icon-only (click)="cancel()">\n\n        <ion-icon name="close"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <div *ngIf="application">\n\n\n\n    <ion-list>\n\n      <ion-item>\n\n        <ion-avatar item-start>\n\n          <img [src]="application?.author?.profilepicture"> </ion-avatar>\n\n        <div>{{application.author.firstname}} {{application.author.lastname}}</div>\n\n        <div>\n\n          <ion-badge *ngFor="let tag of application?.author?.tags" class="tag" color="secondary">{{tag.title}}</ion-badge>\n\n          <ion-badge *ngIf="application?.author?.tags.length == 0" class="tag" color="secondary">Keine Skills</ion-badge>\n\n        </div>\n\n      </ion-item>\n\n      <ion-item>\n\n        <ion-icon item-start name="mail"></ion-icon>\n\n        {{application.author.email}}\n\n      </ion-item>\n\n      <ion-item>\n\n        <ion-icon item-start name="text"></ion-icon>\n\n        {{application.message}}\n\n      </ion-item>\n\n      <ion-item *ngIf="application?.status == 0">\n\n        <ion-icon item-start name="close"></ion-icon>\n\n        Antrag wurde leider abgelehnt\n\n      </ion-item>\n\n      <ion-item *ngIf="application?.status == 1">\n\n        <ion-icon item-start name="help"></ion-icon>\n\n        Antrag muss noch bearbeitet werden\n\n      </ion-item>\n\n      <ion-item *ngIf="application?.status == 2">\n\n        <ion-icon item-start name="checkmark"></ion-icon>\n\n        Antrag wurde angenommen!\n\n      </ion-item>\n\n    </ion-list>\n\n\n\n    <ion-grid *ngIf="application?.project?.author?.id == user?.id && application?.status == 1">\n\n      <ion-row>\n\n        <ion-col>\n\n          <button ion-button block icon-left (click)="changeApplicationStatus(2)">\n\n            <ion-icon name="checkmark"></ion-icon> Annehmen</button>\n\n        </ion-col>\n\n        <ion-col>\n\n          <button ion-button block icon-left color="danger" (click)="changeApplicationStatus(0)">\n\n            <ion-icon name="close"></ion-icon> Ablehnen</button>\n\n        </ion-col>\n\n      </ion-row>\n\n    </ion-grid>\n\n  </div>\n\n  <form *ngIf="projectId">\n\n    <ion-item style="padding: 0">\n\n      <ion-textarea autosize #applicationText type="text" placeholder="Tell us why you want to join this project"></ion-textarea>\n\n    </ion-item>\n\n    <button ion-button [disabled]="applicationText.value.length < 10" full margin-top (click)="applyEvent()">Jetzt bewerben</button>\n\n    <div class="errorMessage" [@enterAnimation] *ngIf="applicationText.value.length < 10">Text muss mindestens 10 Zeichen enthalten!</div>\n\n  </form>\n\n\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\linus_000\Documents\GitHub\PRO5\App\src\pages\application\application.html"*/,
        animations: [
            Object(__WEBPACK_IMPORTED_MODULE_7__angular_animations__["k" /* trigger */])('enterAnimation', [
                Object(__WEBPACK_IMPORTED_MODULE_7__angular_animations__["j" /* transition */])(':enter', [
                    Object(__WEBPACK_IMPORTED_MODULE_7__angular_animations__["i" /* style */])({ transform: 'translateY(-10px)', opacity: 0 }),
                    Object(__WEBPACK_IMPORTED_MODULE_7__angular_animations__["e" /* animate */])('200ms', Object(__WEBPACK_IMPORTED_MODULE_7__angular_animations__["i" /* style */])({ transform: 'translateY(0)', opacity: 1 }))
                ]),
                Object(__WEBPACK_IMPORTED_MODULE_7__angular_animations__["j" /* transition */])(':leave', [
                    Object(__WEBPACK_IMPORTED_MODULE_7__angular_animations__["i" /* style */])({ transform: 'translateY(0)', opacity: 1 }),
                    Object(__WEBPACK_IMPORTED_MODULE_7__angular_animations__["e" /* animate */])('200ms', Object(__WEBPACK_IMPORTED_MODULE_7__angular_animations__["i" /* style */])({ transform: 'translateY(-10px)', opacity: 0 }))
                ])
            ])
        ]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6_ionic_angular__["k" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["l" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_4__services_project_service__["a" /* ProjectService */],
        __WEBPACK_IMPORTED_MODULE_0__services_login_service__["a" /* LoginService */],
        __WEBPACK_IMPORTED_MODULE_2__services_storage_service__["a" /* StorageService */],
        __WEBPACK_IMPORTED_MODULE_1__services_refresh_service__["a" /* RefreshService */],
        __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["i" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["o" /* ToastController */]])
], ApplicationPage);

//# sourceMappingURL=application.js.map

/***/ })

});
//# sourceMappingURL=5.js.map