import {ClaroDXPage} from './app.po';

describe('clarodx App', () => {
    let page: ClaroDXPage;

    beforeEach(() => {
        page = new ClaroDXPage();
    });

    it('should display welcome message', () => {
        page.navigateTo();
        expect(page.getTitleText()).toEqual('Welcome to ClaroDX!');
    });

});
