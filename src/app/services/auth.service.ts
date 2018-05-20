import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {

	public authState: Observable<firebase.User>;

	constructor(private afAuth: AngularFireAuth, private af: AngularFireDatabase) {
		this.authState = this.afAuth.authState;
	}

	signInWithTwitter() {
		return this.afAuth.auth.signInWithPopup(
			new firebase.auth.TwitterAuthProvider()
		)
	}

	logout() {
		this.afAuth.auth.signOut();
	}
}
