import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
	selector: 'service-box',
	templateUrl: './service-box.component.html',
	styleUrls: ['./service-box.component.scss'],
	host: {
'(document:click)': 'onClick($event)'
}

})
export class ServiceBoxComponent implements OnInit {
	public opened = false;
	onClick(event) {

if (!this._eref.nativeElement.contains(event.target)) {
	this.opened = false;
}

}

	constructor(private _eref: ElementRef) { }

	ngOnInit() {
	}
}
