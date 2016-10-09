import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SearchService } from '../shared/services';

@Component({
	selector: 'app-feed',
	templateUrl: './feed.component.html',
	styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
	private query: string = null;
	private search_metadata: JSON = null;	// Temporarily as a JSON in future it will be a model object
	private search_results: JSON[] = null; // Temporarily as a JSON in future it will be a model object

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private searchService: SearchService
	) { }

	ngOnInit() {
		this.getQueryString();
		this.loadResults();
	}

	private getQueryString() {
		this.route.params.subscribe((params: Params) => {
				this.query = params['query'];
			});
	}

	private loadResults() {
		this.searchService.fetchQuery(this.query)
											.subscribe((fetchedResults: JSON) => {
												this.search_metadata = fetchedResults['search_metadata'];
												this.search_results = fetchedResults['statuses'];
												console.log(this.search_results);
											});
	}
}
