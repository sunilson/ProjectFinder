import { IonicModule } from 'ionic-angular';
import { DatePipe } from './date-pipe';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [
        DatePipe,
    ],
    imports: [
        IonicModule
    ],
    exports: [
        DatePipe
    ]
})
export class PipesModule { }