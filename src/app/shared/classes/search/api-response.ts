export class ApiResponseMetadata {
	constructor (
		public client: string = null,
		public count: string = null,
		public count_backend: number = null,
		public count_cache: number = null,
		public count_twitter_all: number = null,
		public count_twitter_new: number = null,
		public hits: number = null,
		public index: string = null,
		public itemsPerPage: number = null,
		public period: number = null,
		public query: string = null,
		public scraperInfo: string = null,
		public servicereduction: string = null,
		public time: number = null
	) { }
}

export class ApiResponseUser {
	constructor(
		public appearance_first: string = null,
		public appearance_latest: string = null,
		public name: string = null,
		public profile_image_url_https: string = null,
		public screen_name: string = null,
		public user_id: string = null,
	) { }
}

export class ApiResponseResult {
	constructor(
		public audio: Array<string> = new Array<string>(),
		public audio_count: number = null,
		public classifier_language: string = null,
		public classifier_language_probability: number = null,
		public created_at: string = null,
		public favourites_count: number = null,
		public hashtags: Array<string> = new Array<string>(),
		public hashtags_count: number = null,
		public hosts: Array<string> = new Array<string>(),
		public hosts_count: number = null,
		public id_str: string = null,
		public images: Array<string> = new Array<string>(),
		public images_count: number = null,
		public link: string = null,
		public links: Array<string> = new Array<string>(),
		public links_count: number = null,
		public mentions: Array<string> = new Array<string>(),
		public mentions_count: number = null,
		public place_context: string = null,
		public place_id: string = null,
		public place_name: string = null,
		public provider_type: string = null,
		public retweet_count: number = null,
		public screen_name: string = null,
		public source_type: string = null,
		public text: string = null,
		public text_length: number = null,
		public timestamp: string = null,
		public user: ApiResponseUser = new ApiResponseUser(),
		public videos: Array<string> = new Array<string>(),
		public videos_count: number = null,
		public without_l_len: number = null,
		public without_lu_len: number = null,
		public without_luh_len: number = null
	) { }
}

export class ApiResponse {
	constructor (
		public search_metadata: ApiResponseMetadata = new ApiResponseMetadata(),
		public statuses: Array<ApiResponseResult> = new Array<ApiResponseResult>()
	) { }
}
