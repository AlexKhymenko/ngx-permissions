import { ApplicationPage } from './app.po';

describe('application App', () => {
  let page: ApplicationPage;

  beforeEach(() => {
    page = new ApplicationPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
