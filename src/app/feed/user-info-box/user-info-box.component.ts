import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as apiAction from '../../actions/api';
import { UserApiResponse } from '../../models/api-user-response';
import { AutolinkerConfig, ConfigLinkType } from '../../shared/configrations';


@Component({
	selector: 'user-info-box',
	templateUrl: './user-info-box.component.html',
	styleUrls: ['./user-info-box.component.scss']
})
export class UserInfoBoxComponent implements OnInit, OnChanges {
	@Input() private apiResponseUser : UserApiResponse;
	@Input() private apiResponseUserFollowing : Array<UserApiResponse>;
	@Input() private apiResponseUserFollowers : Array<UserApiResponse>;
	@Input() private isUserResponseLoading : boolean;
	private readonly cardAutolinkerConfig: AutolinkerConfig = new AutolinkerConfig();

	constructor() { }

	ngOnInit() {
		this.modifyAutolinkerConfig();
	}

	ngOnChanges() {
	}

	private modifyAutolinkerConfig() {
		// hashtag and mention use the default configration strategy.
		// Links use the one-to-one map strategy using unshorten property of feedItem
		this.cardAutolinkerConfig.link.link_type = ConfigLinkType.OneToOneMap;
		this.cardAutolinkerConfig.link.link_to = {};
	}
}

