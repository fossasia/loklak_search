import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'media-wall-not-found',
	templateUrl: './media-wall-not-found.component.html',
	styleUrls: ['./media-wall-not-found.component.scss']
})
export class MediaWallNotFoundComponent implements OnInit {
	public headerImageUrl = 'assets/images/cow_150x175.png';
	@Input() fontColor: string;

	constructor() { }

	ngOnInit() { }

}
