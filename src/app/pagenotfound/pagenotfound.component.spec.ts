/* tslint:disable:no-unused-variable */
import { TestBed } from '@angular/core/testing';
import { PageNotFoundComponent } from './pagenotfound.component';
import { Store, StateObservable } from '@ngrx/store';

describe('Component: PageNotFound', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [
				PageNotFoundComponent
			],
			providers: [
				{ provide: Store, useValue: {} },
				{ provide: StateObservable, useValue: {} }
			]
		});
	});

	it('should create an instance', () => {
		const fixture = TestBed.createComponent(PageNotFoundComponent);
		const component = fixture.debugElement.componentInstance;
		expect(component).toBeTruthy();
	});
});
