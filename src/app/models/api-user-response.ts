export interface UserApiResponse {
	$P: string;
	utc_offset: number;
	friends_count: number;
	profile_image_url_https: string;
	listed_count: number;
	profile_background_image_url: string;
	default_profile_image: boolean;
	favourites_count: number;
	description: string;
	created_at: string;
	is_translator: boolean;
	profile_background_image_url_https: string;
	protected: false;
	screen_name: string;
	id_str: string;
	profile_link_color: string;
	is_translation_enabled: boolean;
	translator_type: string;
	id: number;
	geo_enabled: boolean;
	profile_background_color: string;
	lang: string;
	has_extended_profile: boolean;
	profile_sidebar_border_color: string;
	profile_location: string;
	profile_text_color: string;
	verified: boolean;
	profile_image_url: string;
	time_zone: string;
	url: string;
	contributors_enabled: boolean;
	profile_background_tile: boolean;
	profile_banner_url: string;
	entities: Object;
	statuses_count: number;
	follow_request_sent: boolean;
	followers_count: number;
	profile_use_background_image: boolean;
	default_profile: boolean;
	following: boolean;
	name: string;
	location: string;
	profile_sidebar_fill_color: string;
	notifications: boolean;
	retrieval_date: string;
	location_country: string;
	location_country_code: string;
	location_point: number[];
	location_mark: number[];
}

export interface UserTopology {
	retrieval_date: string;
	complete: boolean;
	followers_count: number;
	unfollowers_count: number;
	following_count: number;
	unfollowing_count: number;
	followers: UserApiResponse[];
	unfollowers: UserApiResponse[];
	following: UserApiResponse[];
	unfollowing: UserApiResponse[];
}

export interface UserResponse {
	user: UserApiResponse;
	topology: UserTopology;
}
