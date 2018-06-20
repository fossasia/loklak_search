import { Component, OnInit, Input } from '@angular/core';
import { immutableSort } from '../../utils';

@Component({
	selector: 'feed-footer',
	templateUrl: './feed-footer.component.html',
	styleUrls: ['./feed-footer.component.scss']
})

export class FeedFooterComponent implements OnInit {
	@Input() query: string;
	@Input() apiResponseTags: Array<Tag>;
	public sortedApiResponseTags: Array<Tag>;

	constructor() { }

	ngOnInit() {
		this.sortedApiResponseTags = immutableSort(this.apiResponseTags, this.compareTags);
	}

	private compareTags(tag1: Tag, tag2: Tag): number {
		if (tag1.count !== tag2.count) {
			return tag1.count - tag2.count;
		} else if (tag1.tag > tag2.tag) {
			return 1;
		} else if (tag1.tag < tag2.tag) {
			return -1;
		} else {
			return 0;
		}
	}
}

interface Tag {
	tag: string;
	count: number;
}
