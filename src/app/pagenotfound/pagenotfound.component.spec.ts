/* tslint:disable:no-unused-variable */
import { Title } from '@angular/platform-browser';
import { TestBed, async } from '@angular/core/testing';
import { PageNotFoundComponent } from './pagenotfound.component';

describe('Component: PageNotFound', () => {
	let termsTitle: Title;
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [
				PageNotFoundComponent
			],
			providers: [{ provide: Title, useClass: Title }]
		});
	});

	it('should create an instance', () => {
		const fixture = TestBed.createComponent(PageNotFoundComponent);
		const component = fixture.debugElement.componentInstance;
		expect(component).toBeTruthy();
	});

	it('should have a title 404 Lokalak Search - Page Not Found', () => {
		const fixture = TestBed.createComponent(PageNotFoundComponent);
		fixture.detectChanges();
		const component = fixture.debugElement.componentInstance;
		termsTitle = TestBed.get(Title);
		expect(termsTitle.getTitle()).toBe('404 Lokalak Search - Page Not Found');
	});
});
