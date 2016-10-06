/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { SearchBarComponent } from './search-bar.component';
import { FormsModule } from '@angular/forms';

describe('Component: SearchBar', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				FormsModule
			],
			declarations: [
				SearchBarComponent
			]
		});
	});

	it('should create an instance', () => {
		let fixture = TestBed.createComponent(SearchBarComponent);
		let component = fixture.debugElement.componentInstance;
		expect(component).toBeTruthy();
	});

	it('should have a query and submitted properties', () => {
		let fixture = TestBed.createComponent(SearchBarComponent);
		let component = fixture.debugElement.componentInstance;

		expect(component.query).not.toBeUndefined();
		expect(component.submitted).not.toBeUndefined();
	});

	it('should render an input element with proper label and semantics.', async(() => {
		let fixture = TestBed.createComponent(SearchBarComponent);
		fixture.detectChanges();
		let de = fixture.debugElement;
		let comp = de.componentInstance;
		let el = de.nativeElement;

		let inpEl = el.querySelector('input#search');
		let inpLabel = el.querySelector('label[for="search"]');

		expect(inpEl).toBeTruthy();
		expect(inpLabel).toBeTruthy();
		expect(inpLabel.textContent).not.toBe('');
	}));

	it('should have a query and input field', async(() => {	// Sanity Test
		let fixture = TestBed.createComponent(SearchBarComponent);
		fixture.detectChanges();
		let de = fixture.debugElement;
		let comp = de.componentInstance;
		let el = de.nativeElement;

		let inpEl: HTMLInputElement = el.querySelector('input#search');

		expect(comp.query).toBeFalsy();	// Sanity test for clean initial query term.
		expect(inpEl.value).toBe('');	// Sanity test for clean search field.
	}));

	it('should have a data-flow from model to search field', async(() => {
		let fixture = TestBed.createComponent(SearchBarComponent);
		fixture.detectChanges();
		let de = fixture.debugElement;
		let comp = de.componentInstance;
		let el = de.nativeElement;

		let inpEl: HTMLInputElement = el.querySelector('input#search');

		comp.query = 'Foobar';
		fixture.detectChanges();

		fixture.whenStable().then(() => {
			expect(inpEl.value).toBe('Foobar');
		});
	}));

	it('should have a data-flow from search field to model', async(() => {
		let fixture = TestBed.createComponent(SearchBarComponent);
		fixture.detectChanges();
		let de = fixture.debugElement;
		let comp = de.componentInstance;
		let el = de.nativeElement;

		let inpEl: HTMLInputElement = el.querySelector('input#search');
		inpEl.value = 'Foobar';

		let evt: Event = document.createEvent('Event');
		evt.initEvent('input', true, false);
		inpEl.dispatchEvent(evt);

		expect(comp.query).toBe('Foobar');
	}));
});
