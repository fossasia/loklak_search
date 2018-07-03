import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { SearchServiceConfig } from '.';
import { ApiResponse } from '../models/api-response';

@Injectable()
export class SearchService {

	constructor(
		private http: HttpClient
	) { }

	public fetchQuery(query: string, config: SearchServiceConfig): Observable<ApiResponse> {
		let jsonpUrl = 'https://api.loklak.org/api/search.json' +
							'?q=' + query +
							'&minified=' + 'true' +
							'&source=' + config.source +
							'&maximumRecords=' + config.maximumRecords.toString() +
							'&timezoneOffset=' + config.getTimezoneOffset() +
							'&startRecord=' + config.startRecord.toString();

		if (config.getFilterString()) {
			jsonpUrl += '&filter=' + config.getFilterString();
		}

		return this.http
			.jsonp<ApiResponse>(jsonpUrl, 'callback')
			.pipe(
				retry(2),
				catchError(this.handleError)
			);
	}

	private handleError(error: any) {
		// In some advance version we can include a remote logging of errors
		const errMsg = (error.message) ? error.message :
			error.status ? `${error.status} - ${error.statusText}` : 'Server error';
		console.error(errMsg); // Right now we are logging to console itself
		return throwError(errMsg);
	}
}
