/**
 * Followers RegExp
 *
 * ^ asserts position at start of the string.
 * followers: matches the characters followers: literally (case sensitive)
 *
 * ([^\s]+) - First capturing group
 * [^\s] - Match every non whitespace character
 * Quantifier(+) - Matches between one and unlimited times, as many times as possible, giving back as needed (greedy)
 */
export const followersRegExp: RegExp = /^followers:?([^\s]+)/;


/**
 * From RegExp
 *
 * from: matches the characters from: literally (case sensitive)
 *
 * ([^\s]+) - First capturing group
 * [^\s] - Match every non whitespace character
 * Quantifier(+) - Matches between one and unlimited times, as many times as possible, giving back as needed (greedy)
 */
export const fromRegExp: RegExp = /from:?([^\s]+)/;

/**
 * Near RegExp
 *
 * near: matches the characters near: literally (case sensitive)
 *
 * ([^\s]+) - First capturing group
 * [^\s] - Match every non whitespace character
 * Quantifier(+) - Matches between one and unlimited times, as many times as possible, giving back as needed (greedy)
 */
export const nearRegExp: RegExp = /near:?([^\s]+)/;

/**
 * Since RegExp
 *
 * since: matches the characters since: literally (case sensitive)
 *
 * ([^\s]+) - First capturing group
 * [^\s] - Match every non whitespace character
 * Quantifier(+) - Matches between one and unlimited times, as many times as possible, giving back as needed (greedy)
 */
export const sinceRegExp: RegExp = /since:?([^\s]+)/;

/**
 * Until RegExp
 *
 * until: matches the characters until: literally (case sensitive)
 *
 * ([^\s]+) - First capturing group
 * [^\s] - Match every non whitespace character
 * Quantifier(+) - Matches between one and unlimited times, as many times as possible, giving back as needed (greedy)
 */
export const untilRegExp: RegExp = /until:?([^\s]+)/;


/**
 * Filter RegExp
 *
 * filter: matches the characters filter: literally (case sensitive)
 *
 * ([^\s]+) - First capturing group
 * [^\s] - Match every non whitespace character
 * Quantifier(+) - Matches between one and unlimited times, as many times as possible, giving back as needed (greedy)
 */
export const filterRegExp: RegExp = /filter:?([^\s]+)/;


/**
 * hashtag RegExp
 *
 * hashtag: matches the characters hashtag: literally (case sensitive)
 *
 * ([^\s]+) - First capturing group
 * [^\s] - Match every non whitespace character
 * Quantifier(+) - Matches between one and unlimited times, as many times as possible, giving back as needed (greedy)
 */
export const hashtagRegExp: RegExp = /#:?([^\s]+)/;


/**
 * mention RegExp
 *
 * mention: matches the characters mention: literally (case sensitive)
 *
 * ([^\s]+) - First capturing group
 * [^\s] - Match every non whitespace character
 * Quantifier(+) - Matches between one and unlimited times, as many times as possible, giving back as needed (greedy)
 */
export const mentionRegExp: RegExp = /@:?([^\s]+)/;
