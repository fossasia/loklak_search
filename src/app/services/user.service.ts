import { Injectable } from '@angular/core';
import { Jsonp, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { UserResponse } from '../models/api-user-response';

@Injectable()
export class UserService {
	private static readonly apiUrl: URL = new URL('https://api.loklak.org/api/user.json');
	private static minified_results = true;

	constructor(
		private jsonp: Jsonp
	) { }

	// TODO: make the searchParams as configureable model rather than this approach.
	public fetchQuery(user: string, follow_count: number): Observable<UserResponse> {
		const screen_name = user.charAt(0).toUpperCase() + user.slice(1);
		const searchParams = new URLSearchParams();
		searchParams.set('screen_name', screen_name);
		searchParams.set('followers', follow_count.toString());
		searchParams.set('following', follow_count.toString());
		searchParams.set('callback', 'JSONP_CALLBACK');
		searchParams.set('minified', UserService.minified_results.toString());
		return this.jsonp.get(UserService.apiUrl.toString(), {search : searchParams})
								.map(this.extractData)
								.catch(this.handleError);

	}

	private extractData(res: Response): UserResponse {
		try {
			return <UserResponse>res.json();
		} catch (error) {
			console.error(error);
		}
	}

	private handleError (error: any) {
		// In some advance version we can include a remote logging of errors
		const errMsg = (error.message) ? error.message :
									error.status ? `${error.status} - ${error.statusText}` : 'Server error';
		console.error(errMsg); // Right now we are logging to console itself
		return Observable.throw(errMsg);
	}
}
