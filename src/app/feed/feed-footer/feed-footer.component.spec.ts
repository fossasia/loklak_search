/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { FeedFooterComponent } from './feed-footer.component';
import { ShareNewsStatusService } from '../../services/share-news-status.service';

describe('Component: FeedFooter', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				ShareNewsStatusService
			]
		});
	});
	it('should create an instance', () => {
		const component = new FeedFooterComponent();
		expect(component).toBeTruthy();
	});
});
