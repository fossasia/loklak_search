import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WallHeader } from '../../models';

@Component({
	selector: 'media-wall-header',
	templateUrl: './media-wall-header.component.html',
	styleUrls: ['./media-wall-header.component.scss']
})
export class MediaWallHeaderComponent implements OnInit {
	@Input() query: string;
	@Input() wallCustomHeader: WallHeader;
	@Input() showHideMenu: boolean;
	@Output() showHideCustomization: EventEmitter<boolean> = new EventEmitter<boolean>();

	constructor() { }

	ngOnInit() {
	}

}
