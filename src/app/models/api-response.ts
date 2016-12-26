export interface ApiResponseMetadata {
	client: string;
	count: string;
	count_backend: number;
	count_cache: number;
	count_twitter_all: number;
	count_twitter_new: number;
	hits: number;
	index: string;
	itemsPerPage: number;
	period: number;
	query: string;
	scraperInfo: string;
	servicereduction: string;
	time: number;
}

export interface ApiResponseUser {
	appearance_first: string;
	appearance_latest: string;
	name: string;
	profile_image_url_https: string;
	screen_name: string;
	user_id: string;
}

export interface ApiResponseResult {
	audio: string[];
	audio_count: number;
	classifier_language: string;
	classifier_language_probability: number;
	created_at: string;
	favourites_count: number;
	hashtags: string[];
	hashtags_count: number;
	hosts: string[];
	hosts_count: number;
	id_str: string;
	images: string[];
	images_count: number;
	link: string;
	links: string[];
	links_count: number;
	mentions: string[];
	mentions_count: number;
	place_context: string;
	place_id: string;
	place_name: string;
	provider_type: string;
	retweet_count: number;
	screen_name: string;
	source_type: string;
	text: string;
	text_length: number;
	timestamp: string;
	unshorten: Object;
	user: ApiResponseUser;
	videos: string[];
	videos_count: number;
	without_l_len: number;
	without_lu_len: number;
	without_luh_len: number;
}

export interface ApiResponse {
	search_metadata: ApiResponseMetadata;
	statuses: ApiResponseResult[];
}


export class SuggestMetadata {
	constructor(
	 client: string = null,
	 count: string = null,
	 hits: number = null,
	 query: string = null,
	 order: string = null,
	 orderby: string = null
	) { }
}

export class SuggestResults{
	constructor(
	 query: string = null,
	 query_count: number = null,
	 source_type: string = null,
	 message_period: number = null,
	 retrieval_last: string = null,
	 messages_per_day: number = null,
	 query_length: number = null,
	 timezoneOffset: number = null,
	 retrieval_next: string = null,
	 score_retrieval: number = null,
	 query_last: string = null,
	 expected_next: string = null,
	 score_suggest: number = null,
	 retrieval_count: number = null,
	 query_first: string = null
	) { }
}

export class SuggestResponse{
	constructor(
	 search_metadata: SuggestMetadata = new SuggestMetadata(),
	 queries: Array<SuggestResults> = new Array<SuggestResults>()
	) { }
}
