/**
	 * This Configures the way in which the links are generated
	 * This object contains three properties.
	 *
	 * @property hashtag: Configration of hashtags
	 * @property mention: Configration of mentions
	 * @property link:		Configration of URLs/links
	 *
	 * Each of these have a type attribute 'link_type' which specifies the way in which linking works
	 * This link_type can take 3 states
	 * 		* Default      : Use the basic linking
	 * 										 		* "from:xxxx" incase of mentions
	 * 												* "#xxxx" incase of hashtags
	 * 												* Use same text for link as well as link_text incase of URLs
	 *
	 * 		* SingleTarget : Single link for all the properties,
	 * 										 link_to attribute must also be there, if not specified use default
	 *
	 * 		* OneToOneMap  : Map one by one using a dictionary,
	 * 										 link_to attribute is a one to one dictionary, if some key is not present use default
	 */


export enum ConfigLinkType {
	Default,
	SingleTarget,
	OneToOneMap
}

class ConfigTarget {
	constructor (
		public link_type: ConfigLinkType = ConfigLinkType.Default,
		public link_to: Object = {}
	) { }
}

export class AutolinkerConfig {
	constructor (
		public hashtag: ConfigTarget = new ConfigTarget(),
		public mention: ConfigTarget = new ConfigTarget(),
		public link: ConfigTarget = new ConfigTarget()
	) { }
}
