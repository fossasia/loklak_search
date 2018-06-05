import { Injectable } from '@angular/core';

@Injectable()
export class ShareNewsStatusService {

	public sharedNewsStatus = false;

	constructor() { }

	changeStatus(currentStatus: boolean) {
		this.sharedNewsStatus = currentStatus;
	}

	getSharedNewsStatus() {
		return this.sharedNewsStatus;
	}
}
