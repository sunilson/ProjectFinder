import { StorageService } from './../../services/storage-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the IntroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {

  userID: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storageService: StorageService) {
    this.storageService.storeLocalStorage("intro" + this.navParams.get("userID"), true);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroPage');
  }

  openLogin() {
    this.navCtrl.push("LoginPage");
  }

}
