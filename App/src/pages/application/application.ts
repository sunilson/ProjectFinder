import { LoginService } from './../../services/login-service';
import { ProjectConstants } from './../../data/constants/ProjectConstants';
import { RefreshService } from './../../services/refresh-service';
import { StorageService } from './../../services/storage-service';
import { User } from './../../data/User';
import { HomePage } from './../home/home';
import { Application } from './../../data/Application';
import { Project } from './../../data/Project';
import { ProjectService } from './../../services/project-service';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Autosize } from 'ionic2-autosize';
import { trigger, style, animate, transition } from '@angular/animations';

/**
 * Generated class for the ApplicationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-application',
  templateUrl: 'application.html',
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
  ]
})
export class ApplicationPage {

  @ViewChild('applicationText') applicationText;

  application: Application;
  applicationId: string;
  projectId: string;
  user: User;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private projectService: ProjectService,
    private loginService: LoginService,
    private storageService: StorageService,
    private refreshService: RefreshService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController) {

    this.projectId = this.navParams.get("projectId");
    this.applicationId = this.navParams.get("applicationId");

    if (!this.projectId && !this.applicationId) {
      this.navCtrl.pop();
    }

    this.loginService.getLocalUser().subscribe((user: User) => {
      this.user = user;
      if (this.applicationId) {
        this.loadApplication();
      }
    }, (error) => {
      this.navCtrl.pop();
    });
  }

  ionViewDidLoad() {

  }

  loadApplication() {
    this.projectService.getSingleApplication(this.applicationId).subscribe((result: Application) => {
      this.application = result;
    }, (error) => {
      this.toastCtrl.create({
        message: "Error loading application",
        duration: 3000
      }).present();
      this.navCtrl.pop();
      console.log(error);
    });
  }

  applyEvent() {
    if (this.projectId && this.applicationText.value && this.applicationText.value.length > 0) {
      let loader = this.loadingCtrl.create({
        content: "Sending application..."
      });
      loader.present();
      this.projectService.sendApplication(new Application(this.applicationText.value, this.projectId, this.user.id, 1, this.user)).then(() => {
        loader.dismiss();
        this.navCtrl.pop();
      }).catch((error) => {
        console.log(error);
        loader.dismiss();
        this.toastCtrl.create({
          message: "Error sending your application. Please try again!",
          duration: 4000
        }).present();
      });
    }
  }

  changeApplicationStatus(status: number) {
    let loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    loader.present();
    this.projectService.changeApplicationStatus(this.applicationId, this.projectId, this.application.author.id, status).then((result) => {
      loader.dismiss();
      this.navCtrl.pop();
    }).catch((error) => {
      console.log(error);
      this.toastCtrl.create({
        message: "Error!",
        duration: 3000
      }).present();
      loader.dismiss();
    });
  }

  ionViewWillEnter() {
    if (!this.loginService.freshAccessCheck()) {
      this.navCtrl.setRoot("LoginPage");
    }
  }

  cancel() {
    this.navCtrl.pop();
  }
}
