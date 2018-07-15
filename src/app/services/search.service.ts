import { hashtagRegExp, fromRegExp, mentionRegExp } from './../utils/reg-exp';
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
						'?timezoneOffset=' + config.getTimezoneOffset();

		if ( hashtagRegExp.exec(query) !== null ) {
			// Check for hashtag query
			jsonpUrl += '&q=%23' + hashtagRegExp.exec(query)[1] + '' + hashtagRegExp.exec(query)[0];
		} else if ( fromRegExp.exec(query) !== null ) {
			// Check for from user query
			jsonpUrl += '&q=from%3A' + fromRegExp.exec(query)[1];
		} else if ( mentionRegExp.exec(query) !== null ) {
			// Check for mention query
			jsonpUrl += '&q=%40' + mentionRegExp.exec(query)[1];
		} else {
			// for other queries
			jsonpUrl += '&q=' + query;
		}

		jsonpUrl += '&minified=' + 'true' +
					'&source=' + config.source +
					'&maximumRecords=' + config.maximumRecords.toString() +
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
