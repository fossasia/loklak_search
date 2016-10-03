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

	it('should have a searchModel and submitted properties', () => {
		let fixture = TestBed.createComponent(SearchBarComponent);
		let component = fixture.debugElement.componentInstance;

		expect(component.searchModel).not.toBeUndefined();
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
});
