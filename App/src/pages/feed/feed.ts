import { TagService } from './../../services/tag-service';
import { ProjectConstants } from './../../data/constants/ProjectConstants';
import { RefreshService } from './../../services/refresh-service';
import { StorageService } from './../../services/storage-service';
import { User } from './../../data/User';
import { ProjectService } from './../../services/project-service';
import { Application } from './../../data/Application';
import { LoginService } from './../../services/login-service';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Content, LoadingController } from 'ionic-angular';
import { Project } from '../../data/Project';
import { trigger, transition, animate, style } from '@angular/animations';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({ transform: 'translateY(50px)', opacity: 0 }),
          animate('200ms', style({ transform: 'translateY(0)', opacity: 1 }))
        ])
      ]
    )
  ],
})
export class FeedPage {

  user: User;
  interestingProjects: Project[];
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private loginService: LoginService,
    private storageService: StorageService,
    private projectService: ProjectService,
    private tagService: TagService,
    private refreshService: RefreshService,
    private loadingController: LoadingController
  ) {

    this.loadEverything();

    this.storageService.subscribeToUserChange().subscribe((user) => {
      this.user = user;
      this.content.resize();
    });

    this.refreshService.refreshObservable.subscribe((data: any) => {
      if (data == ProjectConstants.REFRESH.projects) this.refresh();
    });
  }

  getApplicationIcon(a: Application) {
    if (a.status == 0) {
      return "help-circle"
    }
    if (a.status == 1) {
      return "checkmark-circle"
    }
    if (a.status == 2) {
      return "close-circle"
    }
  }

  ionViewWillEnter() {
    this.loginService.freshAccessCheck().then((result) => {
      if (!result) {
        this.navCtrl.setRoot("LoginPage");
      }
    });
  }

  openApplication(application: Application) {
    this.modalCtrl.create("ApplicationPage", { applicationId: application.id }).present();
  }

  loadEverything() {
    let loader = this.loadingController.create({
      content: "Lade Daten..."
    });
    loader.present();
    this.loginService.getUser().subscribe((user) => {
      if (loader) {
        loader.dismiss();
        loader = null;
      }

      if (user && user.id) {
        //Only on network user
        if (!user.local) {
          //Check if intro was already shown. If not, start it
          this.storageService.getLocalStorage("intro" + user.id).then((value) => {
            if (!value) {
              this.modalCtrl.create("IntroPage", {
                userID: user.id
              }).present();
            }
          });
          if (user.tags.length == 0) {
            this.tagService.askForMissingTags();
          }
        }

        //Return if network call was faster
        if (this.user && user.local) {
          return;
        }

        this.user = user;
        this.content.resize();
      }
    }, (error) => {
      if (loader) {
        loader.dismiss();
        loader = null;
      }
    });

    this.projectService.getInterestingProjects().then((projects: Project[]) => {
      this.interestingProjects = projects;
    }).catch((error) => {
      console.log(error);
    });
  }

  refresh() {
    this.loadEverything();
  }
}
