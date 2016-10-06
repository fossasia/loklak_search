import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'home-search-bar',
	templateUrl: './search-bar.component.html',
	styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
	private query: string = null;
	public submitted: boolean = false;

	@Output() queryEvent: EventEmitter<any> = new EventEmitter();

	ngOnInit() { }

	private handleQueryRequest(): void {
		if (this.query) {
			this.queryEvent.emit({ query : this.query });
		}
	}
}
