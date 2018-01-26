webpackJsonp([2],{

/***/ 732:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddProjectPageModule", function() { return AddProjectPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_AutosizeModule__ = __webpack_require__(754);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_location_service__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__add_project__ = __webpack_require__(792);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var AddProjectPageModule = (function () {
    function AddProjectPageModule() {
    }
    return AddProjectPageModule;
}());
AddProjectPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__add_project__["a" /* AddProjectPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__util_AutosizeModule__["a" /* AutosizeModule */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_4__add_project__["a" /* AddProjectPage */]),
        ],
        schemas: [
            __WEBPACK_IMPORTED_MODULE_1__services_location_service__["a" /* LocationService */]
        ]
    })
], AddProjectPageModule);

//# sourceMappingURL=add-project.module.js.map

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

/***/ 792:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddProjectPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_login_service__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_Payment__ = __webpack_require__(394);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_Project__ = __webpack_require__(389);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_project_service__ = __webpack_require__(388);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__data_constants_ProjectConstants__ = __webpack_require__(757);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__data_Location__ = __webpack_require__(390);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_location_service__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_tag_service__ = __webpack_require__(387);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_forms__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_animations__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_moment__);
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
 * Generated class for the AddProjectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AddProjectPage = (function () {
    function AddProjectPage(fb, navCtrl, navParams, tagsService, toastCtrl, projectService, locationService, loginService, loadingCtrl) {
        this.fb = fb;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.tagsService = tagsService;
        this.toastCtrl = toastCtrl;
        this.projectService = projectService;
        this.locationService = locationService;
        this.loginService = loginService;
        this.loadingCtrl = loadingCtrl;
        this.markers = [];
        //Set boundaries for date selector
        this.minStartDate = __WEBPACK_IMPORTED_MODULE_12_moment___default()().toISOString();
        this.minEndDate = __WEBPACK_IMPORTED_MODULE_12_moment___default()().add(1, 'days').toISOString();
        //Dates which are bound to date selector to check for overlaps
        this.currentStartDate = __WEBPACK_IMPORTED_MODULE_12_moment___default()().toISOString();
        this.currentEndDate = __WEBPACK_IMPORTED_MODULE_12_moment___default()().add(1, 'days').toISOString();
    }
    AddProjectPage.prototype.initializeMap = function () {
        var startPosition = new google.maps.LatLng(this.currentLocation.coordinates[0], this.currentLocation.coordinates[1]);
        var mapOptions = {
            center: startPosition,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true,
            draggable: false,
            scrollwheel: false,
            panControl: false,
            maxZoom: 15,
            minZoom: 15,
            zoom: 15,
            gestureHandling: 'none'
        };
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        this.setMarker(startPosition);
    };
    //Check for overlaps and correct dates
    AddProjectPage.prototype.startDateChanged = function (event) {
        if (__WEBPACK_IMPORTED_MODULE_12_moment___default()(this.currentEndDate).isBefore(__WEBPACK_IMPORTED_MODULE_12_moment___default()(this.currentStartDate))) {
            this.currentEndDate = __WEBPACK_IMPORTED_MODULE_12_moment___default()(this.currentStartDate).add(1, 'days').toISOString();
        }
    };
    AddProjectPage.prototype.endDateChanged = function (event) {
        if (__WEBPACK_IMPORTED_MODULE_12_moment___default()(this.currentStartDate).isAfter(__WEBPACK_IMPORTED_MODULE_12_moment___default()(this.currentEndDate))) {
            this.currentStartDate = __WEBPACK_IMPORTED_MODULE_12_moment___default()(this.currentEndDate).subtract(1, 'days').toISOString();
        }
    };
    /**
     * Called after register form has been submitted
     */
    AddProjectPage.prototype.addProject = function () {
        var _this = this;
        var tags = [];
        var loader = this.loadingCtrl.create({
            content: "Loading..."
        });
        loader.present();
        for (var _i = 0, _a = this.tags; _i < _a.length; _i++) {
            var t = _a[_i];
            tags.push(t.id);
        }
        if (this.addProjectForm.valid) {
            var val_1 = this.addProjectForm.value;
            this.loginService.getLocalUser().subscribe(function (user) {
                if (user.id) {
                    var tempProject = new __WEBPACK_IMPORTED_MODULE_2__data_Project__["a" /* Project */](val_1.projectname, val_1.description, (val_1.payment && val_1.paymentAmount) ? new __WEBPACK_IMPORTED_MODULE_1__data_Payment__["a" /* Payment */](true, val_1.paymentAmount) : new __WEBPACK_IMPORTED_MODULE_1__data_Payment__["a" /* Payment */](false), tags, val_1.maxMemberAmount, val_1.startDate, val_1.endDate, 0, user, (_this.currentLocation) ? _this.currentLocation : null);
                    _this.projectService.addProject(tempProject).then(function (project) {
                        loader.dismiss();
                        _this.navCtrl.pop();
                    }).catch(function (error) {
                        loader.dismiss();
                        _this.toastCtrl.create({
                            message: "Fehler beim Erstellen des Projekts!",
                            duration: 3000
                        }).present();
                    });
                }
            }, function (error) {
                loader.dismiss();
                _this.toastCtrl.create({
                    message: "Fehler beim Erstellen des Projekts!",
                    duration: 3000
                });
            });
        }
    };
    AddProjectPage.prototype.ngOnInit = function () {
        this.addProjectForm = new __WEBPACK_IMPORTED_MODULE_10__angular_forms__["c" /* FormGroup */]({
            'projectname': new __WEBPACK_IMPORTED_MODULE_10__angular_forms__["b" /* FormControl */](null, [__WEBPACK_IMPORTED_MODULE_10__angular_forms__["h" /* Validators */].required]),
            'global': new __WEBPACK_IMPORTED_MODULE_10__angular_forms__["b" /* FormControl */](true),
            'description': new __WEBPACK_IMPORTED_MODULE_10__angular_forms__["b" /* FormControl */](),
            'payment': new __WEBPACK_IMPORTED_MODULE_10__angular_forms__["b" /* FormControl */](false),
            'paymentAmount': new __WEBPACK_IMPORTED_MODULE_10__angular_forms__["b" /* FormControl */](null, [__WEBPACK_IMPORTED_MODULE_10__angular_forms__["h" /* Validators */].min(0)]),
            'maxMemberAmount': new __WEBPACK_IMPORTED_MODULE_10__angular_forms__["b" /* FormControl */](5),
            'startDate': new __WEBPACK_IMPORTED_MODULE_10__angular_forms__["b" /* FormControl */](null, [__WEBPACK_IMPORTED_MODULE_10__angular_forms__["h" /* Validators */].required]),
            'endDate': new __WEBPACK_IMPORTED_MODULE_10__angular_forms__["b" /* FormControl */](null, [__WEBPACK_IMPORTED_MODULE_10__angular_forms__["h" /* Validators */].required])
        });
    };
    AddProjectPage.prototype.addTags = function () {
        var _this = this;
        this.tagsService.openTagDialog(this.tags).then(function (result) {
            _this.tags = result;
        }).catch(function (error) {
        });
    };
    AddProjectPage.prototype.locateMe = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Ermittle deine Position.."
        });
        loader.present();
        var coordinates;
        this.locationService.getCurrentLocation().then(function (result) {
            coordinates = [result.coords.latitude, result.coords.longitude];
            loader.dismiss();
            var latLng = new google.maps.LatLng(coordinates[0], coordinates[1]);
            return _this.locationService.findPlaceName(latLng, _this.map);
        }).then(function (name) {
            _this.currentLocation = new __WEBPACK_IMPORTED_MODULE_5__data_Location__["a" /* Location */](coordinates, name);
            var mapPosition = new google.maps.LatLng(coordinates[0], coordinates[1]);
            _this.setMarker(mapPosition);
        }).catch(function (error) {
            loader.dismiss();
            _this.toastCtrl.create({
                message: error.message,
                duration: 3000
            }).present();
        });
    };
    AddProjectPage.prototype.setMarker = function (mapPosition) {
        this.map.setCenter(mapPosition);
        for (var i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(null);
        }
        var marker = new google.maps.Marker({
            position: mapPosition,
            map: this.map
        });
        this.markers.push(marker);
    };
    AddProjectPage.prototype.toggled = function (event) {
        var _this = this;
        if (event.value) {
            this.currentLocation = null;
            return;
        }
        if (!this.currentLocation) {
            this.currentLocation = new __WEBPACK_IMPORTED_MODULE_5__data_Location__["a" /* Location */](__WEBPACK_IMPORTED_MODULE_4__data_constants_ProjectConstants__["a" /* ProjectConstants */].START_LOCATION, "Hagenberg im Mühlkreis");
        }
        if (!this.map) {
            this.initializeMap();
        }
        setTimeout(function () {
            google.maps.event.trigger(_this.map, 'resize');
            var currentPosition = new google.maps.LatLng(_this.currentLocation.coordinates[0], _this.currentLocation.coordinates[1]);
            _this.map.setCenter(currentPosition);
        }, 200);
    };
    AddProjectPage.prototype.selectLocation = function () {
        var _this = this;
        this.locationService.selectLocation().subscribe(function (result) {
            var mapPosition = new google.maps.LatLng(result.coordinates[0], result.coordinates[1]);
            _this.currentLocation = result;
            _this.setMarker(mapPosition);
        });
    };
    AddProjectPage.prototype.removeTag = function (tag) {
        this.tags.splice(this.tags.indexOf(tag), 1);
    };
    return AddProjectPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_8__angular_core__["_14" /* ViewChild */])('map'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_8__angular_core__["u" /* ElementRef */])
], AddProjectPage.prototype, "mapElement", void 0);
AddProjectPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_8__angular_core__["n" /* Component */])({
        selector: 'page-add-project',template:/*ion-inline-start:"C:\Users\linus_000\Documents\GitHub\PRO5\App\src\pages\add-project\add-project.html"*/'<!--\n\n  Generated template for the AddProjectPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>Add Project</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <form [formGroup]="addProjectForm" (ngSubmit)="addProject()">\n\n    <ion-item>\n\n      <ion-input type="text" id="projectname" formControlName="projectname" placeholder="Projectname" clearInput></ion-input>\n\n    </ion-item>\n\n    <div class="errorMessage" [@enterAnimation] *ngIf="addProjectForm.controls.projectname.hasError(\'required\') && (addProjectForm.get(\'projectname\').dirty || addProjectForm.get(\'projectname\').touched)">Titel darf nicht leer sein!</div>\n\n    <ion-item>\n\n      <ion-textarea autosize id="description" formControlName="description" placeholder="Description" clearInput></ion-textarea>\n\n    </ion-item>\n\n    <ion-item>\n\n      <ion-label>Max. member amount</ion-label>\n\n      <ion-select interface="popover" formControlName="maxMemberAmount">\n\n        <ion-option value="2">2</ion-option>\n\n        <ion-option value="3">3</ion-option>\n\n        <ion-option value="4">4</ion-option>\n\n        <ion-option value="5">5</ion-option>\n\n        <ion-option value="6">6</ion-option>\n\n        <ion-option value="7">7</ion-option>\n\n        <ion-option value="8">8</ion-option>\n\n        <ion-option value="9">9</ion-option>\n\n        <ion-option value="10">10</ion-option>\n\n      </ion-select>\n\n    </ion-item>\n\n    <ion-item>\n\n      <ion-label>Project start date</ion-label>\n\n      <ion-datetime formControlName="startDate" [(ngModel)]="currentStartDate" [min]="minStartDate" max="2030-12-31" (ngModelChange)="startDateChanged($event)" displayFormat="DD.MM.YYYY"\n\n        pickerFormat="YYYY MM DD"></ion-datetime>\n\n    </ion-item>\n\n    <ion-item>\n\n      <ion-label>Estimated end date</ion-label>\n\n      <ion-datetime formControlName="endDate" [(ngModel)]="currentEndDate" [min]="minEndDate" max="2030-12-31" (ngModelChange)="endDateChanged($event)" displayFormat="DD.MM.YYYY"\n\n        pickerFormat="YYYY MM DD"></ion-datetime>\n\n    </ion-item>\n\n    <ion-item>\n\n      <ion-label>Payment</ion-label>\n\n      <ion-toggle #payment formControlName="payment"></ion-toggle>\n\n    </ion-item>\n\n    <ion-item [@enterAnimation] *ngIf="payment.checked">\n\n      <ion-input type="number" id="paymentAmount" formControlName="paymentAmount" placeholder="Payment amount" clearInput></ion-input>\n\n    </ion-item>\n\n    <div class="errorMessage" [@enterAnimation] *ngIf="addProjectForm.controls.paymentAmount.hasError(\'min\') && (addProjectForm.get(\'paymentAmount\').dirty || addProjectForm.get(\'paymentAmount\').touched)">Bezahlung muss höher als 0 sein!</div>\n\n    <ion-item>\n\n      <ion-label>Global</ion-label>\n\n      <ion-toggle #global (ionChange)="toggled($event)" checked="true" formControlName="global"></ion-toggle>\n\n    </ion-item>\n\n    <ion-grid [hidden]="global.checked">\n\n      <ion-row>\n\n        <ion-col style="padding-right: 5px;">\n\n          <button (click)="selectLocation()" type="button" class="addTagsButton" ion-button block outline icon-right>Select location\n\n            <ion-icon name="pin"></ion-icon>\n\n          </button>\n\n        </ion-col>\n\n        <ion-col style="padding-left: 5px;">\n\n          <button (click)="locateMe()" type="button" class="addTagsButton" ion-button block outline icon-right>Locate me\n\n            <ion-icon name="locate"></ion-icon>\n\n          </button>\n\n        </ion-col>\n\n      </ion-row>\n\n    </ion-grid>\n\n\n\n    <div #map [hidden]="global.checked" id="map"></div>\n\n\n\n    <button (click)="addTags()" class="addTagsButton" type="button" ion-button block outline icon-right>Add tags\n\n      <ion-icon name="add"></ion-icon>\n\n    </button>\n\n\n\n    <ion-badge [@tagAnimation] (click)="removeTag(tag)" class="tag" *ngFor="let tag of tags">{{tag.title}} X</ion-badge>\n\n    <ion-badge *ngIf="!tags || tags.length < 1" [@tagAnimation] class="tag" color="danger">Mind. 1 Tag</ion-badge>\n\n\n\n    <button class="submitButton" ion-button type="submit" full margin-top [disabled]="!addProjectForm.valid || !tags || tags.length == 0 || (payment.checked && !addProjectForm.controls.paymentAmount.value)">Add Project</button>\n\n  </form>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\linus_000\Documents\GitHub\PRO5\App\src\pages\add-project\add-project.html"*/,
        animations: [
            Object(__WEBPACK_IMPORTED_MODULE_11__angular_animations__["k" /* trigger */])('enterAnimation', [
                Object(__WEBPACK_IMPORTED_MODULE_11__angular_animations__["j" /* transition */])(':enter', [
                    Object(__WEBPACK_IMPORTED_MODULE_11__angular_animations__["i" /* style */])({ transform: 'translateY(-10px)', opacity: 0 }),
                    Object(__WEBPACK_IMPORTED_MODULE_11__angular_animations__["e" /* animate */])('200ms', Object(__WEBPACK_IMPORTED_MODULE_11__angular_animations__["i" /* style */])({ transform: 'translateY(0)', opacity: 1 }))
                ]),
                Object(__WEBPACK_IMPORTED_MODULE_11__angular_animations__["j" /* transition */])(':leave', [
                    Object(__WEBPACK_IMPORTED_MODULE_11__angular_animations__["i" /* style */])({ transform: 'translateY(0)', opacity: 1 }),
                    Object(__WEBPACK_IMPORTED_MODULE_11__angular_animations__["e" /* animate */])('200ms', Object(__WEBPACK_IMPORTED_MODULE_11__angular_animations__["i" /* style */])({ transform: 'translateY(-10px)', opacity: 0 }))
                ])
            ]),
            Object(__WEBPACK_IMPORTED_MODULE_11__angular_animations__["k" /* trigger */])('tagAnimation', [
                Object(__WEBPACK_IMPORTED_MODULE_11__angular_animations__["j" /* transition */])(':enter', [
                    Object(__WEBPACK_IMPORTED_MODULE_11__angular_animations__["i" /* style */])({ opacity: 0 }),
                    Object(__WEBPACK_IMPORTED_MODULE_11__angular_animations__["e" /* animate */])('600ms', Object(__WEBPACK_IMPORTED_MODULE_11__angular_animations__["i" /* style */])({ opacity: 1 }))
                ]),
                Object(__WEBPACK_IMPORTED_MODULE_11__angular_animations__["j" /* transition */])(':leave', [
                    Object(__WEBPACK_IMPORTED_MODULE_11__angular_animations__["i" /* style */])({ transform: 'translateY(0)', opacity: 1 }),
                    Object(__WEBPACK_IMPORTED_MODULE_11__angular_animations__["e" /* animate */])('200ms', Object(__WEBPACK_IMPORTED_MODULE_11__angular_animations__["i" /* style */])({ transform: 'translateY(-10px)', opacity: 0 }))
                ])
            ])
        ],
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_10__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_9_ionic_angular__["k" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_9_ionic_angular__["l" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_7__services_tag_service__["a" /* TagService */],
        __WEBPACK_IMPORTED_MODULE_9_ionic_angular__["o" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_3__services_project_service__["a" /* ProjectService */],
        __WEBPACK_IMPORTED_MODULE_6__services_location_service__["a" /* LocationService */],
        __WEBPACK_IMPORTED_MODULE_0__services_login_service__["a" /* LoginService */],
        __WEBPACK_IMPORTED_MODULE_9_ionic_angular__["i" /* LoadingController */]])
], AddProjectPage);

//# sourceMappingURL=add-project.js.map

/***/ })

});
//# sourceMappingURL=2.js.map