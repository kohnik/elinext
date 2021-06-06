import { Component, OnInit} from '@angular/core';

import { patternForEmail, patternForPassword} from '../../shared/constants';
import {AuthService} from "../../core/services/authService/auth.service";

@Component({
  selector: 'app-auth-card-signup',
  templateUrl: './auth-card-signup.component.html',
  styleUrls: ['./auth-card-signup.component.scss'],
})
export class AuthCardSignupComponent implements OnInit{
  mistakeValidEmail = false;
  mistakeValidPass = false;
  authEror = '';
  constructor(public authService: AuthService) {}
  onSignup(email: string, password: string): void {
    if (patternForEmail.test(email) && patternForPassword.test(password)) {
      this.authService.signup(email, password).then(()=>
      {
      }).catch((error) => {
        this.authEror = error.message;
      });
      if (!this.authService.isLoggedIn) {
        if (!patternForEmail.test(email)) {
          this.mistakeValidEmail = true;
        }
        if (!patternForPassword.test(password)) {
          this.mistakeValidPass = true;
        }
      }
    }
    else
    {
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
