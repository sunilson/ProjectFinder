import { TagService } from './../../services/tag-service';
import { FilePath } from '@ionic-native/file-path';
import { ImageUploadService } from './../../services/image-upload-service';
import { Camera } from '@ionic-native/camera';
import { StorageService } from './../../services/storage-service';
import { User } from './../../data/User';
import { LoginService } from './../../services/login-service';
import { Component } from '@angular/core';
import { File, FileEntry } from '@ionic-native/file';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController, ToastController, Platform } from 'ionic-angular';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  user: User;
  notification: boolean = true;
  location: boolean = true;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private platform: Platform,
    private alertCtrl: AlertController,
    private storageService: StorageService,
    private actionSheetCtrl: ActionSheetController,
    private loginService: LoginService,
    private imageUploadService: ImageUploadService,
    private filePath: FilePath,
    private camera: Camera,
    private tagService: TagService,
    private toastCtrl: ToastController) {

    this.loginService.getLocalUser().subscribe((user) => {
      this.user = user;
      Promise.all([this.storageService.getLocalStorage("notification"),
      this.storageService.getLocalStorage("location")
      ]).then((res) => {
        if (res != null && res != undefined) {
          this.notification = res[0];
          this.location = res[1];
        }
      }).catch((err) => {

      });
    }, (error) => {
      this.navCtrl.pop();
    });

    this.storageService.subscribeToUserChange().subscribe((user) => {
      this.user = user;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  toggleChanged(event, key) {
    this.storageService.storeLocalStorage(key, event.value);
  }

  openChangePassword() {
    this.alertCtrl.create({
      title: 'Passwort ändern',
      message: 'Du erhältst eine Email mit weiteren Anweisungen',
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: 'Senden',
          handler: () => {
            this.loginService.resetPassword(this.user.email).then(() => {
              this.toastCtrl.create({
                message: "Email wurde gesendet!",
                duration: 3000
              }).present();
            }).catch((error) => {
              this.toastCtrl.create({
                message: "Fehler! Bitte erneut versuchen",
                duration: 3000
              }).present();
            });
          }
        }
      ]
    }).present();
  }

  editUserTags() {
    this.tagService.openTagDialog(this.user.tags).then(res => {
      const oldTags = this.user.tags;
      this.user.tags = res;
      this.loginService.updateUser(this.user).then(() => {
        this.toastCtrl.create({
          message: "Änderung erfolgreich",
          duration: 3000
        }).present();
      }).catch(error => {
        this.user.tags = oldTags;
        this.toastCtrl.create({
          message: "Fehler beim Aktualisieren des Nutzers aufgetreten",
          duration: 5000
        }).present();
      });
    }).catch(e => {
      this.toastCtrl.create({
        message: "Fehler beim Aktualisieren des Nutzers aufgetreten",
        duration: 5000
      }).present();
    });
  }

  openDeleteAccount() {
    this.alertCtrl.create({
      title: 'Account löschen',
      message: 'Willst du deinen Account permanent löschen?',
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
            this.loginService.deleteAccount(this.user.email).then(() => {
              this.toastCtrl.create({
                message: "Bestätigungs-Email wurde an Sie gesendet!",
                duration: 3000
              }).present();
            }).catch((e) => {
              this.toastCtrl.create({
                message: "Fehler!",
                duration: 3000
              }).present();
            });
          }
        }
      ]
    }).present();
  }

  editProfilePicture() {
    this.actionSheetCtrl.create({
      title: "Quelle von Bild auswählen:",
      buttons: [
        {
          text: "Aus Gallerie laden",
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: "Mit Kamera aufnehmen",
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        }
      ]
    }).present();
  }

  takePicture(sourceType) {
    this.camera.getPicture({
      quality: 100,
      saveToPhotoAlbum: false,
      sourceType: sourceType,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }).then(imagePath => {
      let correctPath;
      let currentName;
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.processImage(correctPath, currentName);
          });
      } else {
        currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.processImage(correctPath, currentName);
      }
    }, err => {

    });
  }

  processImage(correctPath, currentName) {
    this.imageUploadService.storeImageLocal(correctPath, currentName, this.createFileName()).then((res: string) => {
      this.imageUploadService.uploadProfilePicture(res).then((url: string) => {
        this.storageService.updateProfilePicture(this.user.id, url);
      }).catch(e => {
        this.toastCtrl.create({
          message: "Fehler beim Hochladen!",
          duration: 3000
        }).present();
      });
    }).catch(e => {
      this.toastCtrl.create({
        message: "Fehler beim Speichern von Bild!",
        duration: 3000
      }).present();
    });
  }

  createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }

  ionViewWillEnter() {
    this.loginService.freshAccessCheck().then((result) => {
      if (!result) {
        this.navCtrl.setRoot("LoginPage");
      }
    });
  }

}