import { Project } from './../../data/Project';
import { Component, Input } from '@angular/core';
import { trigger, style, animate, transition, state, keyframes } from '@angular/animations';
import { } from 'ionic-angular';

/**
 * Generated class for the ProjectCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'project-card',
  templateUrl: 'project-card.html',
  animations: [
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
export class ProjectCardComponent {

  @Input() project: Project;

  text: string;

  constructor() {
    console.log('Hello ProjectCardComponent Component');
    this.text = 'Hello World';
  }

}
