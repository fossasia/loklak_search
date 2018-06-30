import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './../services/auth.service';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { Location } from '@angular/common';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	public loginForm: FormGroup;
	public user: Observable<firebase.User>;
	constructor(
		private afAuth: AuthService,
		private location: Location
	) {
		this.user = this.afAuth.authState;
		this.loginForm = new FormGroup({
			email: new FormControl('', [<any>Validators.required]),
			password: new FormControl('', [<any>Validators.required])
		});
	}

	loginWithCredentials(user) {
		this.afAuth.signInWithCredentials(user.email, user.password).then(message => {
				if ( message.user ) {
					this.location.back();
				}
			})
			.catch(message => console.log(message));
	}

	ngOnInit() { }

	signInWithTwitter() {
		this.afAuth.signInWithTwitter().then(message => {
			if ( message.additionalUserInfo.username ) {
				this.location.back();
			}
		}).catch(message => console.log(message));
	}

	signInWithGithub() {
		this.afAuth.signInWithGithub().then(message => {
			if ( message.user ) {
				this.location.back();
			}
		}).catch(message => console.log(message));
	}

	signInWithGoogle() {
		this.afAuth.signInWithGoogle().then(message => {
			if ( message.user ) {
				this.location.back();
			}
		}).catch(message => console.log(message));
	}

	signInWithFacebook() {
		this.afAuth.signInWithFacebook().then(message => {
			if ( message.user ) {
				this.location.back();
			}
		}).catch(message => console.log(message));
	}

}
