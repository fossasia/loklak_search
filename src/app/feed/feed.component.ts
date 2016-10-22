import { Component, OnInit, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SearchService } from '../shared/services';
import { ApiResponse, ApiResponseMetadata, ApiResponseResult } from '../shared/classes';

@Component({
	selector: 'app-feed',
	templateUrl: './feed.component.html',
	styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
	private query: string = null;
	private apiResponse: ApiResponse = new ApiResponse();
	private apiResponseMetadata: ApiResponseMetadata = new ApiResponseMetadata();
	private apiResponseResults: Array<ApiResponseResult> = new Array<ApiResponseResult>();

	private resultsLoaded: boolean = false;
	private noResultsFound: boolean = false;
	private loading: boolean = false;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private location: Location,
		private searchService: SearchService,
		private elementRef: ElementRef
	) { }

	ngOnInit() {
		this.focusTextbox();
		this.getQueryString();
		if (this.query) {	// Only load the results if query is truthy.
			this.loadResults();
		}
	}

	private focusTextbox() {
		this.elementRef.nativeElement.querySelector('feed-header input#search').focus();
	}

	private getQueryString() {
		this.route.queryParams.subscribe((params: Params) => {
				this.query = params['query'];
			});
	}

	private loadResults() {
		this.loading = true;
		this.searchService.fetchQuery(this.query)
											.subscribe((fetchedResults: ApiResponse) => {
												this.apiResponse = fetchedResults;
												this.loading = false;
												this.apiResponseMetadata = this.apiResponse.search_metadata;
												this.apiResponseResults = this.apiResponse.statuses;

												if (this.apiResponseResults.length) {
													this.resultsLoaded = true;
													this.noResultsFound = false;
												} else {
													this.resultsLoaded = false;
													this.noResultsFound = true;
												}
											});
	}

	private handleQueryRequest(event: any) {
		if (this.query !== event.query) {
			this.query = event.query;
			this.loadResults();
			this.location.go('/search', `query=${this.query}`);
		}
	}
}
