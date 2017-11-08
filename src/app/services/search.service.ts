import { Injectable } from '@angular/core';
import { Jsonp, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { SearchServiceConfig } from '.';
import { ApiResponse } from '../models/api-response';

@Injectable()
export class SearchService {
	private static readonly apiUrl: URL = new URL('https://api.loklak.org/api/search.json');

	constructor(
		private jsonp: Jsonp
	) { }

	public fetchQuery(query: string, config: SearchServiceConfig): Observable<ApiResponse> {
		const searchParams = new URLSearchParams();
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

		return this.jsonp.get(SearchService.apiUrl.toString(), { search: searchParams })
			.map(this.extractData)
			.catch(this.handleError);
	}

	private extractData(res: Response): ApiResponse {
		try {
			return <ApiResponse>res.json();
		} catch (error) {
			console.error(error);
		}
	}

	private handleError(error: any) {
		// In some advance version we can include a remote logging of errors
		const errMsg = (error.message) ? error.message :
			error.status ? `${error.status} - ${error.statusText}` : 'Server error';
		console.error(errMsg); // Right now we are logging to console itself
		return Observable.throw(errMsg);
	}
}
