import { Component, OnInit, OnChanges, Input, Output } from '@angular/core';
import { ApiResponseResult } from '../../shared/classes';

@Component({
	selector: 'feed-footer',
	templateUrl: './feed-footer.component.html',
	styleUrls: ['./feed-footer.component.scss']
})

export class FeedFooterComponent implements OnInit, OnChanges {
	@Input() private query: string;
	@Input() private apiResponseResults: Array<ApiResponseResult> = new Array<ApiResponseResult>();
	private tagArray: Array<Tag> = new Array<Tag>();

	constructor() { }

	ngOnChanges() {
		this.generateTags();
	}

	ngOnInit() { }

	private generateTags() {
		let tagArrayShards = this.apiResponseResults.map((a) => (a.hashtags));
		let tagShards = [].concat(...tagArrayShards);
		this.tagArray = Array.from(new Set(tagShards)).map(
			(x) => {
				return {
					tag: x,
					count: tagShards.filter(y => y === x).length,
					queryParams: { query: `#${x}` }
				};
		}).sort((a, b) => (b.count - a.count));
	}
}

class Tag {
	constructor(
		public tag: string,
		public count: number,
		public queryParams: any = null,
	) { }
}
