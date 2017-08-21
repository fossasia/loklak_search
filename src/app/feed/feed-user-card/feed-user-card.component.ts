import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserApiResponse } from '../../models/api-user-response';

@Component({
	selector: 'feed-user-card',
	templateUrl: './feed-user-card.component.html',
	styleUrls: ['./feed-user-card.component.scss'],
})
export class FeedUserCardComponent implements OnInit {
	@Input() feedItem: UserApiResponse;
	@Input() feedIndex: number;

	constructor() { }

	ngOnInit() {
	}
}
