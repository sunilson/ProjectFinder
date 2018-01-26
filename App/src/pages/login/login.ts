import { StorageService } from './../../services/storage-service';
import { trigger, transition, style, animate } from '@angular/animations';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { LoginService } from '../../services/login-service';
import { GooglePlus } from '@ionic-native/google-plus';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({ transform: 'translateY(-10px)', opacity: 0 }),
          animate('200ms', style({ transform: 'translateY(0)', opacity: 1 }))
        ]),
        transition(':leave', [
          style({ transform: 'translateY(0)', opacity: 1 }),
          animate('200ms', style({ transform: 'translateY(-10px)', opacity: 0 }))
        ])
      ]
    )
  ],
})
export class LoginPage implements OnInit {

  myForm: FormGroup;
  private submitAttempt: boolean;
  username: string;

  ngOnInit(): void {
    this.myForm = new FormGroup({
      'username': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required])
    });
  }

  constructor(private loginService: LoginService,
    public navCtrl: NavController,
    public navParams: NavParams,
    private toastCtrl: ToastController,
    private storageService: StorageService,
    private loadingCtrl: LoadingController,
    private googlePlus: GooglePlus) {

    this.loginService.freshAccessCheck().then((result) => {
      if (result) {
        this.navCtrl.setRoot("FeedPage");
      }
    }).catch((error) => {

    });

    this.storageService.getLocalStorage("username").then(username => {
      this.username = username;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  /**
   * Called after form submit. Calls login service
   * 
   */
  submitLogin() {
    let loader = this.loadingCtrl.create({
      content: "Logging in..."
    });
    loader.present();
    this.submitAttempt = true;

    if (this.myForm.valid) {
      this.loginService.login(this.myForm.value.username, this.myForm.value.password).then((result) => {
        this.storageService.storeLocalStorage("username", this.myForm.value.username);
        loader.dismiss();
        this.navCtrl.setRoot("FeedPage");
      }).catch((error) => {
        console.log(error);
        loader.dismiss();
        let errorMessage = "Login error!";
        if (error.status == 401) {
          errorMessage = error.error;
        }
        this.toastCtrl.create({
          message: errorMessage,
          duration: 2000
        }).present();
      });
    } else {
      loader.dismiss();
    }
  }

  openRegistration() {
    this.navCtrl.push("RegistrationPage");
  }

  openForgotPassword() {
    this.navCtrl.push("ForgotPasswordPage");
  }

  googleLogin() {

    this.googlePlus.login({
      'webClientId': '475022388364-nfcpv4ak0amnjhl0tksima99j1m8efns.apps.googleusercontent.com' // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
    })
      .then(res => {
        this.loginService.login(null, null, res.idToken).then((result) => {
          this.toastCtrl.create({
            message: "Login success!",
            duration: 2000
          }).present();
          this.navCtrl.setRoot("FeedPage");
        }).catch((error) => {
          this.toastCtrl.create({
            message: "Login error!",
            duration: 2000
          }).present();
        });
      })
      .catch(err => console.error(err));
  }

}
