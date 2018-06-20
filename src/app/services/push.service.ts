import { Injectable } from '@angular/core';
import {
	HttpClient,
	HttpHeaders,
	HttpParams
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, PushApiResponse } from '../models';
@Injectable({
	providedIn: 'root'
})
/*
* The PushService is called on SEARCH_COMPLETE_SUCCESS
* to push the result data back to server in the same
* search result object format obtained from server.
**/
export class PushService {

	constructor( private http: HttpClient ) { }

	// Returns an Observable of PushApiResponse.
	public postData(data: ApiResponse): Observable<PushApiResponse> {

		// End point to make a Post to.
		const httpUrl = 'https://api.loklak.org/api/push.json';

		const headers = new HttpHeaders({
			'Content-Type': 'application/x-www-form-urlencoded',
			'Accept': 'application/json',
			'cache-control': 'no-cache'
		});
		// Extracting search_metadata and statuses
		// from the data obtained from search result.
		const { statuses } = data;
		const searchMetadata = data.search_metadata;

		// Converting the object to JSON string.
		const dataToSend = JSON.stringify({search_metadata: searchMetadata, statuses});

		// Setting the data to send in HttpParams()
		// with key as 'data'
		const body = new HttpParams().set('data', dataToSend);

		// Making a Post request to api/push.json endpoint
		// of server with required header and data body.
		// Response Object is converted to PushApiResponse type.
		return this.http.post<PushApiResponse>(httpUrl, body, {headers});
	}
}
