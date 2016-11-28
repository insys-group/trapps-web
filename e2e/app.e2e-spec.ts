import { TrappsWebPage } from './app.po';

describe('trapps-web App', function() {
  let page: TrappsWebPage;

  beforeEach(() => {
    page = new TrappsWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
