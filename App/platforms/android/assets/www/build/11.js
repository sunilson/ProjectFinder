webpackJsonp([11],{

/***/ 744:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchFilterPageModule", function() { return SearchFilterPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__search_filter__ = __webpack_require__(884);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(29);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SearchFilterPageModule = (function () {
    function SearchFilterPageModule() {
    }
    return SearchFilterPageModule;
}());
SearchFilterPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_0__search_filter__["a" /* SearchFilterPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_0__search_filter__["a" /* SearchFilterPage */]),
        ]
    })
], SearchFilterPageModule);

//# sourceMappingURL=search-filter.module.js.map

/***/ }),

/***/ 884:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchFilterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_location_service__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_tag_service__ = __webpack_require__(387);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_search_service__ = __webpack_require__(392);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(29);
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
 * Generated class for the SearchFilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SearchFilterPage = (function () {
    function SearchFilterPage(navCtrl, viewCtrl, navParams, popoverCtrl, searchService, tagService, locationService) {
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.popoverCtrl = popoverCtrl;
        this.searchService = searchService;
        this.tagService = tagService;
        this.locationService = locationService;
        this.searchSettings = this.navParams.get("searchSettings");
    }
    SearchFilterPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SearchFilterPage');
    };
    SearchFilterPage.prototype.addTags = function () {
        var _this = this;
        this.viewCtrl.dismiss();
        this.tagService.openTagDialog((this.searchSettings) ? this.searchSettings.tags : null).then(function (tags) {
            _this.searchService.updateSearchSettings("tags", tags);
        }).catch(function (error) {
            //TODO ERROR HANDLING
        });
    };
    SearchFilterPage.prototype.openTagsAutocomplete = function (event) {
        this.popoverCtrl.create("SearchPage").present({
            ev: event
        });
    };
    SearchFilterPage.prototype.locationGlobal = function (event) {
        this.viewCtrl.dismiss();
        if (event.checked) {
            this.searchService.updateSearchSettings("location", null);
        }
        else {
            if (!this.searchService.searchSettings.location)
                this.selectLocation();
        }
    };
    SearchFilterPage.prototype.paidToggle = function (event) {
        this.searchService.updateSearchSettings("paid", event.checked);
    };
    SearchFilterPage.prototype.selectLocation = function () {
        var _this = this;
        this.locationService.selectLocation().subscribe(function (result) {
            if (result) {
                _this.searchService.updateSearchSettings("location", result);
            }
        });
    };
    return SearchFilterPage;
}());
SearchFilterPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["n" /* Component */])({
        selector: 'page-search-filter',template:/*ion-inline-start:"C:\Users\linus_000\Documents\GitHub\PRO5\App\src\pages\search-filter\search-filter.html"*/'<!--\n\n  Generated template for the SearchFilterPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-list>\n\n  <ion-list-header>Such Filter</ion-list-header>\n\n  <ion-item>\n\n    <ion-label>Global</ion-label>\n\n    <ion-toggle #global (ionChange)="locationGlobal($event)" [checked]="!searchService.searchSettings.location"></ion-toggle>\n\n  </ion-item>\n\n  <button ion-item *ngIf="!global.checked" (click)="selectLocation()">Wähle Ort</button>\n\n  <ion-item>\n\n    <ion-label>Nur bezahlt</ion-label>\n\n    <ion-toggle (ionChange)="paidToggle($event)"></ion-toggle>\n\n  </ion-item>\n\n  <button ion-item (click)="addTags()">Taggs hinzufügen</button>\n\n</ion-list>\n\n'/*ion-inline-end:"C:\Users\linus_000\Documents\GitHub\PRO5\App\src\pages\search-filter\search-filter.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["k" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["p" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["l" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["n" /* PopoverController */],
        __WEBPACK_IMPORTED_MODULE_2__services_search_service__["a" /* SearchService */],
        __WEBPACK_IMPORTED_MODULE_1__services_tag_service__["a" /* TagService */],
        __WEBPACK_IMPORTED_MODULE_0__services_location_service__["a" /* LocationService */]])
], SearchFilterPage);

//# sourceMappingURL=search-filter.js.map

/***/ })

});
//# sourceMappingURL=11.js.map