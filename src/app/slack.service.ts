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

    // TEST using curl
    // tslint:disable-next-line:max-line-length
    // $ curl -X POST -H 'Content-type: application/json' --data '{"text":"Another test!"}' https://hooks.slack.com/services/T02J1N6JWTD/B02HPS

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

/*
  postMessage(msg: string): Observable<any> {

    // TEST using curl
    // tslint:disable-next-line:max-line-length
    // $ curl -X POST -H 'Content-type: application/json' --data '{"text":"Another test!"}' https://hooks.slack.com/services/T02J1N6JWTD/B02HPS

    const slackURL = environment.PingPongURL;
    const params = {
      text: 'Danny Torrence left a 1 star review for your property.',
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: 'Danny Torrence left the following review for your property:'
          }
        },
        {
          type: 'section',
          block_id: 'section567',
          text: {
            type: 'mrkdwn',
            text: '<https://example.com|Overlook Hotel> \n :star: \n Doors had too many axe holes, guest in room 237 was far too rowdy, whole place felt stuck in the 1920s.'
          },
          accessory: {
            type: 'image',
            image_url: 'https://is5-ssl.mzstatic.com/image/thumb/Purple3/v4/d3/72/5c/d3725c8f-c642-5d69-1904-aa36e4297885/source/256x256bb.jpg',
            alt_text: 'Haunted hotel image'
          }
        },
        {
          type: 'section',
          block_id: 'section789',
          fields: [
            {
              type: 'mrkdwn',
              text: '*Average Rating*\n1.0'
            }
          ]
        }
      ]
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // the HTTP post request
    return  this.http.post(slackURL, params, );
  }

 */
