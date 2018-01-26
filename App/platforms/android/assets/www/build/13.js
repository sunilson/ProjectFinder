webpackJsonp([13],{

/***/ 740:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPageModule", function() { return LoginPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login__ = __webpack_require__(858);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var LoginPageModule = (function () {
    function LoginPageModule() {
    }
    return LoginPageModule;
}());
LoginPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__login__["a" /* LoginPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__login__["a" /* LoginPage */])
        ],
    })
], LoginPageModule);

//# sourceMappingURL=login.module.js.map

/***/ }),

/***/ 858:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_storage_service__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_animations__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_login_service__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_google_plus__ = __webpack_require__(140);
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
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginPage = (function () {
    function LoginPage(loginService, navCtrl, navParams, toastCtrl, storageService, loadingCtrl, googlePlus) {
        var _this = this;
        this.loginService = loginService;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.storageService = storageService;
        this.loadingCtrl = loadingCtrl;
        this.googlePlus = googlePlus;
        this.loginService.freshAccessCheck().then(function (result) {
            if (result) {
                _this.navCtrl.setRoot("FeedPage");
            }
        }).catch(function (error) {
        });
        this.storageService.getLocalStorage("username").then(function (username) {
            _this.username = username;
        });
    }
    LoginPage.prototype.ngOnInit = function () {
        this.myForm = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* FormGroup */]({
            'username': new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */](null, [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required]),
            'password': new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */](null, [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required])
        });
    };
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    /**
     * Called after form submit. Calls login service
     *
     */
    LoginPage.prototype.submitLogin = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Logging in..."
        });
        loader.present();
        this.submitAttempt = true;
        if (this.myForm.valid) {
            this.loginService.login(this.myForm.value.username, this.myForm.value.password).then(function (result) {
                _this.storageService.storeLocalStorage("username", _this.myForm.value.username);
                loader.dismiss();
                _this.navCtrl.setRoot("FeedPage");
            }).catch(function (error) {
                console.log(error);
                loader.dismiss();
                var errorMessage = "Login error!";
                if (error.status == 401) {
                    errorMessage = error.error;
                }
                _this.toastCtrl.create({
                    message: errorMessage,
                    duration: 2000
                }).present();
            });
        }
        else {
            loader.dismiss();
        }
    };
    LoginPage.prototype.openRegistration = function () {
        this.navCtrl.push("RegistrationPage");
    };
    LoginPage.prototype.openForgotPassword = function () {
        this.navCtrl.push("ForgotPasswordPage");
    };
    LoginPage.prototype.googleLogin = function () {
        var _this = this;
        this.googlePlus.login({
            'webClientId': '475022388364-nfcpv4ak0amnjhl0tksima99j1m8efns.apps.googleusercontent.com' // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
        })
            .then(function (res) {
            _this.loginService.login(null, null, res.idToken).then(function (result) {
                _this.toastCtrl.create({
                    message: "Login success!",
                    duration: 2000
                }).present();
                _this.navCtrl.setRoot("FeedPage");
            }).catch(function (error) {
                _this.toastCtrl.create({
                    message: "Login error!",
                    duration: 2000
                }).present();
            });
        })
            .catch(function (err) { return console.error(err); });
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["n" /* Component */])({
        selector: 'page-login',template:/*ion-inline-start:"C:\Users\linus_000\Documents\GitHub\PRO5\App\src\pages\login\login.html"*/'<ion-content padding>\n\n  <div>\n\n    <img width="100" height="100" src="assets/imgs/icon.png">\n\n  </div>\n\n\n\n  <h1>Project Finder</h1>\n\n\n\n  <form [formGroup]="myForm" (ngSubmit)="submitLogin()">\n\n    <ion-item>\n\n      <ion-input type="email" id="username" formControlName="username" [value]="username" placeholder="Benutzername"></ion-input>\n\n    </ion-item>\n\n    <div class="errorMessage" [@enterAnimation] *ngIf="myForm.controls.username.hasError(\'required\') && (myForm.get(\'username\').dirty || myForm.get(\'username\').touched || submitAttempt)">Username darf nicht leer sein!</div>\n\n\n\n    <ion-item>\n\n      <ion-input type="password" id="password" formControlName="password" placeholder="Passwort"></ion-input>\n\n    </ion-item>\n\n    <div class="errorMessage" [@enterAnimation] *ngIf="myForm.controls.password.hasError(\'required\') && (myForm.get(\'password\').dirty || myForm.get(\'password\').touched || submitAttempt)">Passwort darf nicht leer sein!</div>\n\n    <button type="submit" class="buttonMargin" ion-button full>Login</button>\n\n  </form>\n\n  <button ion-button full margin-top (click)="googleLogin()">\n\n    <img class="googleIcon" src="assets/imgs/logo-google-plus_ss.png"> Login mit Google Account\n\n  </button>\n\n  <div class="center">\n\n    <button ion-button clear (click)="openRegistration()">Jetzt registrieren</button>\n\n    <button ion-button clear (click)="openForgotPassword()">Passwort vergessen</button>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\linus_000\Documents\GitHub\PRO5\App\src\pages\login\login.html"*/,
        providers: [],
        animations: [
            Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["k" /* trigger */])('enterAnimation', [
                Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["j" /* transition */])(':enter', [
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["i" /* style */])({ transform: 'translateY(-10px)', opacity: 0 }),
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["e" /* animate */])('200ms', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["i" /* style */])({ transform: 'translateY(0)', opacity: 1 }))
                ]),
                Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["j" /* transition */])(':leave', [
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["i" /* style */])({ transform: 'translateY(0)', opacity: 1 }),
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["e" /* animate */])('200ms', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["i" /* style */])({ transform: 'translateY(-10px)', opacity: 0 }))
                ])
            ])
        ],
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__services_login_service__["a" /* LoginService */],
        __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["k" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["l" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["o" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_0__services_storage_service__["a" /* StorageService */],
        __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["i" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_6__ionic_native_google_plus__["a" /* GooglePlus */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ })

});
//# sourceMappingURL=13.js.map