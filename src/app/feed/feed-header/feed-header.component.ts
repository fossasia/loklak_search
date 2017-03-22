import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { SuggestResults } from '../../models/api-suggest';
import { Location } from '@angular/common';

@Component({
	selector: 'feed-header',
	templateUrl: './feed-header.component.html',
	styleUrls: ['./feed-header.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedHeaderComponent implements OnInit {
	@Input() private searchInputControl: FormControl;
	@Input() private Suggesstionlist: SuggestResults[];
	@Output() private searchEvantEmitter: EventEmitter<any> = new EventEmitter();
	private query: FormControl;
	private visibility: boolean;

	constructor() { }

	ngOnInit() {
		this.query = this.searchInputControl.value;
		this.visibility = true;
	}

	private select(item) {
		this.query = item;
		this.visibility = false;
	}

	/*
	*to show hide the suggesstion box
	* keycode 13 is the keycode of enter key
	*/

	private gotolink(event) {
		let keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {
			this.visibility = false;
			this.searchEvantEmitter.emit();
		}
		else {
			this.visibility = true;
		}
	}
}

