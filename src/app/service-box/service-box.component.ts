import { Component, OnInit, ElementRef, HostListener } from '@angular/core';

@Component({
	selector: 'service-box',
	templateUrl: './service-box.component.html',
	styleUrls: ['./service-box.component.scss'],
})
export class ServiceBoxComponent implements OnInit {
	public opened = false;

@HostListener('document: click', ['$event'])
boxClose(event: Event) {
		if (!this._eref.nativeElement.contains(event.target)) {
			this.opened = false;
			}
		}

constructor(private _eref: ElementRef) { }

ngOnInit() {}
}
