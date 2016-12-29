/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FeedPaginationComponent } from './feed-pagination.component';

describe('FeedPaginationComponent', () => {
	let component: FeedPaginationComponent;
	let fixture: ComponentFixture<FeedPaginationComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [FeedPaginationComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(FeedPaginationComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
