import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public googleProvider = new firebase.auth.GoogleAuthProvider();
  public isLoggedIn = false;
  public displaySignInOrOn = false;
  public currentUserEmailForReq!: string;

  constructor(public firebaseAuth: AngularFireAuth, public router: Router) {}

  signup(email: string, password: string): Promise<void> {
    return this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then((rez) => {
        this.isLoggedIn = true;
        this.router.navigate(['search']);
      });
  }

  signin(email: string, password: string): Promise<void> {
    return this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then((rez: any) => {
        this.isLoggedIn = true;
        this.router.navigate(['search']);
      });
  }

  signGoogle(): Promise<void> {
    return this.authLogin(this.googleProvider);
  }

  authLogin(provider: any): Promise<void> {
    return this.firebaseAuth.signInWithPopup(provider).then(() => {
      this.isLoggedIn = true;
      this.router.navigate(['search']);
    });
  }

  logout(): void {
    this.firebaseAuth
      .signOut()
      .then(() => {
        this.router.navigate(['']);
      })
      .then(() => {
        this.isLoggedIn = false;
      });
  }

  checkAuth(): Observable<firebase.User | null> {
    return this.firebaseAuth.authState.pipe(
      map((req) => {
        this.currentUserEmailForReq = req?.email?.replace('.', '_') || '';
        return req;
      })
    );
  }
}
