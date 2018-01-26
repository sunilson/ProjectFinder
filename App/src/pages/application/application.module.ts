import { AutosizeModule } from './../../util/AutosizeModule';
import { Autosize } from 'ionic2-autosize';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApplicationPage } from './application';

@NgModule({
  declarations: [ApplicationPage],
  imports: [
    AutosizeModule,
    IonicPageModule.forChild(ApplicationPage),
  ],
})
export class ApplicationPageModule { }
