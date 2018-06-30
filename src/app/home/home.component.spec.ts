/* tslint:disable:no-unused-variable */
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Title } from '@angular/platform-browser';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import * as fromRoot from '../reducers';
import { HomeComponent } from './home.component';
import { AuthService } from '../services/auth.service';
import { RouterStub } from '../../testing';
import { SpeechService } from '../services/speech.service';
import { SpeechComponent } from '../speech/speech.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { environment } from '../../environments/environment';

@Component({
	selector: 'app-footer',
	template: ''
})
class FooterStubComponent { }

@Component({
	selector: 'app-lazy-img',
	template: ''
})
class LazyImgStubComponent {
	@Input() src: string;
	@Input() width: number;
	@Input() height: number;
	@Input() alt: string;
	@Input() showError = true;
	@Output() load: EventEmitter<boolean> = new EventEmitter<boolean>();
}

@Component({
	selector: 'service-box',
	template: ''
})
class ServiceBoxStubComponent {
}

describe('Component: Home', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				ReactiveFormsModule,
				StoreModule.forRoot(fromRoot.reducers),
				AngularFireModule.initializeApp(environment.firebase, 'loklak-search')
			],
			declarations: [
				HomeComponent,
				FooterStubComponent,
				LazyImgStubComponent,
				ServiceBoxStubComponent,
				SpeechComponent
			],
			providers: [
				{ provide: Router, useClass: RouterStub },
				{ provide: Title, useClass: Title },
				{ provide: SpeechService, useClass: SpeechService },
				{ provide: AuthService, useClass: AuthService },
				{ provide: AngularFireAuth, useClass: AngularFireAuth }
			]
		});
	});

	it('should create an instance', async(() => {
		const fixture = TestBed.createComponent(HomeComponent);
		const component = fixture.debugElement.componentInstance;
		expect(component).toBeTruthy();
	}));
});
