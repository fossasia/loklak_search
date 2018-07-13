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

	signInWithGithub() {
		return this.afAuth.auth.signInWithPopup(
			new firebase.auth.GithubAuthProvider()
		);
	}

	signInWithGoogle() {
		return this.afAuth.auth.signInWithPopup(
			new firebase.auth.GoogleAuthProvider()
		);
	}

	signInWithFacebook() {
		return this.afAuth.auth.signInWithPopup(
			new firebase.auth.FacebookAuthProvider()
		);
	}

	signUpWithCredentials(email: string, password: string) {
		return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
	}

	loginWithCredentials(email: string, password: string) {
		return this.afAuth.auth.signInWithEmailAndPassword(email, password);
	}

	logout() {
		this.afAuth.auth.signOut();
	}
}
