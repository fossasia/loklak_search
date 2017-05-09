import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as apiAction from '../../actions/api';
import { UserApiResponse } from '../../models/api-user-response';


@Component({
	selector: 'user-info-box',
	templateUrl: './user-info-box.component.html',
	styleUrls: ['./user-info-box.component.scss']
})
export class UserInfoBoxComponent implements OnInit {
	@Input() apiResponseUser: UserApiResponse;
	@Input() apiResponseUserFollowing: Array<UserApiResponse>;
	@Input() apiResponseUserFollowers: Array<UserApiResponse>;
	@Input() isUserResponseLoading: boolean;

	constructor() { }

	ngOnInit() {
	}
}
