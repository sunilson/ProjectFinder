import { SocialSharing } from '@ionic-native/social-sharing';
import { Clipboard } from '@ionic-native/clipboard';
import { ChatMessage } from './../../data/ChatMessage';
import { StorageService } from './../../services/storage-service';
import { ChatService } from './../../services/chat-service';
import { trigger, transition, animate, style } from '@angular/animations';
import { Application } from './../../data/Application';
import { User } from './../../data/User';
import { LoginService } from './../../services/login-service';
import { ProjectService } from './../../services/project-service';
import { Project } from './../../data/Project';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, LoadingController, Content, ToastController } from 'ionic-angular';
import { GoogleMap, GoogleMaps, GoogleMapsEvent, GoogleMapOptions, CameraPosition, MarkerOptions, Marker } from '@ionic-native/google-maps';
import { ChangeDetectorRef } from '@angular/core';

/**
 * Generated class for the ProjectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google;

@IonicPage()
@Component({
  selector: 'page-project',
  templateUrl: 'project.html',
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
export class ProjectPage {

  //map: GoogleMap;
  @ViewChild('chatInput') chatInput: HTMLInputElement;
  @ViewChild('chat') chat: Content;
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  projectId: string;
  project?: Project;
  startDate: string;
  duration: string;
  chatDisabled: boolean = false;
  user: User;
  application: Application;
  chatMessages: ChatMessage[] = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private googleMaps: GoogleMaps,
    public projectService: ProjectService,
    public modalCtrl: ModalController,
    private alertCtrl: AlertController,
    public chatService: ChatService,
    private storageService: StorageService,
    private changeDetector: ChangeDetectorRef,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private socialSharing: SocialSharing,
    private clipBoard: Clipboard,
    private loginService: LoginService) {
    this.projectId = this.navParams.get("projectId");

    this.loginService.getLocalUser().subscribe((user) => {
      this.user = user;
      if (this.user && this.user.id) {
        this.application = this.projectService.canApply(this.user, this.projectId);
        this.loadProject();
      }
    }, (error) => {

    });

    this.storageService.subscribeToUserChange().subscribe((user) => {
      this.user = user;
      this.application = this.projectService.canApply(this.user, this.projectId);
      console.log("User changed in project");
      console.log(user);
    });

    this.storageService.subscribeToProjectChange().subscribe((project) => {
      console.log("Project changed in project");
      console.log(project);
      this.project = project;
    })
  }

  ionViewDidLeave() {
    this.chatService.disconnect();
  }

  refreshProject(refresher) {
    //Reset project and chat and load project again
    this.project = null;
    this.chatService.disconnect();
    this.loadProject(refresher);
  }

  loadProject(refresher?) {
    let loader;
    if (!refresher) {
      loader = this.loadingCtrl.create({
        content: "Lade..."
      });
      loader.present();
    }
    if (this.projectId) {
      this.projectService.getSingleProject(this.projectId).subscribe((project: Project) => {
        if (project) {

          console.log(project);

          //Return if network call was faster
          if (this.project && project.local) {
            return;
          }

          this.project = project;
          if (loader) {
            loader.dismiss();
            loader = null;
          } else if (refresher) {
            refresher.complete();
          }
          this.changeDetector.detectChanges();

          if (!project.local && project.status == 0) {
            //Initialize Chat
            if (this.projectService.isMember(this.user, this.project)) {
              this.chatService.chatObservable.subscribe((messages: ChatMessage[]) => {
                this.chatMessages = messages;
                this.chat.resize();
                setTimeout(() => {
                  //this.chat.scrollToBottom(1);
                  //this.chat.resize();
                }, 500);
              });
              this.chatService.connect(this.projectId);
            }
          }
        }

        this.startDate = this.projectService.formateDate(this.project.startDate);
        this.duration = this.projectService.calculateDuration(this.project.startDate, this.project.endDate);
        setTimeout(() => {
          if (this.project.location) {
            this.loadMap();
          }
        }, 200);
      }, (error) => {
        if (loader) {
          loader.dismiss();
          loader = null;
        } else if (refresher) {
          refresher.complete();
        }
        if (!this.project || !this.project.local) {
          this.toastCtrl.create({
            message: "Error fetching project...",
            duration: 3000
          }).present();
          this.navCtrl.pop();
        }
      });
    } else {
      if (loader) {
        loader.dismiss();
        loader = null;
      }
      this.navCtrl.setRoot("FeedPage");
    }
  }

  loadMap() {
    let latLng = new google.maps.LatLng(this.project.location.coordinates[0], this.project.location.coordinates[1]);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    let marker = new google.maps.Marker({
      position: latLng,
      map: this.map
    });
    google.maps.event.trigger(this.map, 'resize');
  }

  edit() {
    this.modalCtrl.create("EditProjectPage", { project: this.project }).present();
  }

  delete() {
    let loader = this.loadingCtrl.create({
      content: "Lösche..."
    });
    loader.present();
    this.alertCtrl.create({
      title: 'Projekt löschen',
      message: 'Willst du das Projekt wirklich löschen?',
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel',
          handler: () => {
            loader.dismiss();
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.projectService.removeProject(this.project.id).then(() => {
              loader.dismiss();
              this.navCtrl.pop();
            }).catch((error) => {
              loader.dismiss();
            });
          }
        }
      ]
    }).present();
  }

  leave() {
    let loader = this.loadingCtrl.create({
      content: "Verlasse..."
    });
    loader.present();
    this.alertCtrl.create({
      title: 'Projekt verlassen',
      message: 'Willst du das Projekt permanent verlassen?',
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel',
          handler: () => {
            loader.dismiss();
          }
        },
        {
          text: 'Verlassen',
          handler: () => {
            this.projectService.removeMember(this.user.id, this.project.id, true).then(() => {
              loader.dismiss();
              this.navCtrl.pop();
            }).catch((error) => {
              console.log(error);
              this.toastCtrl.create({
                message: "Fehler beim Verlassen des Projekts!",
                duration: 3000
              }).present();
              loader.dismiss();
            });
          }
        }
      ]
    }).present();
  }

  share() {
    const Branch = window['Branch'];
    var properties = {
      canonicalIdentifier: 'projects/' + this.projectId
    }

    Branch.createBranchUniversalObject(properties).then((res) => {
      return res.generateShortUrl({}, {
        projectID: this.projectId
      });
    }).then(result => {
      let options = {
        url: result.url
      };

      this.socialSharing.shareWithOptions(options);
      /* return this.clipBoard.copy(result.url);
     }).then(() => {
       this.toastCtrl.create({
         message: "Link in Zwischenablage kopiert!",
         duration: 3000
       }).present();*/
    }).catch(function (err) {
      console.log(err);
    })
  }

  removeMember(member: User) {
    this.alertCtrl.create({
      title: 'Mitglied entfernen',
      message: 'Willst du das Mitglied wirklich entfernen?',
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Löschen',
          handler: () => {
            let loader = this.loadingCtrl.create({
              content: "Lösche..."
            });
            loader.present();
            this.projectService.removeMember(member.id, this.project.id, false).then(() => {
              loader.dismiss();
            }).catch((e) => {
              console.log(e);
              loader.dismiss();
              this.toastCtrl.create({
                message: "Fehler beim Entfernen des Mitglieds!",
                duration: 3000
              }).present();
            });
          }
        }
      ]
    }).present();
  }

  changeApplicationStatus(id: string, applicationAuthorID: string, status: number) {
    let loader = this.loadingCtrl.create({
      content: "Lade..."
    });
    loader.present();
    this.projectService.changeApplicationStatus(id, this.projectId, applicationAuthorID, status).then(() => {
      loader.dismiss();
    }).catch((error) => {
      console.log(error);
      this.toastCtrl.create({
        message: "Es ist ein Fehler aufgetreten!",
        duration: 3000
      }).present();
      loader.dismiss();
    });
  }

  closeProject() {
    this.alertCtrl.create({
      title: 'Close project',
      message: 'Do you really want to close this project? All applications will be removed and no new users can apply!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Close',
          handler: () => {
            let loader = this.loadingCtrl.create({
              content: "Closing project..."
            });
            loader.present();
            this.projectService.closeProject(this.project.id).then(() => {
              loader.dismiss();
            }).catch((e) => {
              console.log(e);
              loader.dismiss();
              this.toastCtrl.create({
                message: "Error closing Project!",
                duration: 3000
              }).present();
            });
          }
        }
      ]
    }).present();
  }

  getMemberAmount() {
    if (this.project.memberAmount) {
      return this.project.memberAmount;
    }
    if (this.project.members) {
      return this.project.members.length;
    }
    return 0;
  }

  apply() {
    this.modalCtrl.create("ApplicationPage", { projectId: this.project.id }).present();
  }

  sendMessage() {
    //this.chat.scrollToBottom(300);
    //this.chat.resize();
    this.chatService.sendMessage(this.chatInput.value);
    this.chatDisabled = true;
    setTimeout(() => {
      this.chatDisabled = false;
    }, 1000);
    this.chatInput.value = "";
  }

  openApplication(application: Application) {
    if (!application) {
      application = this.application;
    }
    this.modalCtrl.create("ApplicationPage", { applicationId: application.id }).present();
  }

  ionViewWillEnter() {
    this.loginService.freshAccessCheck().then((result) => {
      if (!result) {
        this.navCtrl.setRoot("LoginPage");
      }
    });
  }
}