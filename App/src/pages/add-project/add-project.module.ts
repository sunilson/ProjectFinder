import { AutosizeModule } from './../../util/AutosizeModule';
import { LocationService } from './../../services/location-service';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddProjectPage } from './add-project';

@NgModule({
  declarations: [
    AddProjectPage
  ],
  imports: [
    AutosizeModule,
    IonicPageModule.forChild(AddProjectPage),
  ],
  schemas: [
    LocationService
  ]
})
export class AddProjectPageModule { }
