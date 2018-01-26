import { StorageService } from './storage-service';
import { ModalController, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Location } from './../data/Location';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';

declare var google;

@Injectable()
export class LocationService {

    placesService: any;
    private currentLocation: Geoposition;
    private locationChange: Subject<Location> = new Subject();
    private locationChangeObservable: Observable<Location> = this.locationChange.asObservable();

    constructor(private geoLocation: Geolocation,
        private storageService: StorageService,
        private modalCtrl: ModalController,
        private loadingCtrl: LoadingController) {

    }

    public notifiyLocationSelection(location: Location): void {
        this.locationChange.next(location);
    }

    public selectLocation(): Observable<Location> {
        this.modalCtrl.create("SearchPlacePage").present();
        return this.locationChangeObservable;
    }

    //Get current location either a saved value (if not expired) or a new value from the device GPS
    //TODO Store and get in Local Storage
    public getCurrentLocation(): Promise<Geoposition> {
        return new Promise((resolve, reject) => {
            return this.storageService.getLocalStorage("location").then(value => {
                if (value) reject(new Error("Keine Berechtigung! Kann in den Einstellungen geändert werden"));

                if (this.currentLocation && this.currentLocation.timestamp > new Date().getMilliseconds() - 1800000) {
                    resolve(this.currentLocation);
                }

                this.geoLocation.getCurrentPosition({ timeout: 10000 }).then((coordinates) => {
                    this.currentLocation = coordinates;
                    resolve(this.currentLocation);
                }).catch((error) => {
                    reject(error);
                });
            });
        })
    }

    public findPlaceName(latLng, map): Promise<string> {
        return new Promise((resolve, reject) => {
            let loader = this.loadingCtrl.create({
                content: "Getting place information..."
            });
            loader.present().then(() => {
                this.placesService = new google.maps.places.PlacesService(map);
                let geocoder = new google.maps.Geocoder();
                geocoder.geocode({ "location": latLng }, (result, status) => {
                    if (status === "OK") {
                        if (result[2]) {
                            this.placesService.getDetails({ "placeId": result[2].place_id }, (placeDetails, status) => {
                                if (status === google.maps.places.PlacesServiceStatus.OK) {
                                    loader.dismiss()
                                    resolve(placeDetails.name);
                                } else {
                                    loader.dismiss();
                                    reject();
                                }
                            });
                        }
                    } else {
                        loader.dismiss();
                        reject();
                    }
                });
            });
        });
    }
}