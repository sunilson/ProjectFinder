import { ProjectCardComponent } from './../../components/project-card/project-card';
import { Project } from './../../data/Project';
import { trigger, style, animate, transition, state, keyframes } from '@angular/animations';
import { Tag } from './../../data/Tag';
import { LoginService } from './../../services/login-service';
import { SearchSettings } from './../../data/SearchSettings';
import { SearchService } from './../../services/search-service';
import { LocationService } from './../../services/location-service';
import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, PopoverController, LoadingController } from 'ionic-angular';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
  animations: [
    trigger(
      'tagAnimation', [
        transition(':enter', [
          style({ opacity: 0 }),
          animate('600ms', style({ opacity: 1 }))
        ]),
        transition(':leave', [
          style({ transform: 'translateY(0)', opacity: 1 }),
          animate('200ms', style({ transform: 'translateY(-10px)', opacity: 0 }))
        ])
      ]
    ),
    trigger(
      'spinnerAnimation', [
        transition(':enter', [
          style({ transform: 'translateY(-30px)', opacity: 0 }),
          animate('400ms', style({ transform: 'translateY(0px)', opacity: 1 }))
        ]),
        transition(':leave', [
          style({ transform: 'translateY(0)', opacity: 1 }),
          animate('400ms', style({ transform: 'translateY(-30px)', opacity: 0 }))
        ])
      ]
    ),
    trigger('cardAnimation', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        animate(400, keyframes([
          style({ opacity: 0, transform: 'translateX(-100%)', offset: 0 }),
          style({ opacity: 1, transform: 'translateX(15px)', offset: 0.3 }),
          style({ opacity: 1, transform: 'translateX(0)', offset: 1.0 })
        ]))
      ]),
      transition('* => void', [
        animate(400, keyframes([
          style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
          style({ opacity: 1, transform: 'translateX(-15px)', offset: 0.7 }),
          style({ opacity: 0, transform: 'translateX(100%)', offset: 1.0 })
        ]))
      ])
    ])
  ]
})
export class SearchPage {

  searchSettings: SearchSettings;
  projects: Project[] = [];
  page: number = 1;
  infinity: boolean = true;
  subscription;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private popOverCtrl: PopoverController,
    private modalCtrl: ModalController,
    private locationService: LocationService,
    private changeDetector: ChangeDetectorRef,
    private searchService: SearchService,
    private loginService: LoginService,
    private loadingCtrl: LoadingController
  ) {
    this.searchService.clearSettings();
  }

  ionViewDidEnter() {
    this.subscription = this.searchService.getSearchSettings().subscribe((settings) => {
      this.searchSettings = settings;
      this.startSearch();
    });
  }

  ionViewDidLeave() {
    this.subscription.unsubscribe();
  }

  ionViewWillEnter() {
    this.loginService.freshAccessCheck().then((result) => {
      if (!result) {
        this.navCtrl.setRoot("LoginPage");
      }
    });
  }

  openFilter(event) {
    let popOver = this.popOverCtrl.create("SearchFilterPage", {
      searchSettings: this.searchSettings
    });
    popOver.present({
      ev: event
    });
  }

  paginateSearch(infiniteScroll): Promise<any> {
    return new Promise((resolve, reject) => {
      this.page++;
      this.searchService.startSearch(this.searchSettings, this.page).then((result: Project[]) => {
        this.projects = this.projects.concat(result);
        this.changeDetector.detectChanges();
        resolve();
        infiniteScroll.complete();
        if (result.length == 0) {
          this.infinity = false;
        }
      }).catch((error) => {
        resolve();
        infiniteScroll.complete();
        infiniteScroll.enable(false);
      });
    });
  }

  startSearch(page?: Number) {
    var loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    this.page = 1;
    this.infinity = true;
    loader.present();
    this.searchService.startSearch(this.searchSettings).then((result: Project[]) => {
      loader.dismiss();
      this.projects = result;
    }).catch((error) => {
      loader.dismiss();
      //TODO
    });
  }

  openProject(project: Project) {
    this.navCtrl.push("ProjectPage", {
      projectId: project.id
    });
  }

  onInput(event) {
    this.searchService.updateSearchSettings("query", event.target.value);
  }

  removeTag(tag: Tag) {
    this.searchSettings.tags.splice(this.searchSettings.tags.indexOf(tag), 1);
    this.searchService.updateSearchSettings("tags", this.searchSettings.tags);
  }
}
