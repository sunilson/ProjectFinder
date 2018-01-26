import { LocationService } from './../../services/location-service';
import { SearchFilterPage } from './search-filter';
import { SearchService } from './../../services/search-service';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
    declarations: [
        SearchFilterPage
    ],
    imports: [
        IonicPageModule.forChild(SearchFilterPage),
    ]
})
export class SearchFilterPageModule { }
