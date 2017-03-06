import { Component, OnInit, Input } from '@angular/core';
import { Query } from '../../models/query';

@Component({
	selector: 'feed-not-found',
	templateUrl: './feed-not-found.component.html',
	styleUrls: ['./feed-not-found.component.scss']
})
export class FeedNotFoundComponent implements OnInit {
	@Input() private query: Query;

	constructor() { }

	ngOnInit() { }

}
