export enum ReloactionAfterQuery {
	NONE,
	RELOCATE,
};

export interface Query {
	queryString: string;
	location: ReloactionAfterQuery;
}
