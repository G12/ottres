import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {DatePipe} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SlackService {

  constructor(private http: HttpClient,
              public datepipe: DatePipe) { }
  timeStamp(): string {
    const current = new Date();
    return this.datepipe.transform(current, 'medium');
  }

  getMsg(msg: string): Observable<any> {
    // const slackURL = 'https://geopad.ca/ottres/slack/webhook.php';
    const slackURL = 'https://geopad.ca/server/webhook.php';
    const params = new HttpParams({fromString: 'msg=' + msg});
    return this.http.request('GET', slackURL, {responseType: 'json', params});
  }
}
