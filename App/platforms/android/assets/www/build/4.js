webpackJsonp([4],{

/***/ 736:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditProjectPageModule", function() { return EditProjectPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_AutosizeModule__ = __webpack_require__(754);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__edit_project__ = __webpack_require__(797);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var EditProjectPageModule = (function () {
    function EditProjectPageModule() {
    }
    return EditProjectPageModule;
}());
EditProjectPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__edit_project__["a" /* EditProjectPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__util_AutosizeModule__["a" /* AutosizeModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__edit_project__["a" /* EditProjectPage */]),
        ],
    })
], EditProjectPageModule);

//# sourceMappingURL=edit-project.module.js.map

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

/***/ 797:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditProjectPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_forms__ = __webpack_require__(24);
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



/**
 * Generated class for the EditProjectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EditProjectPage = (function () {
    function EditProjectPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.project = this.navParams.get("project");
        if (!this.project) {
            this.navCtrl.pop();
        }
    }
    EditProjectPage.prototype.ngOnInit = function () {
        this.editProjectForm = new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormGroup */]({
            'projectname': new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["b" /* FormControl */](null, [__WEBPACK_IMPORTED_MODULE_0__angular_forms__["h" /* Validators */].required]),
            'description': new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["b" /* FormControl */]()
        });
    };
    EditProjectPage.prototype.editProject = function () {
    };
    return EditProjectPage;
}());
EditProjectPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({
        selector: 'page-edit-project',template:/*ion-inline-start:"C:\Users\linus_000\Documents\GitHub\PRO5\App\src\pages\edit-project\edit-project.html"*/'<!--\n\n  Generated template for the EditProjectPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>Edit {{project.title}}</ion-title>\n\n    <ion-buttons right>\n\n      <button ion-button icon-only (click)="navCtrl.pop()">\n\n        <ion-icon name="close"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <form [formGroup]="editProjectForm" (ngSubmit)="editProject()">\n\n    <ion-item>\n\n      <ion-input type="text" id="projectname" [value]="project?.title" formControlName="projectname" placeholder="Projectname"\n\n        clearInput></ion-input>\n\n    </ion-item>\n\n    <ion-item>\n\n      <ion-textarea autosize id="description" [value]="project?.description" formControlName="description" placeholder="Description"\n\n        clearInput></ion-textarea>\n\n    </ion-item>\n\n    <button class="submitButton" ion-button type="submit" full margin-top [disabled]="!editProjectForm.valid">Submit changes</button>\n\n  </form>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\linus_000\Documents\GitHub\PRO5\App\src\pages\edit-project\edit-project.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* NavParams */]])
], EditProjectPage);

//# sourceMappingURL=edit-project.js.map

/***/ })

});
//# sourceMappingURL=4.js.map