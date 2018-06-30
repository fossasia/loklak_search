import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import {
	MatButtonToggleModule
} from '@angular/material';
import { AuthService } from './../services/auth.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { environment } from '../../environments/environment';
import { Location, LocationStrategy, PathLocationStrategy, APP_BASE_HREF } from '@angular/common';

describe('LoginComponent', () => {
	let component: LoginComponent;
	let fixture: ComponentFixture<LoginComponent>;

	beforeEach(async(() => {
	TestBed.configureTestingModule({
		imports: [
			FormsModule,
			ReactiveFormsModule,
			MatButtonToggleModule,
			AngularFireModule.initializeApp(environment.firebase, 'loklak-search')
		],
		declarations: [ LoginComponent ],
		providers: [
			AuthService,
			AngularFireAuth,
			Location,
			{ provide: LocationStrategy, useClass: PathLocationStrategy },
			{ provide: APP_BASE_HREF, useValue: '/login'}
		]
	})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(LoginComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
