import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';

import { SpeechComponent } from './speech.component';
import { SpeechService } from '../services/speech.service';
import { reducers } from '../reducers';

describe('SpeechComponent', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				StoreModule.forRoot(reducers)
			],
			declarations: [ SpeechComponent ],
			providers: [ SpeechService ]
		});
	});
});
