import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WallHeader } from '../../models';

@Component({
	selector: 'media-wall-custom-header',
	templateUrl: './media-wall-custom-header.component.html',
	styleUrls: ['./media-wall-custom-header.component.scss']
})
export class MediaWallCustomHeaderComponent implements OnInit {
	@Input() mediaWallHeader: WallHeader;
	@Output() changeMediaWallHeader: EventEmitter<WallHeader> = new EventEmitter<WallHeader>();
	public customHeader: WallHeader;

	constructor() { }

	ngOnInit() {
		this.customHeader = {
			backgroundColor: this.mediaWallHeader.backgroundColor,
			fontColor: this.mediaWallHeader.fontColor
		};
	}

	public changeBackgroundColor(event) {
		this.customHeader.backgroundColor = event;
	}

	public changeFontColor(event) {
		this.customHeader.fontColor = event;
	}

	public transparentBackground(event) {
		this.customHeader.backgroundColor = '#fff';
	}
}
