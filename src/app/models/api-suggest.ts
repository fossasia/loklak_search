
export interface SuggestMetadata {
	client: string;
	count: string;
	hits: number;
	query: string;
	order: string;
	orderby: string;
}

export interface SuggestResults {
	query: string;
	query_count: number;
	source_type: string;
	message_period: number;
	retrieval_last: string;
	messages_per_day: number;
	query_length: number;
	timezoneOffset: number;
	retrieval_next: string;
	score_retrieval: number;
	query_last: string;
	expected_next: string;
	score_suggest: number;
	retrieval_count: number;
	query_first: string;
}

export interface SuggestResponse {
	suggest_metadata: SuggestMetadata;
	statuses: SuggestResults[];
}
