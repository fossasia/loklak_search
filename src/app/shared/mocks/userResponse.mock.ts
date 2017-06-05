import { UserApiResponse , UserTopology, UserResponse } from '../../models/api-user-response';

export const MockUserApiResponse: UserApiResponse = {
		$P: 'I',
		utc_offset: -25200,
		friends_count: 282,
		profile_image_url_https: 'https://pbs.twimg.com/profile_images/1141238022/fossasia-cubelogo_normal.jpg',
		listed_count: 185,
		profile_background_image_url: 'http://pbs.twimg.com/profile_background_images/882420659/14d1d447527f8524c6aa0c568fb421d8.jpeg',
		default_profile_image: false,
		favourites_count: 1873,
		description: '#FOSSASIA #OpenTechSummit 2017, March 17-19 in Singapore https://t.co/aKhIo2s1Ck',
		created_at: 'Sun Jun 20 16:13:15 +0000 2010',
		is_translator: false,
		profile_background_image_url_https: 'https://pbs.twimg.com/profile_background_images/882420659/14d1d447527f8524c6aa0c568fb421d8.jpeg',
		protected: false,
		screen_name: 'fossasia',
		id_str: '157702526',
		profile_link_color: 'DD2E44',
		is_translation_enabled: false,
		translator_type: 'none',
		id: 157702526,
		geo_enabled: true,
		profile_background_color: 'F50000',
		lang: 'en',
		has_extended_profile: false,
		profile_sidebar_border_color: '000000',
		profile_location: null,
		profile_text_color: '333333',
		verified: false,
		profile_image_url: 'http://pbs.twimg.com/profile_images/1141238022/fossasia-cubelogo_normal.jpg',
		time_zone: 'Pacific Time (US & Canada)',
		url: 'http://t.co/eLxWZtqTHh',
		contributors_enabled: false,
		profile_background_tile: true,
		profile_banner_url: 'https://pbs.twimg.com/profile_banners/157702526/1415283831',
		entities: {
			description: {
			urls: [{
				expanded_url: 'http://loklak.org',
				indices: [ 93, 115 ],
				display_url : 'loklak.org',
				url : 'http://t.co/D8XmZwuU2Y'
			}]
			},
			url: {
			urls: [{
				display_url: 'fossasia.org',
				indices: [57, 80],
				expanded_url: 'http://fossasia.org',
				url: 'https://t.co/aKhIo2s1Ck'
			}]
			}
		},
		statuses_count: 3305,
		follow_request_sent: false,
		followers_count: 2996,
		profile_use_background_image: true,
		default_profile: false,
		following: true,
		name: 'FOSSASIA',
		location: 'Asia',
		profile_sidebar_fill_color: 'DDEEF6',
		notifications: false,
		retrieval_date: '2017-06-03T14:16:42.112Z',
		location_country: 'Philippines',
		location_country_code: 'PH',
		location_point: [ 122.51640309696847 , 9.550599898002389 ],
		location_mark: [ 122.51169704280254 , 9.54847427240048 ]
};

export const MockUserTopology: UserTopology = {
		retrieval_date: '2017-06-03T14:16:59.226Z',
		complete: false,
		followers_count: 7,
		unfollowers_count: 0,
		following_count: 10,
		unfollowing_count: 0,
		followers: [ MockUserApiResponse ],
		unfollowers: [ MockUserApiResponse ],
		following: [ MockUserApiResponse ],
		unfollowing: [ MockUserApiResponse ]
};

export const MockUserResponse: UserResponse = {
	user: MockUserApiResponse,
	topology: MockUserTopology
};
