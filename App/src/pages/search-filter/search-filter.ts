import { LocationService } from './../../services/location-service';
import { TagService } from './../../services/tag-service';
import { SearchService } from './../../services/search-service';
import { SearchSettings } from './../../data/SearchSettings';
import { Component } from '@angular/core';
import { IonicPage, ViewController, NavController, NavParams, PopoverController } from 'ionic-angular';

/**
 * Generated class for the SearchFilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-filter',
  templateUrl: 'search-filter.html'
})
export class SearchFilterPage {

  private searchSettings: SearchSettings;
  constructor(public navCtrl: NavController,
    private viewCtrl: ViewController,
    public navParams: NavParams,
    private popoverCtrl: PopoverController,
    public searchService: SearchService,
    private tagService: TagService,
    private locationService: LocationService
  ) {
    this.searchSettings = this.navParams.get("searchSettings");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchFilterPage');
  }

  addTags() {
    this.viewCtrl.dismiss();
    this.tagService.openTagDialog((this.searchSettings) ? this.searchSettings.tags : null).then((tags) => {
      this.searchService.updateSearchSettings("tags", tags);
    }).catch((error) => {
      //TODO ERROR HANDLING
    });
  }

  openTagsAutocomplete(event) {
    this.popoverCtrl.create("SearchPage").present({
      ev: event
    });
  }

  locationGlobal(event) {
    this.viewCtrl.dismiss();
    if (event.checked) {
      this.searchService.updateSearchSettings("location", null);
    } else {
      if (!this.searchService.searchSettings.location) this.selectLocation();
    }
  }

  paidToggle(event) {
    this.searchService.updateSearchSettings("paid", event.checked);
  }

  selectLocation() {
    this.locationService.selectLocation().subscribe((result) => {
      if (result) {
        this.searchService.updateSearchSettings("location", result);
      }
    });
  }

}
