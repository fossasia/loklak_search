export enum ReloactionAfterQuery {
	NONE,
	RELOCATE,
};

export interface Query {
	queryString: string;
	location: ReloactionAfterQuery;
	media: Media;
}

export enum Media {
	all,
	image,
	video
}
