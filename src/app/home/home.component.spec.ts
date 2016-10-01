/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { HomeComponent } from './home.component';

describe('Component: Home', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [
				HomeComponent
			],
		});
	});

	it('should create an instance', () => {
		let fixture = TestBed.createComponent(HomeComponent);
		let component = fixture.debugElement.componentInstance;
		expect(component).toBeTruthy();
	});

	it('should have a header as Loklak Search!', () => {
		let fixture = TestBed.createComponent(HomeComponent);
		let component = fixture.debugElement.componentInstance;
		expect(component.header).toBe('Loklak Search!');
	});

	it('should render header in a h1 tag', async(() => {
		let fixture = TestBed.createComponent(HomeComponent);
		fixture.detectChanges();
		let compiled = fixture.debugElement.nativeElement;
		expect(compiled.querySelector('h1').textContent).toBe('Loklak Search!');
	}));
});
