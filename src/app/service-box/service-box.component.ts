import { Component, OnInit, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { AuthService } from '../services/auth.service';

@Component({
	selector: 'service-box',
	templateUrl: './service-box.component.html',
	styleUrls: ['./service-box.component.scss'],
	host: {
		'(document:click)': 'onClick($event)'
	}
})
export class ServiceBoxComponent implements OnInit {
	
	private user: Observable<firebase.User>;
	public opened = false;

	constructor(private _eref: ElementRef,
		private afAuth: AuthService) {
			this.user = this.afAuth.authState;
	}

	signInWithTwitter() {
		this.afAuth.signInWithTwitter();
	}

	logout() {
		this.afAuth.logout();
	}

	onClick(event) {
		if (!this._eref.nativeElement.contains(event.target)) {
			this.opened = false;
		}
	}

	ngOnInit() { }
}
