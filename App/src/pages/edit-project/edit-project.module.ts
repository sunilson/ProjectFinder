import { AutosizeModule } from './../../util/AutosizeModule';
import { Autosize } from 'ionic2-autosize';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditProjectPage } from './edit-project';

@NgModule({
  declarations: [
    EditProjectPage
  ],
  imports: [
    AutosizeModule,
    IonicPageModule.forChild(EditProjectPage),
  ],
})
export class EditProjectPageModule { }
