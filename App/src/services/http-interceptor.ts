import { NetworkConstants } from './../data/constants/NetworkConstants';
import {App, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { LoginService } from './login-service';
import { Injectable, Injector } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import 'rxjs/Rx';
import { fromPromise } from "rxjs/observable/fromPromise";
import { HttpErrorResponse } from "@angular/common/http";


/**
 * Interceptor for all HTTP calls which adds the auth token and checks for auth errors
 */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private inj: Injector, private app: App, private toastCtrl: ToastController) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const auth = this.inj.get(LoginService);

        if (request.url.startsWith(NetworkConstants.HOME_URL + "/auth") || request.url.startsWith(NetworkConstants.HOME_URL + "/tags")) {
            return next.handle(request).timeout(5000).do((event: HttpEvent<any>) => {
            }, (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (!request.url.endsWith("/login") && (err.status === 0 || err.status === 400 || err.status === 401 || err.status === 500)) {
                        this.toastCtrl.create({
                            message: "Authentication error",
                            duration: 3000
                        }).present();
                        auth.logOut();
                        this.app.getRootNav().setRoot("LoginPage");
                    }
                    return Observable.throw(err);
                }
            });
        }

        //Check validation and get access token, then transform to Observable
        return fromPromise(auth.loginValidation()).switchMap(result => {
            if (result) {
                //Clone request and add auth header
                request = request.clone({
                    setHeaders: {
                        Authorization: "Bearer " + result,
                        'Cache-Control': 'no-cache',
                        Pragma: 'no-cache',
                        Expires: 'Sat, 01 Jan 2000 00:00:00 GMT'
                    }
                });
            }

            return next.handle(request).timeout(5000).do((event: HttpEvent<any>) => {
            }, (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 0) {
                        this.toastCtrl.create({
                            message: "Network request error. Are you connected to the internet?",
                            duration: 3000
                        }).present();

                    }

                    if (err.status === 401) {
                        auth.logOut().then(() => {
                            this.toastCtrl.create({
                                message: "Not logged in.",
                                duration: 3000
                            }).present();
                            this.app.getRootNav().setRoot("LoginPage");
                        });
                    }

                    if (err.status === 400) {
                        /*
                        this.toastCtrl.create({
                            message: "Network request error.",
                            duration: 3000
                        }).present();
                        */
                    }

                    if (err.status === 404) {
                        this.toastCtrl.create({
                            message: "Not found!",
                            duration: 3000
                        }).present();
                        this.app.getActiveNav().pop();
                    }

                    if (err.status === 500) {
                        /*
                        this.toastCtrl.create({
                            message: "Server error.",
                            duration: 3000
                        }).present();
                        */
                    }

                    return Observable.throw(err);
                }
            });
        }).catch((error) => {
            console.log(error.message);
            return Observable.throw(new Error(error));
        });
    }
}