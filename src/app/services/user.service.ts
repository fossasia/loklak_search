import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

import { UserResponse } from '../models/api-user-response';

@Injectable()
export class UserService {
	private static readonly apiUrl: URL = new URL('https://api.loklak.org/api/user.json');
	private static minified_results = true;
	private static followers = '4';
	private static following = '4';

	constructor(
		private http: HttpClient
	) { }

	// TODO: make the searchParams as configureable model rather than this approach.
	public fetchQuery(user: string): Observable<UserResponse> {
		const screen_name = user.charAt(0).toUpperCase() + user.slice(1);
		const searchParams = new HttpParams();
		searchParams.set('screen_name', screen_name);
		searchParams.set('followers', UserService.followers);
		searchParams.set('following', UserService.following);
		searchParams.set('callback', 'JSONP_CALLBACK');
		searchParams.set('minified', UserService.minified_results.toString());

		const jsonpUrl = UserService.apiUrl.toString() + `?${searchParams.toString()}`;

		return this.http
			.jsonp<UserResponse>(jsonpUrl, 'callback')
			.pipe(
				retry(2),
				catchError(this.handleError)
			);
	}

	private handleError (error: any) {
		// In some advance version we can include a remote logging of errors
		const errMsg = (error.message) ? error.message :
									error.status ? `${error.status} - ${error.statusText}` : 'Server error';
		console.error(errMsg); // Right now we are logging to console itself
		return throwError(errMsg);
	}
}
