/**
 * @function parseDateToApiAcceptedFormat
 * Takes a JS Date Object and returns a string in the format accepted by the API.
 * Accepted Format is: <yyyy-MM-dd_HH:mm>
 *
 * @arg date: Date
 * @return string
 */
export function parseDateToApiAcceptedFormat(date: Date): string {
	const year = date.getFullYear().toString();
	const month = (date.getMonth() < 9) ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
	const day = (date.getDate() < 10) ? `0${date.getDate()}` : `${date.getDate()}`;
	const hour = (date.getHours() < 10) ? `0${date.getHours()}` : `${date.getHours()}`;
	const minute = (date.getMinutes() < 10) ? `0${date.getMinutes()}` : `${date.getMinutes()}`;

	return `${year}-${month}-${day}_${hour}:${minute}`;
}
