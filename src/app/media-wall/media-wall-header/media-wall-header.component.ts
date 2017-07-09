import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'media-wall-header',
	templateUrl: './media-wall-header.component.html',
	styleUrls: ['./media-wall-header.component.scss']
})
export class MediaWallHeaderComponent implements OnInit {
		@Input() query: string;

	constructor() { }

	ngOnInit() {
	}

}
