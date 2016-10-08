import { Component } from '@angular/core';

@Component({selector: 'router-outlet', template: ''})
export class RouterOutletStubComponent { }

export class RouterStub {
	navigateByUrl(url: string) {
		return url;
	}
}
