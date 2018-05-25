import { Injectable } from '@angular/core';
import { Jsonp, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/retry';

import { SuggestResponse } from '../models/api-suggest';

@Injectable()
export class SuggestService {
	private static apiUrl: URL = new URL('https://api.loklak.org/api/suggest.json');
	private static minified_results = true;
	private static order = 'desc';
	private static orderby = 'query_count';


	constructor(
		private jsonp: Jsonp
	) { }

	// TODO: make the searchParams as configureable model rather than this approach.
	public fetchQuery(query: string): Observable<SuggestResponse> {
		const searchParams = new URLSearchParams();
		searchParams.set('q', query);
		searchParams.set('callback', 'JSONP_CALLBACK');
		searchParams.set('minified', SuggestService.minified_results.toString());
		searchParams.set('order', SuggestService.order);
		searchParams.set('orderby', SuggestService.orderby);

		return this.jsonp.get(SuggestService.apiUrl.toString(), {search : searchParams})
								.map(this.extractData)
								.retry(2)
								.catch(this.handleError);
	}

	private extractData(res: Response): SuggestResponse {
		try {
			return <SuggestResponse>res.json();
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
