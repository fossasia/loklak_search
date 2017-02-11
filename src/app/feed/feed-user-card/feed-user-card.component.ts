import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { UserApiResponse } from '../../models/api-user-response';
import { AutolinkerConfig, ConfigLinkType } from '../../shared/configrations';

@Component({
	selector: 'feed-user-card',
	templateUrl: './feed-user-card.component.html',
	styleUrls: ['./feed-user-card.component.scss'],
})
export class FeedUserCardComponent implements OnInit {
	@Input() private feedItem: UserApiResponse;
	@Input() private feedIndex: number;
	private readonly cardAutolinkerConfig: AutolinkerConfig = new AutolinkerConfig();

	constructor() { }

	ngOnInit() {
		this.modifyAutolinkerConfig();
	}

	private modifyAutolinkerConfig() {
		// hashtag and mention use the default configration strategy.
		// Links use the one-to-one map strategy using unshorten property of feedItem
		this.cardAutolinkerConfig.link.link_type = ConfigLinkType.OneToOneMap;
		this.cardAutolinkerConfig.link.link_to = {};
	}

}
