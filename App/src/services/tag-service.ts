import { Observable } from 'rxjs/Observable';
import { StorageService } from './storage-service';
import { AlertController, LoadingController, ToastController } from 'ionic-angular';
import { NetworkConstants } from './../data/constants/NetworkConstants';
import { Tag } from './../data/Tag';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class TagService {

    constructor(private http: HttpClient,
        private alertCtrl: AlertController,
        private loadingCtrl: LoadingController,
        private storageService: StorageService,
        private toastCtrl: ToastController
    ) {

    }

    getTags(): Observable<[Tag[]]> {

        let local = Observable.fromPromise(this.storageService.loadTags());

        let network = this.http.get(NetworkConstants.HOME_URL + "/tags").flatMap((result: any[]) => {
            var tempResult = [];
            result.forEach(element => {
                tempResult.push(new Tag(element._id, element.title));
            });
            return Observable.fromPromise(this.storageService.storeTags(tempResult));
        }).flatMap((result: any[]) => {
            return Observable.of(result);
        });

        return Observable.zip(local, network);
    }

    askForMissingTags() {
        this.alertCtrl.create({
            title: 'Noch keine Skills',
            subTitle: 'Du hast noch keine Skills festgelegt!',
            message: 'Bitte wähle in den Einstellungen mindestens einen Skill aus. Klicke links oben um zu den Einstellungen zu gelangen',
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Weiter',
                    role: 'cancel'
                }
            ]
        }).present();
    }

    openTagDialog(selected?: Tag[]): Promise<Tag[]> {
        return new Promise((resolve, reject) => {
            let loader = this.loadingCtrl.create({
                content: 'Lade Tags...'
            });
            loader.present();
            this.getTags().take(1).subscribe((results) => {

                loader.dismiss();
                let result;

                if (results[1] && results[1].length > 0) {
                    result = results[1];
                } else if (results[0] && results[0].length > 0) {
                    result = results[0];
                } else {
                    return;
                }

                var alert = this.alertCtrl.create();
                alert.setTitle("Wähle Tags");
                for (let i = 0; i < result.length; i++) {
                    alert.addInput({
                        type: "checkbox",
                        label: result[i].title,
                        value: result[i].id + "," + result[i].title,
                        checked: function () {
                            if (selected) {
                                return (selected.find(function (tag: Tag) {
                                    return tag.id === result[i].id
                                }) ? true : false);
                            }
                            return false;
                        }()
                    });
                }
                alert.addButton({
                    text: "Abbrechen",
                    handler: data => {
                    }
                });
                alert.addButton({
                    text: "Fertig",
                    handler: data => {
                        let tags: Tag[] = [];
                        data.forEach(element => {
                            var values = element.split(",");
                            tags.push(new Tag(values[0], values[1]));
                        });
                        if (tags.length > 0) {
                            resolve(tags);
                        } else {
                            this.toastCtrl.create({
                                message: "Es muss mindestens ein Tag ausgewählt sein!",
                                duration: 3000
                            }).present();
                            return false;
                        }
                    }
                });
                alert.present();
            }, (error) => {
                loader.dismiss();
                reject(error);
            });
        });
    }
}