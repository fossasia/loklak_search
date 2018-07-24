import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { defaultUrlConfig } from '../shared/url-config';
import { UserResponse } from '../models/api-user-response';

@Injectable()
export class UserService {

	public minified_results = true;
	public followers = '4';
	public following = '4';

	constructor(
		private http: HttpClient
	) { }

	// TODO: make the searchParams as configureable model rather than this approach.
	public fetchQuery(user: string): Observable<UserResponse> {
		const screen_name = user.charAt(0).toUpperCase() + user.slice(1);

		const jsonpUrl = defaultUrlConfig.loklak.apiServer + '/api/user.json' +
							'?screen_name=' + screen_name +
							'&followers=' + this.followers +
							'&following=' + this.following +
							'&minified=' + this.minified_results.toString();

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
