webpackJsonp([6],{

/***/ 743:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegistrationPageModule", function() { return RegistrationPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__registration__ = __webpack_require__(881);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var RegistrationPageModule = (function () {
    function RegistrationPageModule() {
    }
    return RegistrationPageModule;
}());
RegistrationPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__registration__["a" /* RegistrationPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__registration__["a" /* RegistrationPage */]),
        ],
    })
], RegistrationPageModule);

//# sourceMappingURL=registration.module.js.map

/***/ }),

/***/ 881:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegistrationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_tag_service__ = __webpack_require__(387);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_User__ = __webpack_require__(397);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_login_service__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__validators_matchingPasswordsValidator__ = __webpack_require__(882);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_animations__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__validators_nameValidator__ = __webpack_require__(883);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var RegistrationPage = (function () {
    function RegistrationPage(fb, navCtrl, loginService, tagService, toastCtrl) {
        this.fb = fb;
        this.navCtrl = navCtrl;
        this.loginService = loginService;
        this.tagService = tagService;
        this.toastCtrl = toastCtrl;
    }
    /**
     * Called after register form has been submitted
     */
    RegistrationPage.prototype.submitRegistration = function () {
        var _this = this;
        if (this.myForm.valid) {
            var tagIds = [];
            if (this.tags) {
                for (var _i = 0, _a = this.tags; _i < _a.length; _i++) {
                    var tag = _a[_i];
                    tagIds.push(tag.id);
                }
            }
            var user = new __WEBPACK_IMPORTED_MODULE_1__data_User__["a" /* User */](this.myForm.value.username, this.myForm.value.email, this.myForm.value.password, this.myForm.value.firstname, this.myForm.value.lastname, null, tagIds);
            this.loginService.register(user).then(function () {
                _this.toastCtrl.create({
                    message: "Registration erfolgreich! Eine Bestätigungs Email wurde an Ihre E-Mail Adresse gesandt.",
                    duration: 5000
                }).present();
                _this.navCtrl.setRoot("LoginPage");
            }).catch(function (error) {
                _this.toastCtrl.create({
                    message: "Registration not successful!",
                    duration: 3000
                }).present();
            });
        }
    };
    RegistrationPage.prototype.addSkill = function () {
        var _this = this;
        this.tagService.openTagDialog((this.tags) ? this.tags : null).then(function (result) {
            _this.tags = result;
        }).catch(function (error) {
            if (error) {
                _this.toastCtrl.create({
                    message: "Error getting Tags",
                    duration: 2000
                }).present();
            }
        });
    };
    RegistrationPage.prototype.removeTag = function (tag) {
        this.tags.splice(this.tags.indexOf(tag), 1);
    };
    RegistrationPage.prototype.ngOnInit = function () {
        //Initialize Register form
        this.myForm = new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["c" /* FormGroup */]({
            'firstname': new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["b" /* FormControl */](null, [__WEBPACK_IMPORTED_MODULE_5__angular_forms__["h" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["h" /* Validators */].maxLength(15), __WEBPACK_IMPORTED_MODULE_8__validators_nameValidator__["a" /* nameValidator */]]),
            'lastname': new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["b" /* FormControl */](null, [__WEBPACK_IMPORTED_MODULE_5__angular_forms__["h" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["h" /* Validators */].maxLength(15), __WEBPACK_IMPORTED_MODULE_8__validators_nameValidator__["a" /* nameValidator */]]),
            'username': new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["b" /* FormControl */](null, [__WEBPACK_IMPORTED_MODULE_5__angular_forms__["h" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["h" /* Validators */].minLength(5), __WEBPACK_IMPORTED_MODULE_5__angular_forms__["h" /* Validators */].maxLength(15)]),
            'email': new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["b" /* FormControl */](null, [__WEBPACK_IMPORTED_MODULE_5__angular_forms__["h" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["h" /* Validators */].email]),
            'password': new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["b" /* FormControl */](null, [__WEBPACK_IMPORTED_MODULE_5__angular_forms__["h" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["h" /* Validators */].maxLength(15), __WEBPACK_IMPORTED_MODULE_5__angular_forms__["h" /* Validators */].minLength(5)]),
            'repeatPassword': new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["b" /* FormControl */](null, [__WEBPACK_IMPORTED_MODULE_5__angular_forms__["h" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["h" /* Validators */].maxLength(15), __WEBPACK_IMPORTED_MODULE_5__angular_forms__["h" /* Validators */].minLength(5)])
        }, Object(__WEBPACK_IMPORTED_MODULE_6__validators_matchingPasswordsValidator__["a" /* matchingPasswords */])('password', 'repeatPassword'));
    };
    return RegistrationPage;
}());
RegistrationPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["n" /* Component */])({
        selector: 'page-registration',template:/*ion-inline-start:"C:\Users\linus_000\Documents\GitHub\PRO5\App\src\pages\registration\registration.html"*/'<!--\n\n  Generated template for the RegistrationPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>Registration</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n\n\n  <form [formGroup]="myForm" (ngSubmit)="submitRegistration()">\n\n    <ion-item>\n\n      <ion-input type="text" id="firstname" formControlName="firstname" placeholder="Vorname" clearInput></ion-input>\n\n    </ion-item>\n\n    <div class="errorMessage" [@enterAnimation] *ngIf="myForm.controls.firstname.hasError(\'required\') && (myForm.get(\'firstname\').dirty || myForm.get(\'firstname\').touched)">Vorname darf nicht leer sein!</div>\n\n    <div class="errorMessage" [@enterAnimation] *ngIf="myForm.controls.firstname.hasError(\'maxlength\') && (myForm.get(\'firstname\').dirty || myForm.get(\'firstname\').touched)">Vorname ist zu lange!</div>\n\n    <div class="errorMessage" [@enterAnimation] *ngIf="myForm.controls.firstname.hasError(\'invalidName\') && (myForm.get(\'firstname\').dirty || myForm.get(\'firstname\').touched)">Vorname enthält ungültige Zeichen!</div>\n\n\n\n    <ion-item>\n\n      <ion-input type="text" id="lastname" formControlName="lastname" placeholder="Nachname" clearInput></ion-input>\n\n    </ion-item>\n\n    <div class="errorMessage" [@enterAnimation] *ngIf="myForm.controls.lastname.hasError(\'required\') && (myForm.get(\'lastname\').dirty || myForm.get(\'lastname\').touched)">Nachname darf nicht leer sein</div>\n\n    <div class="errorMessage" [@enterAnimation] *ngIf="myForm.controls.lastname.hasError(\'maxlength\') && (myForm.get(\'lastname\').dirty || myForm.get(\'lastname\').touched)">Nachname darf max 15 Zeichen beinhalten</div>\n\n    <div class="errorMessage" [@enterAnimation] *ngIf="myForm.controls.lastname.hasError(\'invalidName\') && (myForm.get(\'lastname\').dirty || myForm.get(\'lastname\').touched)">Nachname enthält ungültige Zeichen!</div>\n\n\n\n    <ion-item>\n\n      <ion-input type="text" id="username" formControlName="username" placeholder="Benutzername" clearInput></ion-input>\n\n    </ion-item>\n\n    <div class="errorMessage" [@enterAnimation] *ngIf="myForm.controls.username.hasError(\'required\') && (myForm.get(\'username\').dirty || myForm.get(\'username\').touched)">Username darf nicht leer sein</div>\n\n    <div class="errorMessage" [@enterAnimation] *ngIf="myForm.controls.username.hasError(\'maxlength\') && (myForm.get(\'username\').dirty || myForm.get(\'username\').touched)">Username darf max 15 Zeichen beinhalten</div>\n\n    <div class="errorMessage" [@enterAnimation] *ngIf="myForm.controls.username.hasError(\'minlength\') && (myForm.get(\'username\').dirty || myForm.get(\'username\').touched)">Username muss mind 5 Zeichen beinhalten</div>\n\n    <ion-item>\n\n      <ion-input type="email" id="email" formControlName="email" placeholder="Email" clearInput></ion-input>\n\n    </ion-item>\n\n    <div class="errorMessage" [@enterAnimation] *ngIf="myForm.controls.email.hasError(\'email\') && (myForm.get(\'email\').dirty || myForm.get(\'email\').touched)">Ungültige Mailadresse</div>\n\n    <ion-item>\n\n      <ion-input type="password" id="password" formControlName="password" placeholder="Passwort" clearInput></ion-input>\n\n    </ion-item>\n\n    <div class="errorMessage" [@enterAnimation] *ngIf="myForm.controls.password.hasError(\'minlength\') && (myForm.get(\'password\').dirty || myForm.get(\'password\').touched)">Passwort muss 5 Zeichen lang sein</div>\n\n    <div class="errorMessage" [@enterAnimation] *ngIf="myForm.controls.password.hasError(\'maxlength\') && (myForm.get(\'password\').dirty || myForm.get(\'password\').touched)">Passwort darf maximal 15 Zeichen lang sein</div>\n\n    <ion-item>\n\n      <ion-input type="password" id="repeatPassword" formControlName="repeatPassword" placeholder="Passwort wiederholen" clearInput></ion-input>\n\n    </ion-item>\n\n    <div class="errorMessage" [@enterAnimation] *ngIf="myForm.hasError(\'mismatchedPasswords\') && (myForm.get(\'repeatPassword\').dirty || myForm.get(\'repeatPassword\').touched)">Passwort muss gleich sein</div>\n\n    <button (click)="addSkill()" class="submitButton" ion-button type="button" outline block icon-right>Add skills\n\n      <ion-icon name="add"></ion-icon>\n\n    </button>\n\n    <ion-badge [@tagAnimation] class="tag" *ngFor="let tag of tags" (click)="removeTag(tag)">{{tag?.title}} X\n\n    </ion-badge>\n\n    <button class="submitButton" ion-button type="submit" full margin-top [disabled]="!myForm.valid || !tags || tags.length == 0">Registrieren</button>\n\n  </form>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\linus_000\Documents\GitHub\PRO5\App\src\pages\registration\registration.html"*/,
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
            ]),
            Object(__WEBPACK_IMPORTED_MODULE_7__angular_animations__["k" /* trigger */])('tagAnimation', [
                Object(__WEBPACK_IMPORTED_MODULE_7__angular_animations__["j" /* transition */])(':enter', [
                    Object(__WEBPACK_IMPORTED_MODULE_7__angular_animations__["i" /* style */])({ opacity: 0 }),
                    Object(__WEBPACK_IMPORTED_MODULE_7__angular_animations__["e" /* animate */])('600ms', Object(__WEBPACK_IMPORTED_MODULE_7__angular_animations__["i" /* style */])({ opacity: 1 }))
                ]),
                Object(__WEBPACK_IMPORTED_MODULE_7__angular_animations__["j" /* transition */])(':leave', [
                    Object(__WEBPACK_IMPORTED_MODULE_7__angular_animations__["i" /* style */])({ transform: 'translateY(0)', opacity: 1 }),
                    Object(__WEBPACK_IMPORTED_MODULE_7__angular_animations__["e" /* animate */])('200ms', Object(__WEBPACK_IMPORTED_MODULE_7__angular_animations__["i" /* style */])({ transform: 'translateY(-10px)', opacity: 0 }))
                ])
            ]),
        ],
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["k" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__services_login_service__["a" /* LoginService */],
        __WEBPACK_IMPORTED_MODULE_0__services_tag_service__["a" /* TagService */],
        __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["o" /* ToastController */]])
], RegistrationPage);

//# sourceMappingURL=registration.js.map

/***/ }),

/***/ 882:
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

/***/ }),

/***/ 883:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = nameValidator;
function nameValidator(control) {
    console.log(control);
    var problem = false;
    var regexp = new RegExp('^[a-zA-ZöÖäÄüÜ]*$');
    if (!regexp.test(control.value))
        problem = true;
    return problem ? { 'invalidName': { value: control.value } } : null;
}
//# sourceMappingURL=nameValidator.js.map

/***/ })

});
//# sourceMappingURL=6.js.map