import {Component} from '@angular/core';
import {AuthService} from './services/auth.service';
import {UsersService} from './services/users.service';
import {SlackService} from './slack.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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
              public userService: UsersService,
              private slackService: SlackService) {

  }

  login(): void {
    const test = false;
    this.authService.loginWithGoogle().then((user) => {
      if (test){
        console.log(user);
      }
    });
  }

  logout(): void {
      this.name = null;
      this.pin = null;
      this.confirmed = false;
      this.saved = false;
      this.init = false;
      this.email = null;
      this.isAdmin = false;
      this.authService.logout();
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
    const t = this.slackService.timeStamp();
    this.userService.updateIngressName(this.name, this.pin, this.email, t);
    this.saved = true;
    const msg = this.name + ' given pin: ' + this.pin + '\n- email: ' + this.email;
    const text = this.formatMsg(t, msg);
    console.log('text[' + text + ']');
    this.slackService.getMsg(text).subscribe(value => {
      console.log(value);
    });
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
    }
  }

  remove(uid, name, logout: boolean): void {
    if (confirm('Registration for ' + name + ' ALL data will be REMOVED')) {
      this.userService.deleteIngressName(uid).then(value => {
        this.pingSlack('All data for ' + name + ' deleted by ' + this.name, false);
        console.log(value);
        if (logout) {
          this.logout();
        }
      });
    }
  }

  testMessage(): void {
    let msg = prompt('Enter some test text', 'Default Test Text\n OKAY');
    msg = this.name + ' added this test message: \n - ' + msg;
    this.pingSlack(msg, true);
  }

  pingSlack(msg: string, showAlert: boolean): void {
    const text = this.formatMsg(this.slackService.timeStamp(), msg);
    console.log('TEST text[' + text + ']');
    this.slackService.getMsg(text).subscribe(value => {
      if (showAlert){
        alert(JSON.stringify(value));
      } else{
        console.log(value);
      }
    });
  }

  // utilities
  formatMsg(time: string, msg: string): string{
    return 'Time: ' + time + '\n- ' + msg;
  }

}
