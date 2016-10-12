/* tslint:disable:no-unused-variable */

import { Component, Input } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { Route } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { RouterStub } from '../../testing';
import { FeedComponent } from './feed.component';
import { SearchService } from '../shared/services';

class SearchServiceStub { }

@Component({
	selector: 'feed-header',
	template: ''
})
class FeedHeaderStub {
	@Input() private query;
}

describe('Component: Feed', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule
			],
			declarations: [
				FeedComponent,
				FeedHeaderStub
			],
			providers: [
				{ provide: SearchService, useClass: SearchServiceStub }
			]
		});
	});

	it('should create an instance', () => {
		let fixture = TestBed.createComponent(FeedComponent);
		let component = fixture.debugElement.componentInstance;
		expect(component).toBeTruthy();
	});
});
