import { TestBed, inject } from '@angular/core/testing';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

describe('AuthService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				AngularFireModule.initializeApp(environment.firebase, 'loklak-search')
			],
			providers: [
				AuthService,
				AngularFireAuth
			]
		});
	});

	it('should be created', inject([AuthService], (service: AuthService) => {
			expect(service).toBeTruthy();
	}));
});
