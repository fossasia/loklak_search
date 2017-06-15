import { SuggestMetadata ,
					SuggestResults ,
					SuggestResponse } from '../../models/api-suggest';

export const MockSuggestMetadata: SuggestMetadata = {
	client: '162.158.46.30',
	count: '11',
	hits: 87,
	query: 'fossasia',
	order: 'DESC',
	orderby: 'query_count'
};

export const MockSuggestResults: SuggestResults = {
	query: 'fossasia',
	query_count: 1045,
	source_type: 'TWITTER',
	message_period: 12383324,
	retrieval_last: '2017-06-03T12:22:22.792Z',
	messages_per_day: 6,
	query_length: 8,
	timezoneOffset: 0,
	retrieval_next: '2017-06-04T12:22:22.792Z',
	score_retrieval: 0,
	query_last: '2017-06-03T12:22:22.792Z',
	expected_next: '2017-06-03T14:57:10.285Z',
	score_suggest: 0,
	retrieval_count: 1052,
	query_first: '2017-03-20T11:04:48.820Z'
};

export const MockSuggestResponse: SuggestResponse = {
	suggest_metadata: MockSuggestMetadata,
	queries: [MockSuggestResults]
};
