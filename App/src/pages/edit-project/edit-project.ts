import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Project } from './../../data/Project';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EditProjectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-project',
  templateUrl: 'edit-project.html',
})
export class EditProjectPage implements OnInit {

  ngOnInit(): void {
    this.editProjectForm = new FormGroup({
      'projectname': new FormControl(null, [Validators.required]),
      'description': new FormControl()
    });
  }

  editProjectForm: FormGroup;
  project: Project;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.project = this.navParams.get("project");
    if (!this.project) {
      this.navCtrl.pop();
    }
  }

  editProject() {

  }

}
