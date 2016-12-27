import { Component, OnInit, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';

@Component({
	selector: 'feed-pagination',
	templateUrl: './feed-pagination.component.html',
	styleUrls: ['./feed-pagination.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedPaginationComponent implements OnInit {
	@Output() paginate: EventEmitter<any> = new EventEmitter();

	constructor() { }

	ngOnInit() { }
}
