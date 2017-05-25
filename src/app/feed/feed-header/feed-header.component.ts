import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { SuggestResults } from '../../models/api-suggest';
import { Location } from '@angular/common';

import * as apiAction from '../../actions/api';

@Component({
	selector: 'feed-header',
	templateUrl: './feed-header.component.html',
	styleUrls: ['./feed-header.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedHeaderComponent implements OnInit {
	@Input() searchInputControl: FormControl;
	@Input() suggesstionList: SuggestResults[];
	@Input() media: string;
	@Output() searchEvantEmitter: EventEmitter<any> = new EventEmitter();
	@Output() filtertabs: EventEmitter<number> = new EventEmitter();
	public query: FormControl;
	public visibility: boolean;
	private selectedtab = 0;

	constructor() { }

	ngOnInit() {
		this.query = this.searchInputControl.value;
		this.visibility = true;
		this.checkmedia();
	}

	private select(item) {
		this.query = item;
		this.visibility = false;
	}

	/**
	 * To show hide the suggesstion box
	 * keycode 13 is the keycode of enter key
	*/

	public gotolink(event) {
		let keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode === '13') {
			this.visibility = false;
			this.searchEvantEmitter.emit();
		}
		else {
			this.visibility = true;
		}
	}

	public filterresults(filtervalue) {
		this.selectedtab = filtervalue;
		this.filtertabs.emit(filtervalue);
	}

	public getColor(value) {
		if (value === this.selectedtab) {
			return '#4285F4';
		}
	}

	public getCoordinates() {
		if (this.selectedtab === 0) {
			return '-80px';
		}
		else if (this.selectedtab === 1) {
			return '-12px';
		}
		else if (this.selectedtab === 2) {
			return '68px';
		}
	}

	public checkmedia() {
		if(this.media == 'all') {
			this.selectedtab = 0;
		}
		else if(this.media == 'image') {
			this.selectedtab = 1;
		}
		else if(this.media == 'video') {
			this.selectedtab = 2;
		}
	}
}

