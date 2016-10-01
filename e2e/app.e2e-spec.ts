import { LoklakSearchPage } from './app.po';

describe('loklak-search App', function () {
	let page: LoklakSearchPage;

	beforeEach(() => {
		page = new LoklakSearchPage();
	});

	it('should display message saying Loklak Search!', () => {
		page.navigateTo();
		expect(page.getHeaderText()).toEqual('Loklak Search!');
	});
});
