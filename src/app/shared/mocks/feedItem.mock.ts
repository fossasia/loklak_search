import { ApiResponseResult, ApiResponseUser } from '../../models/api-response';

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
