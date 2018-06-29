import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {

	public authState: Observable<firebase.User>;

	constructor( private afAuth: AngularFireAuth ) {
		this.authState = this.afAuth.authState;
	}

	signInWithTwitter() {
		return this.afAuth.auth.signInWithPopup(
			new firebase.auth.TwitterAuthProvider()
		);
	}

	logout() {
		this.afAuth.auth.signOut();
	}
}
