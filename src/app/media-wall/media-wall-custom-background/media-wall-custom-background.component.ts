import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WallBackground } from '../../models';

@Component({
	selector: 'media-wall-custom-background',
	templateUrl: './media-wall-custom-background.component.html',
	styleUrls: ['./media-wall-custom-background.component.scss']
})
export class MediaWallCustomBackgroundComponent implements OnInit {
	@Input() mediaWallBackground: WallBackground;
	@Output() changeMediaWallBackground: EventEmitter<WallBackground> = new EventEmitter<WallBackground>();
	public customBackground: WallBackground;

	constructor() { }

	ngOnInit() {
		this.customBackground = {
			backgroundColor: this.mediaWallBackground.backgroundColor,
		};
	}

	public changeBackgroundColor(event) {
		this.customBackground.backgroundColor = event;
	}

	public transparentBackground(event) {
		this.customBackground.backgroundColor = '#fff';
	}
}
