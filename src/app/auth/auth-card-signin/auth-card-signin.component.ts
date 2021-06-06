import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {patternForEmail, patternForPassword} from '../../shared/constants';
import {AuthService} from "../../core/services/authService/auth.service";
@Component({
  selector: 'app-auth-card-signin',
  templateUrl: './auth-card-signin.component.html',
  styleUrls: ['./auth-card-signin.component.scss'],
})
export class AuthCardSigninComponent implements OnInit {
  myForm: FormGroup = new FormGroup({
    userPassword: new FormControl(),
    userEmail: new FormControl(),
  });
  authEror = '';
  mistakeValidEmail = false;
  mistakeValidPass = false;
  constructor(public authService: AuthService) {}
  onSignip(): void {
    console.log(    patternForPassword.test(this.myForm.value.userPassword))
    console.log(this.myForm.value.userPassword)
    if (
      patternForEmail.test(this.myForm.value.userEmail) &&
      patternForPassword.test(this.myForm.value.userPassword)
    ) {

      this.authService.signin(
        this.myForm.value.userEmail,
        this.myForm.value.userPassword
      ).then(()=>
      {

      }).catch((error) => {
        this.authEror = error.message;
      });
      if (!this.authService.isLoggedIn) {
        if (!patternForEmail.test(this.myForm.value.userEmail)) {
          this.mistakeValidEmail = true;
        }
        if (!patternForPassword.test(this.myForm.value.userPassword)) {
          this.mistakeValidPass = true;
        }
      }
    }
    else{
      this.mistakeValidEmail = true;
      this.mistakeValidPass = true;
    }
  }

  chooseValueMistakeEmail(): void {
    this.mistakeValidEmail = false;
    this.authEror = '';
  }
  chooseValueMistakePass(): void {
    this.mistakeValidPass = false;
    this.authEror = '';
  }

  ngOnInit(): void {
    this.chooseValueMistakeEmail();
    this.chooseValueMistakePass();
  }
}