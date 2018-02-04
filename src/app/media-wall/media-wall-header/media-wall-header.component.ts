import {Component, Input, OnInit} from '@angular/core';
import {WallHeader} from '../../models';

@Component({
	selector: 'media-wall-header',
	templateUrl: './media-wall-header.component.html',
	styleUrls: ['./media-wall-header.component.scss']
})
export class MediaWallHeaderComponent implements OnInit {
	@Input() query: string;
	@Input() wallCustomHeader: WallHeader;
	@Input() headerTitle: string;

	constructor() { }

	ngOnInit() {
	}

}
