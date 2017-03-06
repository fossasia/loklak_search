import { browser, element, by } from 'protractor';

export class LoklakSearchPage {
	navigateTo() {
		return browser.get('/');
	}

	getHeaderText() {
		return element(by.css('app-root app-home div.wrapper h1')).getText();
	}
}
