import { Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsComponent } from './settings.component';
import { Store, StateObservable } from '@ngrx/store';

@Component({
	selector: 'app-navbar',
	template: ''
})
class AppNavbarStubComponent { }

@Component({
	selector: 'app-footer',
	template: ''
})
class AppFooterStubComponent { }

describe('SettingsComponent', () => {
	let component: SettingsComponent;
	let fixture: ComponentFixture<SettingsComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule
			],
			declarations: [
				SettingsComponent,
				AppNavbarStubComponent,
				AppFooterStubComponent
			],
			providers: [
				{ provide: Store, useValue: {} },
				{ provide: StateObservable, useValue: {} }
			]
		});
	});
	it('should have an app-footer component', async(() => {
	const compiled = fixture.debugElement.nativeElement;

		expect(compiled.querySelector('app-footer')).toBeTruthy();
	}));

	it('should have an app-navbar component', async(() => {
	const compiled = fixture.debugElement.nativeElement;

		expect(compiled.querySelector('app-navbar')).toBeTruthy();
	}));
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ SettingsComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SettingsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
