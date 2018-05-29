/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SpeechComponent } from './speech/speech.component';
import { StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { SpeechService } from './services/speech.service';

@Component({
	selector: 'router-outlet',
	template: ''
})
export class RouterOutletStubComponent { }

describe('App: LoklakSearch', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				StoreModule.forRoot({}),
				RouterModule
			],
			declarations: [
				AppComponent,
				RouterOutletStubComponent,
				SpeechComponent
			],
			providers: [ SpeechService ]
		});
	});
});
