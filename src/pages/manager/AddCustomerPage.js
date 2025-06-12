import { expect } from '@playwright/test';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.locator('input[placeholder="First Name"]');
    this.lastNameInput = page.locator('input[placeholder="Last Name"]');
    this.postalCodeInput = page.locator('input[placeholder="Post Code"]');
    this.addCustomerButton = page.locator('button[type="submit"]');
  }

  async open() {
    await this.page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/addCust');
  }

  async fillFirstName(name) {
    await this.firstNameInput.fill(name);
  }

  async fillLastName(name) {
    await this.lastNameInput.fill(name);
  }

  
  async fillPostalCode(code) {
    await this.postalCodeInput.fill(code);
  }

  async fillPostCode(code) {
    await this.fillPostalCode(code);
  }

  async clickAddCustomer() {
    await this.addCustomerButton.click();
  }
}
