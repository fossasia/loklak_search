import { LoklakHomePage } from './app.po';

describe('loklak-search App', function() {
	let page: LoklakHomePage;

	beforeEach(() => {
		page = new LoklakHomePage();
	});

	it(`should display message saying 'Welcome to LokLak search web application'`, () => {
		page.navigateTo();
		expect(page.getParagraphText()).toEqual('Welcome to LokLak search web application');
	});
});
