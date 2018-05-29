import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';

import { SpeechComponent } from './speech.component';
import { SpeechService } from '../services/speech.service';
import { reducers } from '../reducers';

describe('SpeechComponent', () => {
	let component: SpeechComponent;
	let fixture: ComponentFixture<SpeechComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				StoreModule.forRoot(reducers)
			],
			declarations: [ SpeechComponent ],
			providers: [ SpeechService ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SpeechComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});
});
