import { ProjectConstants } from './../../data/constants/ProjectConstants';
import { Location } from './../../data/Location';
import { LocationService } from './../../services/location-service';
import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the SearchPlacePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google;

@IonicPage()
@Component({
  selector: 'page-search-place',
  templateUrl: 'search-place.html',
})
export class SearchPlacePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  marker: any;
  autocomplete: any;
  placesService: any;
  currentLocation: Location;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public geolocation: Geolocation,
    private locationService: LocationService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController) {
  }

  ionViewDidEnter() {
    this.loadMap();
  }

  loadMap() {

    let latLng = new google.maps.LatLng(ProjectConstants.START_LOCATION[0], ProjectConstants.START_LOCATION[1]);

    let styles = [
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

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: styles
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.placesService = new google.maps.places.PlacesService(this.map);
    this.marker = new google.maps.Marker({
      position: latLng,
      map: this.map
    });

    this.map.addListener('click', (e) => {
      this.locationService.findPlaceName(e.latLng, this.map).then((name) => {
        this.placeMarkerAndPanTo(e.latLng, this.map, name);
      }).catch((e) => {
        this.toastCtrl.create({
          message: "Couldn't get place details",
          duration: 3000
        }).present();
      });
    });

    let input = <HTMLInputElement>document.getElementById('search').getElementsByTagName('input')[0];
    this.autocomplete = new google.maps.places.Autocomplete(input);

    google.maps.event.addListener(this.autocomplete, 'place_changed', () => {
      let place = this.autocomplete.getPlace();
      let resultLatLng = new google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng());
      this.placeMarkerAndPanTo(resultLatLng, this.map, place.name);
    });

    this.locationService.findPlaceName(latLng, this.map).then((name) => {
      this.currentLocation = new Location([ProjectConstants.START_LOCATION[0], ProjectConstants.START_LOCATION[1]], name);
    }).catch((e) => {
      this.toastCtrl.create({
        message: "Couldn't get place details",
        duration: 3000
      }).present();
    })
  }

  placeMarkerAndPanTo(latLng, map, name) {
    this.currentLocation = new Location([latLng.lat() as Number, latLng.lng() as Number], name);
    this.marker.setPosition(latLng);
    map.panTo(latLng);
  }

  confirmLocation() {
    if (this.currentLocation) {
      this.locationService.notifiyLocationSelection(this.currentLocation);
    }
    this.navCtrl.pop();
  }
}
