import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SlackService {

  constructor(private http: HttpClient) { }

  postMessage(msg: string): Observable<any> {

    const slackURL = 'https://geopad.ca/ottres/slack/webhook.php';
    const params = {
      text: 'G12mo email: twiegand@rogers.com pin A7G45BQR',
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // the HTTP post request
    return  this.http.post(slackURL, params, );
  }

  getMsg(msg: string): Observable<any> {
    const slackURL = 'https://geopad.ca/ottres/slack/webhook.php';
    // return this.http.request('GET', slackURL + '?' + 'msg=term', {responseType: 'json'});
    const params = new HttpParams({fromString: 'msg=' + msg});
    return this.http.request('GET', slackURL, {responseType: 'json', params});
  }
}
