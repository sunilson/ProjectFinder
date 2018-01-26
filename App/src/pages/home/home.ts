import { LocationService } from './../../services/location-service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public locationService: LocationService) {
  }


  openLogin() {
    this.navCtrl.push("LoginPage");
  }

  openFeed() {
    this.navCtrl.push("FeedPage");
  }

  openApplication() {
    this.navCtrl.push("ApplicationPage", {
      project: "5a04b4d870bd504f94effe9e"
    });
  }

  openAddProject() {
    this.navCtrl.push("AddProjectPage");
  }

  openSettings() {
    this.navCtrl.push("SettingsPage");
  }

  openProject() {
    this.navCtrl.push("ProjectPage", {
      projectId: "5a1ea10fbbf5d93514647751"
    });
  }

  openSearchPlace() {
    this.locationService.selectLocation();
  }

}
