import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WallCard } from '../../models';

@Component({
	selector: 'media-wall-custom-card',
	templateUrl: './media-wall-custom-card.component.html',
	styleUrls: ['./media-wall-custom-card.component.scss']
})
export class MediaWallCustomCardComponent implements OnInit {
	@Input() mediaWallCard: WallCard;
	@Output() changeMediaWallCard: EventEmitter<WallCard> = new EventEmitter<WallCard>();
	public customCard: WallCard;

	constructor() { }

	ngOnInit() {
		this.customCard = {
			backgroundColor: this.mediaWallCard.backgroundColor,
			fontColor: this.mediaWallCard.fontColor,
			accentColor: this.mediaWallCard.accentColor
		};
	}

	public changeBackgroundColor(event) {
		this.customCard.backgroundColor = event;
	}

	public changeFontColor(event) {
		this.customCard.fontColor = event;
	}

	public changeAccentColor(event) {
		this.customCard.accentColor = event;
	}

	public transparentBackground(event) {
		this.customCard.backgroundColor = '#fff';
	}
}
