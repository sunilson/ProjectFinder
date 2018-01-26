import { StorageService } from './storage-service';
import { Platform } from 'ionic-angular';
import { NetworkConstants } from './../data/constants/NetworkConstants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase';
import { LocalNotifications } from '@ionic-native/local-notifications';

@Injectable()
export class NotificationService {

    private currentNotifications = [];

    constructor(private firebase: Firebase,
        private http: HttpClient,
        private platform: Platform,
        private storageService: StorageService,
        private localNotification: LocalNotifications
    ) {
        this.platform.ready().then(() => {
            console.log("bla");
            this.firebase.hasPermission().then(data => {
                if (!data.isEnabled) this.firebase.grantPermission();
            });

            this.localNotification.hasPermission().then(value => {
                if (!value) this.localNotification.registerPermission();
            });

            this.firebase.onTokenRefresh().subscribe(token => {
                this.storeTokenToServer(token).catch(e => {
                    console.log(e);
                })
            });

            this.localNotification.on("click", (event) => {
                //window.location.href = url;
                console.log(this.currentNotifications[this.findNotification(event.id)])
            });

            this.firebase.onNotificationOpen().subscribe(notification => {
                if (!notification) return;

                this.storageService.getLocalStorage("notification").then(value => {
                    if (!value) {
                        notification["id"] = Date.now();
                        this.currentNotifications.push(notification);
                        switch (notification.type) {
                            case "newApplication":
                                this.localNotification.schedule({
                                    id: notification.id,
                                    title: "Project Finder",
                                    text: 'Du hast eine neue Bewerbung im Projekt ' + notification.projectTitle + ' erhalten!',
                                    smallIcon: 'res://calendar'
                                });
                                break;
                            case "applicationStatusChanged":
                                this.localNotification.schedule({
                                    id: notification.id,
                                    title: "Project Finder",
                                    text: 'Deine Bewerbung fürs Projekt ' + notification.projectTitle + ' wurde bearbeitet!'
                                });
                                break;
                            case "projectClosed":
                                this.localNotification.schedule({
                                    id: notification.id,
                                    title: "Project Finder",
                                    text: 'Das Projekt ' + notification.projectTitle + ' wurde geschlossen!'
                                });
                                break;
                            case "memberJoined":
                                this.localNotification.schedule({
                                    id: notification.id,
                                    title: "Project Finder",
                                    text: 'Das Projekt ' + notification.projectTitle + ' hat ein neues Mitglied!'
                                });
                                break;
                            case "projectRemoved":
                                this.localNotification.schedule({
                                    id: notification.id,
                                    title: "Project Finder",
                                    text: 'Das Projekt ' + notification.projectTitle + ' wurde entfernt!'
                                });
                                break;
                            case "removedFromProject":
                                this.localNotification.schedule({
                                    id: notification.id,
                                    title: "Project Finder",
                                    text: 'Das Mitglied ' + notification.firstname + ' wurde vom Projekt ' + notification.projectTitle + ' entfernt!'
                                });
                                break;
                            default:
                                break;
                        }
                    }
                });
            });
        });
    }

    findNotification(id: string) {
        for (let i = 0; i < this.currentNotifications.length; i++) {
            if (this.currentNotifications[i].id == id) return i;
        }
    }

    storeNotificationToken() {
        this.firebase.getToken().then(token => {
            console.log(token);
            this.storeTokenToServer(token).catch(e => {
                console.log("Store token Error");
                console.log(e);
            })
        }).catch(e => {
            console.log("Token error");
            console.log(e);
        });
    }

    storeTokenToServer(token: string) {
        return new Promise((resolve, reject) => {
            this.http.post(NetworkConstants.HOME_URL + "/notifications/token", { token: token }, { responseType: "text" }).subscribe((res) => {
                console.log("success");
                resolve();
            }, (error) => {
                console.log(error);
                reject(error);
            });
        });
    }
}