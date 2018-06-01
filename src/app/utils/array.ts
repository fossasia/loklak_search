/**
 * @function getIndicesOf
 * The function takes two strings s1 and s2 and returns array containing all the occurances of s2 in s1.
 *
 * @arg text : The Main string.
 * @arg str : The string to be searched.
 * @arg caseSensitive : boolean to check wheather consider the case or not
 */
export function getIndicesOf(text: string, str: string, caseSensitive = true): number[] {
	if (!str.length) {
		return [];
	}

	let startIndex = 0;
	let index: number;
	const indices: number[] = new Array<number>();

	if (!caseSensitive) {
		text = text.toLowerCase();
		str = str.toLowerCase();
	}

	while ((index = text.indexOf(str, startIndex)) > -1) {
		indices.push(index);
		startIndex = index + str.length;
	}

	return indices;
}


/**
 * @function immutableSort
 * Sorts the array without modifying the original one.
 *
 * @arg: array: Array to be sorted
 * @arg?: compareFunction: Optional function to be used for comparision of objects
 */
export function immutableSort(array: Array<any>, compareFunction?: (a: any, b: any) => number): Array<any> {
	return [...array].sort(compareFunction);
}

/**
 * @function cut
 * Takes two strings s1 and s2 and remove all occurances of s2 in s1
 *
 * @arg: s1: String to be cut
 * @arg: s2: Scissor string
 * @arg?: delimiter: Optional string used to join the parts of string. (Default: '')
 */
export function cut(s1: string, s2: string, delimiter: string = ''): string {
	if (s1.indexOf(s2) === -1) {
		return s1;
	}

	const trimmedSplitArray: string[] = new Array<string>();
	for (const part of s1.split(s2)) {
		if (part !== '' && part.trim() !== '') {
			trimmedSplitArray.push(part.trim());
		}
	}

	return trimmedSplitArray.join(delimiter);
}
