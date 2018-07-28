export type Source = 'cache' | 'backend' | 'twitter' | 'all';

export type AggregationFields = 'created_at' | 'screen_name' | 'mentions' | 'hashtags';

export type Filter = 'image' | 'video';

export class SearchServiceConfig {
	private _count?: number;
	private _source?: Source;
	private _fields?: Set<AggregationFields>;
	private _aggregationLimit?: number;
	private _maximumRecords?: number;
	private _startRecord?: number;
	private _timezoneOffset?: string;
	private _filters?: Set<Filter>;

	constructor() {
		this.setDefaults();
	}

	private setDefaults() {
		this._count = 20;
		this._source = 'all';
		this._fields = new Set<AggregationFields>();
		this._aggregationLimit = 10;
		this._maximumRecords = 20;
		this._startRecord = 1;
		this._timezoneOffset = new Date().getTimezoneOffset().toString();
		this._filters = new Set<Filter>();
	}

	public get count(): number {
		return this._count;
	}

	public set count(count: number) {
		this._count = count;
	}

	public get source(): Source {
		return this._source;
	}

	public set source(source: Source) {
		this._source = source;
	}

	public addAggregationFields(fields: AggregationFields[]) {
		fields.forEach(field => {
			this._fields.add(field);
		});
	}

	public removeAggregationFields(fields: AggregationFields[]) {
		fields.forEach(field => {
			this._fields.delete(field);
		});
	}

	public removeAllAggregationFields() {
		this._fields.clear();
	}

	public getAggregationFieldSet(): Set<AggregationFields> {
		return this._fields;
	}

	public getAggregationFieldString(): string {
		const fieldsArray: AggregationFields[] = Array.from(this._fields);
		return fieldsArray.join(',');
	}

	public get aggregationLimit(): number {
		return this._aggregationLimit;
	}

	public set aggregationLimit(aggregationLimit: number) {
		this._aggregationLimit = aggregationLimit;
	}

	public get maximumRecords(): number {
		return this._maximumRecords;
	}

	public set maximumRecords(_maximumRecords: number) {
		this._maximumRecords = _maximumRecords;
	}

	public get startRecord(): number {
		return this._startRecord;
	}

	public set startRecord(startRecord: number) {
		this._startRecord = startRecord;
	}

	public getTimezoneOffset() {
		return this._timezoneOffset;
	}

	public setTimezoneOffset(date: Date) {
		this._timezoneOffset = date.getTimezoneOffset().toString();
	}

	public addFilters(filters: Filter[]) {
		filters.forEach(filter => {
			this._filters.add(filter);
		});
	}

	public removeFilters(filters: Filter[]) {
		filters.forEach(filter => {
			this._filters.delete(filter);
		});
	}

	public getFilterSet(): Set<Filter> {
		return this._filters;
	}

	public getFilterString(): string {
		const filterArray: Filter[] = Array.from(this._filters);
		return filterArray.join(',');
	}
}
