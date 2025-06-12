export class BankManagerMainPage {
  constructor(page) {
    this.page = page;

    this.addCustomerButton = page.locator('button[ng-click="addCust()"]');
    this.openAccountButton = page.locator('button[ng-click="openAccount()"]');
    this.customersButton = page.locator('button[ng-click="showCust()"]');
  }

  async clickAddCustomerButton() {
    await this.addCustomerButton.waitFor({ state: 'visible', timeout: 5000 });
    await this.addCustomerButton.click();
  }

  async clickOpenAccountButton() {
    await this.openAccountButton.waitFor({ state: 'visible', timeout: 5000 });
    await this.openAccountButton.click();
  }

  async clickCustomersButton() {
    const btn = this.customersButton;
    await btn.waitFor({ state: 'visible', timeout: 5000 });
    try {
      await btn.click({ timeout: 3000 });
    } catch {
      await this.page.evaluate(() => {
        const el = document.querySelector('button[ng-click="showCust()"]');
        if (el) el.click();
      });
    }
    await this.page.waitForSelector('.table.table-bordered', { timeout: 5000 });
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager');
  }

  async clickAddCustomer() {
    return this.clickAddCustomerButton();
  }

  async clickOpenAccount() {
    return this.clickOpenAccountButton();
  }

  async clickCustomers() {
    return this.clickCustomersButton();
  }
}
