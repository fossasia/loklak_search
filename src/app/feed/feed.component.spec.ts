/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { Route } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { RouterStub } from '../../testing';
import { FeedComponent } from './feed.component';
import { SearchService } from '../shared/services';

class SearchServiceStub { }

describe('Component: Feed', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule
			],
			declarations: [
				FeedComponent,
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
