import { User } from './../../data/User';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Validator } from 'validator'
import { matchingPasswords } from "./validators/matchingPasswordsValidator";
import { trigger, style, animate, transition } from '@angular/animations';

/**
 * Generated class for the ChangePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
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
    )
  ],
})
export class ChangePasswordPage implements OnInit {

  passwordForm: FormGroup;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePasswordPage');
  }

  submitPassword() {
    if (this.passwordForm.valid) {
      console.log(this.passwordForm.value);
    }
  }

  ngOnInit() {
    //Initialize Register form
    this.passwordForm = new FormGroup({
      'password': new FormControl(null, [Validators.required, Validators.maxLength(15), Validators.minLength(5)]),
      'repeatPassword': new FormControl(null, [Validators.required, Validators.maxLength(15), Validators.minLength(5)])
    }, matchingPasswords('password', 'repeatPassword'));
  }

}
