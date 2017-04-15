export enum ReloactionAfterQuery {
	NONE,
	RELOCATE,
};

export interface Query {
	queryString: string;
	location: ReloactionAfterQuery;
	media: MediaTypes
}

export enum MediaTypes {
	ALL,
	IMAGES,
	VIDEOS
}