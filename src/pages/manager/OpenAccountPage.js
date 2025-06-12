export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.url = 'https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/openAccount';

    this.customerDropdown = this.page.locator('#userSelect');
    this.currencyDropdown = this.page.locator('#currency');
    this.processButton = this.page.locator('button[type="submit"]');
  }

  async open() {
    await this.page.goto(this.url);
    await this.customerDropdown.waitFor({ state: 'visible', timeout: 5000 });
  }

  async selectCustomer(customerName) {
    await this.customerDropdown.selectOption({ label: customerName });
  }

  async selectCurrency(currency) {
    await this.currencyDropdown.selectOption({ label: currency });
  }

  async clickProcess() {
    await this.processButton.click();
  }
}
