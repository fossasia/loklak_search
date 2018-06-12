import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


import { SuggestResponse } from '../models/api-suggest';

@Injectable()
export class SuggestService {
	private static minified_results = true;
	private static order = 'desc';
	private static orderby = 'query_count';
	private static count = '4';

	constructor(
		private http: HttpClient
	) { }

	// TODO: make the searchParams as configureable model rather than this approach.
	public fetchQuery(query: string): Observable<SuggestResponse> {

		const jsonpUrl = 'https://api.loklak.org/api/suggest.json' +
							'?q=' + query +
							'&count=' + SuggestService.count +
							'&minified=' + SuggestService.minified_results.toString() +
							'&order=' + SuggestService.order +
							'&orderby=' + SuggestService.orderby;

		return this.http
			.jsonp<SuggestResponse>(jsonpUrl, 'callback')
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
