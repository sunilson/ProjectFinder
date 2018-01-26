import { User } from './../../data/User';
import { Autosize } from 'ionic2-autosize';
import { LoginService } from './../../services/login-service';
import { Payment } from './../../data/Payment';
import { Project } from './../../data/Project';
import { ProjectService } from './../../services/project-service';
import { ProjectConstants } from './../../data/constants/ProjectConstants';
import { Location } from './../../data/Location';
import { LocationService } from './../../services/location-service';
import { Tag } from './../../data/Tag';
import { TagService } from './../../services/tag-service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { trigger, style, animate, transition } from '@angular/animations';
import moment from 'moment';

declare var google;

/**
 * Generated class for the AddProjectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-project',
  templateUrl: 'add-project.html',
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
    ),
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
    )
  ],
})
export class AddProjectPage implements OnInit {

  addProjectForm: FormGroup;
  tags: Tag[];
  currentLocation: Location;
  markers = [];

  //Set boundaries for date selector
  minStartDate: string = moment().toISOString();
  minEndDate: string = moment().add(1, 'days').toISOString();

  //Dates which are bound to date selector to check for overlaps
  currentStartDate: string = moment().toISOString();
  currentEndDate: string = moment().add(1, 'days').toISOString();

  //map: GoogleMap;
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(private fb: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams,
    private tagsService: TagService,
    private toastCtrl: ToastController,
    private projectService: ProjectService,
    private locationService: LocationService,
    private loginService: LoginService,
    private loadingCtrl: LoadingController) {
  }

  initializeMap() {
    let startPosition = new google.maps.LatLng(this.currentLocation.coordinates[0], this.currentLocation.coordinates[1])
    let mapOptions = {
      center: startPosition,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true,
      draggable: false,
      scrollwheel: false,
      panControl: false,
      maxZoom: 15,
      minZoom: 15,
      zoom: 15,
      gestureHandling: 'none'
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.setMarker(startPosition);
  }

  //Check for overlaps and correct dates
  startDateChanged(event) {
    if (moment(this.currentEndDate).isBefore(moment(this.currentStartDate))) {
      this.currentEndDate = moment(this.currentStartDate).add(1, 'days').toISOString();
    }
  }
  endDateChanged(event) {
    if (moment(this.currentStartDate).isAfter(moment(this.currentEndDate))) {
      this.currentStartDate = moment(this.currentEndDate).subtract(1, 'days').toISOString();
    }
  }

  /**
   * Called after register form has been submitted
   */
  addProject() {

    let tags = [];
    let loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    loader.present();

    for (let t of this.tags) {
      tags.push(t.id);
    }

    if (this.addProjectForm.valid) {
      let val = this.addProjectForm.value;
      this.loginService.getLocalUser().subscribe((user) => {
        if (user.id) {
          let tempProject = new Project(val.projectname,
            val.description,
            (val.payment && val.paymentAmount) ? new Payment(true, val.paymentAmount) : new Payment(false),
            tags,
            val.maxMemberAmount,
            val.startDate,
            val.endDate,
            0,
            user,
            (this.currentLocation) ? this.currentLocation : null);
          this.projectService.addProject(tempProject).then((project: Project) => {
            loader.dismiss()
            this.navCtrl.pop();
          }).catch((error) => {
            loader.dismiss();
            this.toastCtrl.create({
              message: "Fehler beim Erstellen des Projekts!",
              duration: 3000
            }).present();
          });
        }
      }, (error) => {
        loader.dismiss();
        this.toastCtrl.create({
          message: "Fehler beim Erstellen des Projekts!",
          duration: 3000
        });
      });
    }
  }

  ngOnInit() {
    this.addProjectForm = new FormGroup({
      'projectname': new FormControl(null, [Validators.required]),
      'global': new FormControl(true),
      'description': new FormControl(),
      'payment': new FormControl(false),
      'paymentAmount': new FormControl(null, [Validators.min(0)]),
      'maxMemberAmount': new FormControl(5),
      'startDate': new FormControl(null, [Validators.required]),
      'endDate': new FormControl(null, [Validators.required])
    });


  }

  addTags() {
    this.tagsService.openTagDialog(this.tags).then((result) => {
      this.tags = result;
    }).catch((error) => {

    });
  }

  locateMe() {
    let loader = this.loadingCtrl.create({
      content: "Ermittle deine Position.."
    });
    loader.present();

    var coordinates;
    this.locationService.getCurrentLocation().then((result) => {
      coordinates = [result.coords.latitude, result.coords.longitude];
      loader.dismiss();
      let latLng = new google.maps.LatLng(coordinates[0], coordinates[1]);
      return this.locationService.findPlaceName(latLng, this.map)
    }).then((name: string) => {
      this.currentLocation = new Location(coordinates, name);
      var mapPosition = new google.maps.LatLng(coordinates[0], coordinates[1]);
      this.setMarker(mapPosition);
    }).catch((error) => {
      loader.dismiss();
      this.toastCtrl.create({
        message: error.message,
        duration: 3000
      }).present();
    });
  }

  private setMarker(mapPosition) {
    this.map.setCenter(mapPosition);

    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }

    var marker = new google.maps.Marker({
      position: mapPosition,
      map: this.map
    });

    this.markers.push(marker);
  }

  toggled(event) {

    if (event.value) {
      this.currentLocation = null;
      return;
    }

    if (!this.currentLocation) {
      this.currentLocation = new Location(ProjectConstants.START_LOCATION, "Hagenberg im Mühlkreis");
    }
    if (!this.map) {
      this.initializeMap();
    }
    setTimeout(() => {
      google.maps.event.trigger(this.map, 'resize');
      let currentPosition = new google.maps.LatLng(this.currentLocation.coordinates[0], this.currentLocation.coordinates[1]);
      this.map.setCenter(currentPosition);
    }, 200);
  }

  selectLocation() {
    this.locationService.selectLocation().subscribe((result) => {
      var mapPosition = new google.maps.LatLng(result.coordinates[0], result.coordinates[1]);
      this.currentLocation = result;
      this.setMarker(mapPosition);
    });
  }

  removeTag(tag: Tag) {
    this.tags.splice(this.tags.indexOf(tag), 1);
  }
}