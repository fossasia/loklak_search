import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'feed-header',
	templateUrl: './feed-header.component.html',
	styleUrls: ['./feed-header.component.scss']
})
export class FeedHeaderComponent implements OnInit {
	@Input() private query: string = null;
	@Output() private queryEvent: EventEmitter<any> = new EventEmitter();
	private bannerImageUrl = 'assets/images/loklak_banner_252x45.png';

	constructor() { }

	ngOnInit() {
	}

	private handleQueryRequest() {
		if (this.query) {
			this.queryEvent.emit({ query : this.query });
		}
	}
}
