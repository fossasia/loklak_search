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
	public urlObjecttext = [];
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
		this.urlObjecttext = this.urlObject;
		for ( let k = 0 ; k < this.urlObjecttext.length ; k++) {
			for ( let l = 0 ; l < this.urlObjecttext[k][1].length ; l++) {
				if ( this.urlObjecttext[k][1][l].split('://').length > 1) {
					this.urlObjecttext[k][1][l] = this.urlObjecttext[k][1][l].split('://')[1];
				}
			}
		}
		this.urlObject = [];
		let p = 0;
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
				p++;
			}

		}
	}
}
