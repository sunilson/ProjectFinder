import { LoginService } from './../../services/login-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import validator from 'validator';

/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private loginService: LoginService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }

  sendEmail(email: string) {

    if (!validator.isEmail(email)) {
      this.toastCtrl.create({
        message: "Please enter valid email address!",
        duration: 3000
      }).present();
    };

    let loading = this.loadingCtrl.create({
      content: "Loading..."
    });
    loading.present();

    this.loginService.resetPassword(email).then(() => {
      loading.dismiss();
      this.toastCtrl.create({
        message: "Reset email sent, please check your inbox!",
        duration: 3000
      }).present();
      this.navCtrl.pop();
    }).catch((e) => {
      console.log(e);
      this.toastCtrl.create({
        message: "Error!",
        duration: 3000
      }).present();
      loading.dismiss();
    });
  }

}
