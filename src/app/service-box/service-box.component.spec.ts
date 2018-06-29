import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule, MatButtonModule } from '@angular/material';
import { ServiceBoxComponent } from './service-box.component';
import { AuthService } from '../services/auth.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { environment } from '../../environments/environment';

describe('ServiceBoxComponent', () => {
	let component: ServiceBoxComponent;
	let fixture: ComponentFixture<ServiceBoxComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				AngularFireModule.initializeApp(environment.firebase, 'loklak-search'),
				MatButtonModule,
				MatIconModule
			],
			declarations: [ ServiceBoxComponent ],
			providers: [
				AuthService,
				AngularFireAuth
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ServiceBoxComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should be created', () => {
		expect(component).toBeTruthy();
	});
});
