import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'home-search-bar',
	templateUrl: './search-bar.component.html',
	styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
	private query: string = null;

	@Output() typeStartEvent: EventEmitter<any> = new EventEmitter();

	ngOnInit() { }

	private handleTypeStart(): void {
		this.typeStartEvent.emit({ query : this.query });
	}
}
