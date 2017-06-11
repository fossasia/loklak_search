/**
 * The function takes two strings s1 and s2 and returns array containing all the occurances of s2 in s1.
 *
 * @param text : The Main string.
 * @param str : The string to be searched.
 * @param caseSensitive : Boolean to check wheather consider the case or not
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
 * Immutable Sort: Sorts the array without modifying the original one.
 *
 * @param: array: Array to be sorted
 * @param: compareFunction: the function to be used for comparision of objects
 */
export function immutableSort(array: Array<any>, compareFunction?: (a: any, b: any) => number): Array<any> {
	return [...array].sort(compareFunction);
};
