import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';

@Component({
	selector: 'service-box',
	templateUrl: './service-box.component.html',
	styleUrls: ['./service-box.component.scss'],
})
export class ServiceBoxComponent implements OnInit {
	public opened = false;
	public user: Observable<firebase.User>;
	@HostListener('document: click', ['$event'])
	boxClose(event: Event) {
			if (!this._eref.nativeElement.contains(event.target)) {
				this.opened = false;
				}
			}

	constructor(
		private _eref: ElementRef,
		private afAuth: AuthService
	) {
		this.user = this.afAuth.authState;
	}

	signInWithTwitter() {
		this.afAuth.signInWithTwitter();
	}

	logout() {
		this.afAuth.logout();
	}

	ngOnInit() { }
}
