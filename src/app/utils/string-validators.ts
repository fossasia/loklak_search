import * as moment from 'moment';

export function containNameCharactersOnly(str: string): boolean {
	const testRegExp: RegExp = /^([a-zA-Z0-9_]+)$/;
	const match: RegExpExecArray = testRegExp.exec(str);
	return (match) ? true : false;
}

export function containAlphabetsOnly(str: string): boolean {
	const testRegExp: RegExp = /^([a-zA-Z]+)$/;
	const match: RegExpExecArray = testRegExp.exec(str);
	return (match) ? true : false;
}

export function isValidApiAcceptedDateString(str: string): boolean {
	return moment(str, 'YYYY-MM-DD_HH:mm', true).isValid();
}
