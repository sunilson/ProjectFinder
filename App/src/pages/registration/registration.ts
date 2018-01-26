import { Tag } from './../../data/Tag';
import { TagService } from './../../services/tag-service';
import { User } from './../../data/User';
import { LoginService } from './../../services/login-service';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Validator } from 'validator'
import { matchingPasswords } from "./validators/matchingPasswordsValidator";
import { trigger, style, animate, transition } from '@angular/animations';
import { nameValidator } from "./validators/nameValidator";
import { validator } from 'validator';

@IonicPage()
@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
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
    ),
    trigger(
      'tagAnimation', [
        transition(':enter', [
          style({ opacity: 0 }),
          animate('600ms', style({ opacity: 1 }))
        ]),
        transition(':leave', [
          style({ transform: 'translateY(0)', opacity: 1 }),
          animate('200ms', style({ transform: 'translateY(-10px)', opacity: 0 }))
        ])
      ]
    ),
  ],
})
export class RegistrationPage implements OnInit {

  myForm: FormGroup;
  tags: Tag[];

  constructor(private fb: FormBuilder,
    public navCtrl: NavController,
    private loginService: LoginService,
    private tagService: TagService,
    private toastCtrl: ToastController) {
  }

  /**
   * Called after register form has been submitted
   */
  submitRegistration() {
    if (this.myForm.valid) {

      let tagIds = [];
      if (this.tags) {
        for (let tag of this.tags) {
          tagIds.push(tag.id);
        }
      }

      let user = new User(this.myForm.value.username, this.myForm.value.email, this.myForm.value.password, this.myForm.value.firstname, this.myForm.value.lastname, null, tagIds);
      this.loginService.register(user).then(() => {
        this.toastCtrl.create({
          message: "Registration erfolgreich! Eine Bestätigungs Email wurde an Ihre E-Mail Adresse gesandt.",
          duration: 5000
        }).present();
        this.navCtrl.setRoot("LoginPage");
      }).catch((error) => {
        this.toastCtrl.create({
          message: "Registration not successful!",
          duration: 3000
        }).present();
      });
    }
  }

  addSkill() {
    this.tagService.openTagDialog((this.tags) ? this.tags : null).then((result) => {
      this.tags = result;
    }).catch((error) => {
      if (error) {
        this.toastCtrl.create({
          message: "Error getting Tags",
          duration: 2000
        }).present();
      }
    });
  }

  removeTag(tag: Tag) {
    this.tags.splice(this.tags.indexOf(tag), 1);
  }

  ngOnInit() {
    //Initialize Register form
    this.myForm = new FormGroup({
      'firstname': new FormControl(null, [Validators.required, Validators.maxLength(15), nameValidator]),
      'lastname': new FormControl(null, [Validators.required, Validators.maxLength(15), nameValidator]),
      'username': new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.maxLength(15), Validators.minLength(5)]),
      'repeatPassword': new FormControl(null, [Validators.required, Validators.maxLength(15), Validators.minLength(5)])
    }, matchingPasswords('password', 'repeatPassword'));
  }

}
