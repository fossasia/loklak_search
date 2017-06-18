import { ApiResponseResult,
					ApiResponseUser,
					ApiResponse,
					ApiResponseAggregations,
					ApiResponseMetadata } from '../../models/api-response';
import { Query } from '../../models/query';

export const MockApiResponseResult: ApiResponseResult = {
	audio: [],
	audio_count: 0,
	classifier_language: 'english',
	classifier_language_probability: 8.057627481905527E-11,
	created_at: '2017-05-25T10:13:29.000Z',
	favourites_count: 18,
	hashtags: [
		'opensourcedesign',
		'opentechsummit',
		'ots17'
	],
	hashtags_count: 3,
	hosts: ['pic.twitter.com'],
	hosts_count: 1,
	id_str: '867685041425567745',
	images: [
		'https://pbs.twimg.com/media/DAqiSQ_WsAA4cAy.jpg',
		'https://pbs.twimg.com/media/DAqiSQ6XoAAHwBf.jpg',
		'https://pbs.twimg.com/media/DAqiSQ2XYAAF1TE.jpg',
		'https://pic.twitter.com/SxMbK2dire'
	],
	images_count: 4,
	link: 'https://twitter.com/mariobehling/status/867685041425567745',
	links: ['https://pic.twitter.com/SxMbK2dire'],
	links_count: 1,
	mentions: [
		'elioqoshi',
		'mozilla',
		'opntec'
	],
	mentions_count: 3,
	place_context: 'ABOUT',
	place_id: '',
	place_name: '',
	provider_type: 'SCRAPED',
	retweet_count: 6,
	screen_name: 'mariobehling',
	source_type: 'TWITTER',
	text: 'moz://a @elioqoshi about the new identity of @mozilla and the implementation' +
				'process of #OpenSourceDesign at #OpenTechSummit #OTS17 @opntec https://pic.twitter.com/SxMbK2dire',
	text_length: 174,
	timestamp: '2017-06-02T09:50:59.329Z',
	unshorten: {},
	user: {
		appearance_first: '2017-06-02T09:50:59.332Z',
		appearance_latest: '2017-06-02T09:50:59.332Z',
		name: 'Mario Behling',
		profile_image_url_https: 'https://pbs.twimg.com/profile_images/446123162/mb_bigger.JPG',
		screen_name: 'mariobehling',
		user_id: '14919253'
	},
	videos: ['http://youtu.be/LfErbeZpxPE?a)'],
	videos_count: 1,
	without_l_len: 139,
	without_lu_len: 111,
	without_luh_len: 7
};

export const MockApiResponseMetadata: ApiResponseMetadata = {
	client: '162.158.46.60',
	count: '1',
	count_backend: 0,
	count_cache: 0,
	count_twitter_all: 0,
	count_twitter_new: 1,
	hits: 1,
	index: 'messages_week',
	itemsPerPage: 1,
	period: 11818948,
	query: 'fossasia',
	scraperInfo: 'local',
	servicereduction: 'false',
	time: 1234
};

export const MockApiResponseAggregations: ApiResponseAggregations = {
	hashtags : {
		'susi': 2,
		'asksusi': 1,
		'developer': 1,
		'fossasia': 1,
		'gsoc': 1,
		'materialui': 1,
		'opensource': 1,
		'react': 1,
		'sphinx': 1
		},
		screen_name : {
		'bossmandoggames': 22,
		'fastfixmelb': 22,
		'5ch00lb0y': 1,
		'Lakshaykapoor8': 1,
		'N1kk0777': 1,
		'isuruAb': 1,
		'nikhil_rayap': 1,
		'rishirajloyola': 1,
		'shubham_p98': 1,
		'udayteja96': 1
		},
		mentions : {
		'fossasia': 4,
		'mariobehling': 4,
		'asksusi': 2,
		'0rb1t3r': 1,
		'YouTube': 1,
		'gsoc': 1,
		'hpdang': 1
		},
		created_at : {
		'2017-05-27': 3,
		'2017-05-28': 8,
		'2017-05-29': 7,
		'2017-05-30': 10,
		'2017-05-31': 6,
		'2017-06-01': 6,
		'2017-06-02': 9,
		'2017-06-03': 3
		}
};

export const MockApiResponse: ApiResponse = {
	search_metadata: MockApiResponseMetadata,
	statuses: [MockApiResponseResult],
	aggregations: MockApiResponseAggregations
};

export const MockQuery: Query = {
	queryString: 'loklak',
	displayString: 'loklak',
	filter: {
		audio: false,
		video: false,
		images: false
	},
	location: null,
	timeBound: {
		since: null,
		until: null
	},
	from: false
};
