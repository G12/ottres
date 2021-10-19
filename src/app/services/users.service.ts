import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {AuthService} from './auth.service';
import {ResNameData} from '../project.data';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  ingressName = '';
  ingressNamesDoc: AngularFirestoreDocument;
  allResNames: ResNameData[];

  constructor(private firestore: AngularFirestore,
              private authService: AuthService) {
    this.ingressNamesDoc = this.getUserDocs().subscribe(dat => {
      this.allResNames = dat.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as string[];
      });
      // console.log(this.allResNames);
    });
  }

  getUserDocs(): any{
    return this.firestore.collection('res_names').snapshotChanges();
  }

  updateIngressName(name: string, pin: string, email: string, time: string): void {
    this.authService.afAuth.currentUser.then(value => {
      const userUid = value.uid;
      const resNameData: ResNameData = {userUid, name, pin, email, time};
      this.firestore.doc('res_names/' + userUid).set(resNameData).catch((reason) => {
        console.log(reason);
      });
    });
  }

  deleteIngressName(uid: string): Promise<any> {
    return this.firestore.doc('res_names/' + uid).delete();
  }
}
