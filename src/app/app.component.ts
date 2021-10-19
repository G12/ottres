import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';
import {UsersService} from './services/users.service';
import {SlackService} from './slack.service';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'ottres';
  name: string;
  email: string;
  pin: string;
  confirmed = false;
  saved = false;
  init = false;
  isAdmin = false;

  // adapted from: https://stackoverflow.com/questions/6248666/how-to-generate-short-uid-like-ax4j9z-in-js
  static generateUID(): string {
    // I generate the UID from two parts here
    // to ensure the random number provide enough bits.
    // tslint:disable-next-line:no-bitwise
    const firstPart = (Math.random() * 46656) | 0;
    // tslint:disable-next-line:no-bitwise
    const secondPart = (Math.random() * 46656) | 0;
    const first = ('000' + firstPart.toString(36)).slice(-3);
    const second = ('000' + secondPart.toString(36)).slice(-3);
    return (first + second).toUpperCase();
  }

  constructor(public authService: AuthService,
              private userService: UsersService,
              private slack: SlackService) {

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  login(): void {
    this.authService.loginWithGoogle().then((user) => {
    });
  }

  logout(): void {
    // if (confirm('Log Out?')) {
      this.name = null;
      this.pin = null;
      this.confirmed = false;
      this.saved = false;
      this.init = false;
      this.email = null;
      this.isAdmin = false;
      this.authService.logout();
    // }
  }

  enterIngressName(): void {
    const def = this.name ? this.name : '';
    const name = prompt('Please enter Name', def);
    if (name && name !== '') {
      this.name = name;
      this.pin = AppComponent.generateUID();
    }
  }

  confirm(): void {
    this.confirmed = true;
  }

  save(): void {
    this.userService.updateIngressName(this.name, this.pin, this.email);
    this.saved = true;
  }

  testUid(): void {
    this.init = true;
    this.email = this.authService.user.email;
    if (this.authService.uuid === '1KYU0BdE0rXTly5Y5KZslOvxpow2' ||
        this.authService.uuid === 'UZOPYmGRqphZyNYT6B9FARX2w223') {
      this.isAdmin = true;
    }
    const obj = this.userService.allResNames.find(
      n => n.userUid === this.authService.uuid);
    if (obj) {
      this.name = obj.name;
      this.pin = obj.pin;
      this.confirmed = true;
      this.saved = true;
      // alert('Registered already: ' + this.name + ' pin: ' + this.pin);
    }
  }

  remove(uid, name, logout: boolean): void {
    if (confirm('Registration for ' + name + ' ALL data will be REMOVED')) {
      this.userService.deleteIngressName(uid).then(value => {
        console.log(value);
        if (logout) {
          this.logout();
        }
      });
    }
  }

  pingSlack(): void {
    this.slack.getMsg('G12mo email: twiegand@rogers.com pin: HGF67HJK').subscribe(value => {
      console.log(value);
    });
  }
}
