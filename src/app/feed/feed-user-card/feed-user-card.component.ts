import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AutolinkerConfig, ConfigLinkType } from '../../shared/configrations';

@Component({
	selector: 'feed-user-card',
	templateUrl: './feed-user-card.component.html',
	styleUrls: ['./feed-user-card.component.scss'],
})
export class FeedCardComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
