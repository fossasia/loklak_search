import { Component, OnInit, Input } from '@angular/core';
import { AutolinkerConfig, ConfigLinkType } from '../../shared/configrations';

@Component({
	selector: 'feed-linker',
	templateUrl: './feed-linker.component.html',
	styleUrls: ['./feed-linker.component.scss']
})
export class FeedLinkerComponent implements OnInit {
	@Input() private text: String;
	@Input() private config: AutolinkerConfig;
	private shardArray: Array<Shard> = new Array<Shard>();

	constructor() { }

	ngOnInit() {
		this.generateShards();
	}

	private generateShards() {
		let splitTextArray = this.text.split(' ');
		for (let shardText of splitTextArray) {
			if (shardText[0] === '@' && shardText.length > 1) {
				let mentionShard = new Shard(ShardType.mention, shardText); // linkType is set internal (default).

				switch (this.config.mention.link_type) {
					case (ConfigLinkType.Default): {
						mentionShard.linkTo = ['/search'];
						mentionShard.queryParams = { query : `from:${shardText.substring(1)}` };
						break;
					}
				}
				this.shardArray.push(mentionShard);
			}
			else if (shardText[0] === '#' && shardText.length > 1) {
				let hashtagShard = new Shard(ShardType.hashtag, shardText); // linkType is set internal (default).

				switch (this.config.hashtag.link_type) {
					case (ConfigLinkType.Default): {
						hashtagShard.linkTo = ['/search'];
						hashtagShard.queryParams = { query : `#${shardText.substring(1)}` };
						break;
					}
				}
				this.shardArray.push(hashtagShard);
			}
			else if (this.stringIsURL(shardText)) {
				let linkShard = new Shard(ShardType.link, shardText);
				linkShard.linkType = LinkType.external;

				switch (this.config.link.link_type) {
					case (ConfigLinkType.OneToOneMap): {
						linkShard.linkTo = shardText;
						if (this.config.link.link_to.hasOwnProperty(shardText)) { // Check if corresponding map is present.
							shardText = this.config.link.link_to[shardText];
							linkShard.text = shardText;
						}
						break;
					}
				}
				this.shardArray.push(linkShard);
			}
			else {
				this.shardArray.push(new Shard(ShardType.plain, shardText));
			}
		}
	}

	private stringIsURL(str: String): Boolean {
		let regexpPattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
		let regexp = new RegExp(regexpPattern, 'ig');
		let searchRes = str.search(regexp);
		return (searchRes === 0) ? true : false;
	}
}

/**
 * @enum ShardTypes : plain, link, hashtag, mention
 */
const enum ShardType {
	plain,		// 0
	link,			// 1
	hashtag,	// 2
	mention		// 3
}

/**
 * @enum LinkTypes : internal, external
 *
 * In internal links the routerLink is used and linkTo property is configured such that it can be used directly.
 * In external links the simple href property of anchor is used.
 */
const enum LinkType {
	internal, // 0
	external	// 1
}

/**
 * Each Shard contains two properties type and text.
 *
 * @property type					: ShardType It specifies the the type of shard (plain,link,hashtag or mention)
 * @property text					: Text which is to be displayed.
 * @property linkType			: The type of link wheather internal or external.
 * @property linkTo				: The location where the route will eventually link.
 * @property queryParams	: The queryParams to use when redirecting (used incase of internal links).
 *
 */
class Shard {
	constructor (
		public type: ShardType = ShardType.plain,
		public text: String = '',
		public linkType: LinkType = LinkType.internal,
		public linkTo: any = null,
		public queryParams: any = null
	) { }
}
