webpackJsonp([9],{

/***/ 745:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchPlacePageModule", function() { return SearchPlacePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__search_place__ = __webpack_require__(885);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SearchPlacePageModule = (function () {
    function SearchPlacePageModule() {
    }
    return SearchPlacePageModule;
}());
SearchPlacePageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__search_place__["a" /* SearchPlacePage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__search_place__["a" /* SearchPlacePage */]),
        ],
    })
], SearchPlacePageModule);

//# sourceMappingURL=search-place.module.js.map

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

/***/ 885:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchPlacePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__data_constants_ProjectConstants__ = __webpack_require__(757);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_Location__ = __webpack_require__(390);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_location_service__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_geolocation__ = __webpack_require__(141);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var SearchPlacePage = (function () {
    function SearchPlacePage(navCtrl, navParams, geolocation, locationService, loadingCtrl, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.geolocation = geolocation;
        this.locationService = locationService;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
    }
    SearchPlacePage.prototype.ionViewDidEnter = function () {
        this.loadMap();
    };
    SearchPlacePage.prototype.loadMap = function () {
        var _this = this;
        var latLng = new google.maps.LatLng(__WEBPACK_IMPORTED_MODULE_0__data_constants_ProjectConstants__["a" /* ProjectConstants */].START_LOCATION[0], __WEBPACK_IMPORTED_MODULE_0__data_constants_ProjectConstants__["a" /* ProjectConstants */].START_LOCATION[1]);
        var styles = [
            {
                "featureType": "administrative",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            }
        ];
        var mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: styles
        };
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        this.placesService = new google.maps.places.PlacesService(this.map);
        this.marker = new google.maps.Marker({
            position: latLng,
            map: this.map
        });
        this.map.addListener('click', function (e) {
            _this.locationService.findPlaceName(e.latLng, _this.map).then(function (name) {
                _this.placeMarkerAndPanTo(e.latLng, _this.map, name);
            }).catch(function (e) {
                _this.toastCtrl.create({
                    message: "Couldn't get place details",
                    duration: 3000
                }).present();
            });
        });
        var input = document.getElementById('search').getElementsByTagName('input')[0];
        this.autocomplete = new google.maps.places.Autocomplete(input);
        google.maps.event.addListener(this.autocomplete, 'place_changed', function () {
            var place = _this.autocomplete.getPlace();
            var resultLatLng = new google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng());
            _this.placeMarkerAndPanTo(resultLatLng, _this.map, place.name);
        });
        this.locationService.findPlaceName(latLng, this.map).then(function (name) {
            _this.currentLocation = new __WEBPACK_IMPORTED_MODULE_1__data_Location__["a" /* Location */]([__WEBPACK_IMPORTED_MODULE_0__data_constants_ProjectConstants__["a" /* ProjectConstants */].START_LOCATION[0], __WEBPACK_IMPORTED_MODULE_0__data_constants_ProjectConstants__["a" /* ProjectConstants */].START_LOCATION[1]], name);
        }).catch(function (e) {
            _this.toastCtrl.create({
                message: "Couldn't get place details",
                duration: 3000
            }).present();
        });
    };
    SearchPlacePage.prototype.placeMarkerAndPanTo = function (latLng, map, name) {
        this.currentLocation = new __WEBPACK_IMPORTED_MODULE_1__data_Location__["a" /* Location */]([latLng.lat(), latLng.lng()], name);
        this.marker.setPosition(latLng);
        map.panTo(latLng);
    };
    SearchPlacePage.prototype.confirmLocation = function () {
        if (this.currentLocation) {
            this.locationService.notifiyLocationSelection(this.currentLocation);
        }
        this.navCtrl.pop();
    };
    return SearchPlacePage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["_14" /* ViewChild */])('map'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3__angular_core__["u" /* ElementRef */])
], SearchPlacePage.prototype, "mapElement", void 0);
SearchPlacePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["n" /* Component */])({
        selector: 'page-search-place',template:/*ion-inline-start:"C:\Users\linus_000\Documents\GitHub\PRO5\App\src\pages\search-place\search-place.html"*/'<!--\n\n  Generated template for the SearchPlacePage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n\n\n<ion-content>\n\n  <ion-searchbar id="search" [showCancelButton]="shouldShowCancel" (ionCancel)="onCancel($event)"></ion-searchbar>\n\n\n\n  <div #map id="map"></div>\n\n\n\n  <ion-fab bottom left>\n\n    <button ion-fab (click)="confirmLocation()">\n\n      <ion-icon name="checkmark"></ion-icon>\n\n    </button>\n\n  </ion-fab>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\linus_000\Documents\GitHub\PRO5\App\src\pages\search-place\search-place.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["k" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["l" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_native_geolocation__["a" /* Geolocation */],
        __WEBPACK_IMPORTED_MODULE_2__services_location_service__["a" /* LocationService */],
        __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["i" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["o" /* ToastController */]])
], SearchPlacePage);

//# sourceMappingURL=search-place.js.map

/***/ })

});
//# sourceMappingURL=9.js.map