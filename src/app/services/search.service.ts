import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

import { SearchServiceConfig } from '.';
import { ApiResponse } from '../models/api-response';

@Injectable()
export class SearchService {
	private static readonly apiUrl: URL = new URL('https://api.loklak.org/api/search.json');

	constructor(
		private http: HttpClient
	) { }

	public fetchQuery(query: string, config: SearchServiceConfig): Observable<ApiResponse> {
		const searchParams = new HttpParams();
		searchParams.set('q', query);
		searchParams.set('callback', 'JSONP_CALLBACK');
		searchParams.set('minified', 'true');
		searchParams.set('source', config.source);
		searchParams.set('maximumRecords', config.maximumRecords.toString());
		searchParams.set('timezoneOffset', config.getTimezoneOffset());
		searchParams.set('startRecord', config.startRecord.toString());

		if (config.getAggregationFieldString()) {
			searchParams.set('fields', config.getAggregationFieldString());
			searchParams.set('limit', config.aggregationLimit.toString());
		}

		if (config.getFilterString()) {
			searchParams.set('filter', config.getFilterString());
		}

		const jsonpUrl = SearchService.apiUrl.toString() + `?${searchParams.toString()}`;

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
