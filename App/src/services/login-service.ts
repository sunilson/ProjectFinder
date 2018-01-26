import { NotificationService } from './notification-service';
import { Tag } from './../data/Tag';
import { StorageService } from './storage-service';
import { MapperService } from './mapper-service';
import { Observable } from 'rxjs/Observable';
import { User } from './../data/User';
import { NetworkConstants } from './../data/constants/NetworkConstants';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

declare var require: any
var jwtDecode: any = require('jwt-decode');

@Injectable()
export class LoginService {

    private loggedIn: boolean;

    constructor(private http: HttpClient,
        private storageService: StorageService,
        private notificationService: NotificationService,
        private mapperService: MapperService) {

    }

    public login(username?: string, password?: string, idToken?: string) {
        return new Promise((resolve, reject) => {
            if ((!idToken) && (!username || !password)) {
                reject();
            }

            var body = {}
            var url = "";
            if (idToken) {
                body = { token: idToken, network: "google" };
                url = "/auth/socialLogin";
            } else {
                body = { name: username, password: password };
                url = "/auth/login";
            }

            this.http.post(NetworkConstants.HOME_URL + url, body).subscribe(
                (result) => {
                    if (result["tokens"] && result["user"]) {
                        Promise.all([this.storageService.setTokens(result["tokens"]), this.storageService.updateCurrentUser(this.mapperService.jsonToUser(result["user"]))]).then(() => {
                            this.loggedIn = true;
                            this.notificationService.storeNotificationToken();
                            resolve();
                        }).catch((e) => {
                            reject(e);
                        });
                    } else {
                        reject()
                    }
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    public register(user: User) {
        return new Promise((resolve, reject) => {
            var body = { data: JSON.stringify(user) };
            this.http.post(NetworkConstants.HOME_URL + '/auth/register', body).retry(3).subscribe(
                (result) => {
                    resolve();
                },
                (error) => {
                    reject(error);
                }
            )
        });
    }

    public accessCheck(): Boolean {
        return this.loggedIn;
    }

    public freshAccessCheck(): Promise<Boolean> {
        return new Promise((resolve, rejct) => {
            this.loginValidation().then(() => {
                resolve(true);
            }).catch((error) => {
                resolve(false);
            });
        });
    }

    /**
     * Validate current access Token
     * 
     * If invalid or about to expire, try to refresh it
     */
    public loginValidation(): Promise<Object> {
        return new Promise((resolve, reject) => {
            this.storageService.getTokens().then((result) => {
                if (!result) {
                    this.loggedIn = false;
                    reject();
                }

                var decoded = jwtDecode(result.accessToken);
                if (decoded.exp * 1000 > Date.now() + 300000) {
                    this.loggedIn = true;
                    resolve(result.accessToken);
                } else {
                    return this.refreshAccessToken(result.refreshToken);
                }
            }).then((accessToken) => {
                this.loggedIn = true;
                resolve(accessToken);
            }).catch((error) => {
                this.loggedIn = false;
                reject(error);
            });
        });
    }

    //Refreshes the current access token and saves it to Storage
    private refreshAccessToken(refreshToken: string) {
        return new Promise((resolve, reject) => {
            var body = { refreshToken: refreshToken };

            this.http.post(NetworkConstants.HOME_URL + '/auth/refreshToken', body).subscribe(
                (result) => {
                    if (result["accessToken"]) {
                        this.storageService.setTokens(null, result["accessToken"], refreshToken);
                        resolve(result["accessToken"]);
                    }
                    reject();
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    public resetPassword(name: string) {
        return new Promise((resolve, reject) => {
            var body = {
                name: name
            };
            this.http.post(NetworkConstants.HOME_URL + '/auth/resetPassword', body, { responseType: "text" }).subscribe(
                (result) => {
                    resolve();
                },
                (error) => {
                    reject(error);
                }
            )
        });
    }

    public simplyGetCurrentTokens() {
        return new Promise((resolve, reject) => {
            this.storageService.getTokens().then((result) => {
                resolve(result);
            }).catch(() => {
                resolve();
            });
        });
    }

    public getUser(): Observable<User> {
        let localRequest = Observable.fromPromise(this.storageService.getCurrentUser()).flatMap((userID) => {
            return Observable.fromPromise(this.storageService.loadUser(userID));
        }).catch((error) => {
            return Observable.empty();
        });

        let networkRequest = this.http.get(NetworkConstants.HOME_URL + "/projects/user").flatMap((user) => {
            let parsedUser = this.mapperService.jsonToUser(user);
            return Observable.fromPromise(this.storageService.updateCurrentUser(parsedUser));
        }).flatMap((res) => {
            return Observable.of(res[1]);
        });

        return Observable.merge(localRequest, networkRequest);
    }

    public updateUser(user: User): Promise<any> {

        const body = {};
        body["user"] = {};
        body["user"]["firstname"] = user.firstname;
        body["user"]["lastname"] = user.lastname;
        body["user"]["tags"] = [];
        for (let tag of user.tags) {
            body["user"]["tags"].push(tag.id);
        }

        return new Promise((resolve, reject) => {
            this.http.patch(NetworkConstants.HOME_URL + "/profile", body, { responseType: "text" }).subscribe(res => {
                this.storageService.updateCurrentUser(user).then(() => {
                    resolve();
                }).catch(error => {
                    reject(error);
                })
            }, error => {
                reject(error);
            });
        });
    }

    public getLocalUser(): Observable<User> {
        return Observable.fromPromise(this.storageService.getCurrentUser()).flatMap((userID) => {
            return Observable.fromPromise(this.storageService.loadUser(userID));
        });
    }

    public deleteAccount(email: string) {
        return new Promise((resolve, reject) => {
            var body = {
                email: email
            };
            this.http.post(NetworkConstants.HOME_URL + '/deleteAccount/', body, { responseType: "text" }).subscribe(
                (result) => {
                    resolve();
                },
                (error) => {
                    reject(error);
                }
            )
        });
    }

    public logOut() {
        return this.storageService.logOut();
    }
}