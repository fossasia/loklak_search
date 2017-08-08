import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'media-wall-custom-theme',
	templateUrl: './media-wall-custom-theme.component.html',
	styleUrls: ['./media-wall-custom-theme.component.scss']
})
export class MediaWallCustomThemeComponent implements OnInit {
	public lightThemeURL = 'assets/images/Light.png';
	public classicThemeURL = 'assets/images/Classic.png';
	public coolBluesThemeURL = 'assets/images/Cool-Blue.png';
	public darkThemeURL = 'assets/images/Dark.png';

	constructor() { }

	ngOnInit() {
	}

}
