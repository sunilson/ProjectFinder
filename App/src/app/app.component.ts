import { StorageService } from './../services/storage-service';
import { User } from './../data/User';
import { LoginService } from './../services/login-service';
import { Component, ViewChild } from '@angular/core';
import { Platform, App, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild("mycontent") nav;
  rootPage: any = "FeedPage";
  user: User;

  constructor(platform: Platform, statusBar: StatusBar,
    splashScreen: SplashScreen,
    private loginService: LoginService,
    private storageService: StorageService,
    private alertCtrl: AlertController,
    public app: App) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      branchInit();

      this.loginService.getUser().subscribe((user) => {
        this.user = user;
      }, (error) => {

      });

      this.storageService.subscribeToUserChange().subscribe((user) => {
        this.user = user;
      });
    });

    platform.resume.subscribe(() => {
      branchInit();
    });

    const branchInit = () => {
      // only on devices
      if (!platform.is('cordova')) { return }
      const Branch = window['Branch'];
      Branch.initSession(data => {
        if (data['+clicked_branch_link']) {
          // read deep link data on click
          console.log(data);
          if (data.projectID) {
            this.nav.push("ProjectPage", {
              projectId: data.projectID
            });
          }
        }
      });
    }
  }

  openImpressum() {
    this.alertCtrl.create({
      title: "Impressum",
      message: "Erstellt von Linu Weiss und Magdalena Mayrhofer. Bei Fragen und Anregungen bitte an weisslinus@gmail.com wenden. Mehr Infos zum Projekt finden Sie auf Github",
      buttons: [
        {
          text: "Ok",
          role: "cancel"
        },
        {
          text: "Github",
          handler: () => {

          }
        }
      ]
    })
  }

  logOut() {
    this.loginService.logOut().then(() => {
      this.app.getRootNav().setRoot("LoginPage");
    });
  }
}