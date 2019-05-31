import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import * as firebase from 'firebase/app';
import { User } from './user';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AngularFireService {
  user$: Observable<User>;

  constructor(public afAuth: AngularFireAuth,
              public afs: AngularFirestore) {
    this.user$ = afAuth.authState.pipe(switchMap(user => {
      if (user) {
        return this.afs.doc<User>('users/${user.uid}').valueChanges();
      } else {
        of(null);
      }
    }));
  }

  loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    this.afAuth.auth.signInWithPopup(provider).then((credential) => {
      this.updateUser(credential.user);
    });
  }

  updateUser(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc('users/${user.uid}');
    const data: User = {
      uid: user.uid,
      displayName : user.displayName,
      photoURL: user.photoURL,
      email: user.email,
      roles: {
        subscriber: true,
        admin: false
      }
    };
    return userRef.set(data, {merge: true});
  }

  logOut() {
    this.afAuth.auth.signOut();
  }
}
