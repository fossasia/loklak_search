import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'feed-header',
	templateUrl: './feed-header.component.html',
	styleUrls: ['./feed-header.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedHeaderComponent implements OnInit {
	@Input() private searchInputControl: FormControl;
	@Output() private searchEvantEmitter: EventEmitter<any> = new EventEmitter();
	private bannerImageUrl = 'assets/images/logo.png';

	constructor() { }

	ngOnInit() {
	}
}
