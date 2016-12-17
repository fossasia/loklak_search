import { Component, OnInit, Input, Output } from '@angular/core';
import { Query } from '../../models/query';

@Component({
	selector: 'feed-footer',
	templateUrl: './feed-footer.component.html',
	styleUrls: ['./feed-footer.component.scss']
})

export class FeedFooterComponent implements OnInit {
	@Input() private query: Query;
	@Input() private apiResponseTags: Array<Tag> = new Array<Tag>();

	constructor() { }

	ngOnInit() { }
}

interface Tag {
	tag: string;
	count: number;
}
