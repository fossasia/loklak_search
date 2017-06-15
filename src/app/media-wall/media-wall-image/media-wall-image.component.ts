import { Input, Component, OnInit, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { MediaWallsColor } from '../../models/media-wall';

@Component({
	selector: 'media-wall-image',
	templateUrl: './media-wall-image.component.html',
	styleUrls: ['./media-wall-image.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaWallImageComponent implements OnInit {
	@Input() mediaElements: string[];
	@Input() color: MediaWallsColor;

	constructor() { }

	ngOnInit() {
	}

}
