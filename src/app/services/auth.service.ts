import {Injectable} from '@angular/core';

import {AngularFireAuth} from '@angular/fire/auth';
import firebase from 'firebase';
import {Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  static RES_USER = 'res_user';

  adminList = ['1KYU0BdE0rXTly5Y5KZslOvxpow2'];
  user: firebase.User;
  uuid: string;
  err: boolean;
  admin = false;
  // validated = false;
  private subscription: Subscription;

  constructor(public  afAuth: AngularFireAuth) {
    this.subscription = this.afAuth.authState.subscribe(user => {
      this.err = false;
      if (user) {
        this.user = user;
        this.uuid = user.uid;
        // localStorage.setItem(AuthService.RES_USER, JSON.stringify(this.user));
      } else {
        // localStorage.setItem(AuthService.RES_USER, null);
      }
    });
  }

  get hasError(): boolean {
    return this.err;
  }

  set hasError(val: boolean) {
    this.err = val;
  }

  // get savedUser(): any {
  //  return JSON.parse(localStorage.getItem(AuthService.RES_USER));
  // }

  get isLoggedIn(): boolean {
    // const user = JSON.parse(localStorage.getItem(AuthService.RES_USER));
    return this.user !== null;
  }

  async isAdmin(): Promise <boolean>{
    this.afAuth.currentUser.then((user) => {
      this.adminList.forEach((value => {
        if (value === user.uid){ this.admin = true; }
      }));
    });
    return this.admin;
  }

  async getFirebaseUser(): Promise<firebase.User> {
    this.afAuth.currentUser.then((user) => {
      this.adminList.forEach((value => {
        if (value === user.uid){ this.admin = true; }
      }));
      return user;
    });
    return null;
  }

  async login(email: string, password: string): Promise<any> {
    await this.afAuth.signInWithEmailAndPassword(email, password);
  }

  async logout(): Promise<any> {
    await this.afAuth.signOut().then(() => {
      // localStorage.removeItem(AuthService.RES_USER);
    });
  }

  async loginWithGoogle(): Promise<any> {
    this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((user) => {
      this.err = false;
      if (user) {
        this.user = user.user;
        this.uuid = user.user.uid;
        // localStorage.setItem(AuthService.RES_USER, JSON.stringify(this.user));
      } // else {
        // localStorage.setItem(AuthService.RES_USER, null);
      // }
    });
  }
}
