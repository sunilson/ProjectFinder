webpackJsonp([8],{

/***/ 734:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChangePasswordPageModule", function() { return ChangePasswordPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__change_password__ = __webpack_require__(794);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ChangePasswordPageModule = (function () {
    function ChangePasswordPageModule() {
    }
    return ChangePasswordPageModule;
}());
ChangePasswordPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__change_password__["a" /* ChangePasswordPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__change_password__["a" /* ChangePasswordPage */]),
        ],
    })
], ChangePasswordPageModule);

//# sourceMappingURL=change-password.module.js.map

/***/ }),

/***/ 794:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChangePasswordPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__validators_matchingPasswordsValidator__ = __webpack_require__(795);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_animations__ = __webpack_require__(138);
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
 * Generated class for the ChangePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ChangePasswordPage = (function () {
    function ChangePasswordPage(navCtrl, navParams, fb) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fb = fb;
    }
    ChangePasswordPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ChangePasswordPage');
    };
    ChangePasswordPage.prototype.submitPassword = function () {
        if (this.passwordForm.valid) {
            console.log(this.passwordForm.value);
        }
    };
    ChangePasswordPage.prototype.ngOnInit = function () {
        //Initialize Register form
        this.passwordForm = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* FormGroup */]({
            'password': new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */](null, [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].maxLength(15), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].minLength(5)]),
            'repeatPassword': new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */](null, [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].maxLength(15), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].minLength(5)])
        }, Object(__WEBPACK_IMPORTED_MODULE_3__validators_matchingPasswordsValidator__["a" /* matchingPasswords */])('password', 'repeatPassword'));
    };
    return ChangePasswordPage;
}());
ChangePasswordPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-change-password',template:/*ion-inline-start:"C:\Users\linus_000\Documents\GitHub\PRO5\App\src\pages\change-password\change-password.html"*/'<!--\n\n  Generated template for the ChangePasswordPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>Passwort ändern</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n\n\n<form [formGroup]="passwordForm" (ngSubmit)="submitPassword()">   \n\n  <ion-item>\n\n    <ion-input type="password" id="password" formControlName="password" placeholder="Passwort" clearInput></ion-input>\n\n  </ion-item>\n\n  <div class="errorMessage" [@enterAnimation] *ngIf="passwordForm.controls.password.hasError(\'minlength\') && (passwordForm.get(\'password\').dirty || passwordForm.get(\'password\').touched)">Passwort muss 5 Zeichen lang sein</div>\n\n  <div class="errorMessage" [@enterAnimation] *ngIf="passwordForm.controls.password.hasError(\'maxlength\') && (passwordForm.get(\'password\').dirty || passwordForm.get(\'password\').touched)">Passwort darf maximal 15 Zeichen lang sein</div>\n\n  <ion-item>\n\n    <ion-input type="password" id="repeatPassword" formControlName="repeatPassword" placeholder="Passwort wiederholen" clearInput></ion-input>\n\n  </ion-item>\n\n  <div class="errorMessage" [@enterAnimation] *ngIf="passwordForm.hasError(\'mismatchedPasswords\') && (passwordForm.get(\'repeatPassword\').dirty || passwordForm.get(\'repeatPassword\').touched)">Passwort muss gleich sein</div>\n\n  <button class="submitButton" ion-button type="submit" full margin-top [disabled]="!passwordForm.valid">Passwort ändern</button>\n\n</form>\n\n\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\linus_000\Documents\GitHub\PRO5\App\src\pages\change-password\change-password.html"*/,
        animations: [
            Object(__WEBPACK_IMPORTED_MODULE_4__angular_animations__["k" /* trigger */])('enterAnimation', [
                Object(__WEBPACK_IMPORTED_MODULE_4__angular_animations__["j" /* transition */])(':enter', [
                    Object(__WEBPACK_IMPORTED_MODULE_4__angular_animations__["i" /* style */])({ transform: 'translateY(-10px)', opacity: 0 }),
                    Object(__WEBPACK_IMPORTED_MODULE_4__angular_animations__["e" /* animate */])('200ms', Object(__WEBPACK_IMPORTED_MODULE_4__angular_animations__["i" /* style */])({ transform: 'translateY(0)', opacity: 1 }))
                ]),
                Object(__WEBPACK_IMPORTED_MODULE_4__angular_animations__["j" /* transition */])(':leave', [
                    Object(__WEBPACK_IMPORTED_MODULE_4__angular_animations__["i" /* style */])({ transform: 'translateY(0)', opacity: 1 }),
                    Object(__WEBPACK_IMPORTED_MODULE_4__angular_animations__["e" /* animate */])('200ms', Object(__WEBPACK_IMPORTED_MODULE_4__angular_animations__["i" /* style */])({ transform: 'translateY(-10px)', opacity: 0 }))
                ])
            ])
        ],
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */]])
], ChangePasswordPage);

//# sourceMappingURL=change-password.js.map

/***/ }),

/***/ 795:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = matchingPasswords;
function matchingPasswords(passwordKey, confirmPasswordKey) {
    return function (group) {
        var password = group.controls[passwordKey];
        var confirmPassword = group.controls[confirmPasswordKey];
        if (password.value !== confirmPassword.value) {
            return {
                mismatchedPasswords: true
            };
        }
    };
}
//# sourceMappingURL=matchingPasswordsValidator.js.map

/***/ })

});
//# sourceMappingURL=8.js.map