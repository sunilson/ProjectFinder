import { ComponentsModule } from './../../components/components.module';
import { LocationService } from './../../services/location-service';
import { SearchFilterPage } from './../search-filter/search-filter';
import { SearchService } from './../../services/search-service';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchPage } from './search';

@NgModule({
  declarations: [
    SearchPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(SearchPage),
  ],
  entryComponents: [
  ]
})
export class SearchPageModule { }
