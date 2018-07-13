import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './../services/auth.service';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material';

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
		private location: Location,
		private snackBar: MatSnackBar
	) {
		this.user = this.afAuth.authState;
		this.loginForm = new FormGroup({
			email: new FormControl('', [<any>Validators.required]),
			password: new FormControl('', [<any>Validators.required])
		});
	}

	signUpWithCredentials(user) {
		this.afAuth.signUpWithCredentials(user.email, user.password).then(message => {
				if ( message.user ) {
					this.location.back();
				}
			})
			.catch(message => {
				if ( message.message === 'The email address is badly formatted.' ) {
					this.openSnackBar('Invalid Email!');
				}
				else if ( message.message === 'The email address is already in use by another account.' ) {
					this.openSnackBar('Associated Email Already Exists!');
				}
				else if ( message.message === 'The password must be 6 characters long or more.' ) {
					this.openSnackBar('Password should be 6 chars or more');
				}
				else if ( message.message === 'The password is invalid or the user does not have a password.' ) {
					this.openSnackBar('Invalid Password!');
				}
				else if ( message.message === 'We have blocked all requests from this device due to unusual activity. Try again later.' ) {
					this.openSnackBar('Temporaily Blocked!');
				}
				else {
					this.openSnackBar('Please try again!');
				}
			});
	}

	loginWithCredentials(user) {
		this.afAuth.loginWithCredentials(user.email, user.password).then(message => {
			if ( message.user ) {
				this.location.back();
			}
		})
		.catch(message => {
			if ( message.message === 'The email address is badly formatted.' ) {
				this.openSnackBar('Invalid Email!');
			}
			else if ( message.message === 'The password is invalid or the user does not have a password.' ) {
				this.openSnackBar('Invalid Password!');
			}
			else if ( message.message === 'We have blocked all requests from this device due to unusual activity. Try again later.' ) {
				this.openSnackBar('Temporaily Blocked!');
			}
			else {
				this.openSnackBar('Please try again!');
			}
		});
	}

	ngOnInit() { }

	signInWithTwitter() {
		this.afAuth.signInWithTwitter().then(message => {
			if ( message.additionalUserInfo.username ) {
				this.location.back();
			}
		}).catch(message => this.openSnackBar('Please try again!'));
	}

	signInWithGithub() {
		this.afAuth.signInWithGithub().then(message => {
			if ( message.user ) {
				this.location.back();
			}
		}).catch(message => {
			if ( message.message === 'An account already exists with the same email address but different sign-in credentials. '
				+ 'Sign in using a provider associated with this email address.') {
					this.openSnackBar('Associated Email Already Exists!');
			}
			else {
				this.openSnackBar('Please try again!');
			}
		});
	}

	signInWithGoogle() {
		this.afAuth.signInWithGoogle().then(message => {
			if ( message.user ) {
				this.location.back();
			}
		}).catch(message => {
			if ( message.message === 'An account already exists with the same email address but different sign-in credentials. '
				+ 'Sign in using a provider associated with this email address.') {
					this.openSnackBar('Associated Email Already Exists!');
			}
			else {
				this.openSnackBar('Please try again!');
			}
		});
	}

	signInWithFacebook() {
		this.afAuth.signInWithFacebook().then(message => {
			if ( message.user ) {
				this.location.back();
			}
		}).catch(message => {
			if ( message.message === 'An account already exists with the same email address but different sign-in credentials. '
				+ 'Sign in using a provider associated with this email address.') {
					this.openSnackBar('Associated Email Already Exists!');
			}
			else {
				this.openSnackBar('Please try again!');
			}
		});
	}

	openSnackBar(message: string) {
		this.snackBar.open('WARNING', message, {
			duration: 1500,
		});
	}

}
