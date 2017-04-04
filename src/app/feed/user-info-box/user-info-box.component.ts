import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as apiAction from '../../actions/api';
import { UserApiResponse } from '../../models/api-user-response';


@Component({
	selector: 'user-info-box',
	templateUrl: './user-info-box.component.html',
	styleUrls: ['./user-info-box.component.scss']
})
export class UserInfoBoxComponent implements OnInit, OnChanges {
	@Input() private apiResponseUser: UserApiResponse;
	@Input() private apiResponseUserFollowing: Array<UserApiResponse>;
	@Input() private apiResponseUserFollowers: Array<UserApiResponse>;
	@Input() private isUserResponseLoading: boolean;

	constructor() { }

	ngOnInit() {
	}

	ngOnChanges() {
	}
}

