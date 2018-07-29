import { Component, OnInit } from '@angular/core';
import { defaultUrlConfig } from '../shared/url-config';
import { newsOrgs } from '../shared/news-org';

@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
	public urlObject = [];
	public newsConfigOrgs = newsOrgs;
	ngOnInit() {
		let i = 0;
		for (const key in defaultUrlConfig) {
			if (key) {
				const data = [];
				const value = defaultUrlConfig[key];
				const data2 = [];
				for (const key2 in value) {
					if (key2) {
						const value2 = value[key2];
						data2.push(key2, value2);
					}
				}
				data.push(key, data2);
				this.urlObject.push(data);
				i++;
			}
		}
	}
}
