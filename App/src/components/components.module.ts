import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { ProjectCardComponent } from './project-card/project-card';
@NgModule({
	declarations: [ProjectCardComponent],
	imports: [IonicModule],
	exports: [ProjectCardComponent]
})
export class ComponentsModule { }
