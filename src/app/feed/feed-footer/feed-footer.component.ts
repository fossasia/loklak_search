import { Component, OnInit, Input, Output } from '@angular/core';
import { Query } from '../../models/query';

@Component({
	selector: 'feed-footer',
	templateUrl: './feed-footer.component.html',
	styleUrls: ['./feed-footer.component.scss']
})

export class FeedFooterComponent implements OnInit {
	@Input() private query: Query;
	@Input() private apiResponseTags: Array<Tag>;

	constructor() { }

	ngOnInit() {
		this.sortTags();
	}

	private sortTags() {
		this.apiResponseTags.sort((tag1, tag2) => {
			if (tag1.count !== tag2.count) {
				return tag1.count - tag2.count;
			}
			else if (tag1.tag > tag2.tag) {
				return 1;
			}
			else if (tag1.tag < tag2.tag) {
				return -1;
			}
			else {
				return 0;
			}

		});
	}
}

interface Tag {
	tag: string;
	count: number;
}
