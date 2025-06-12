import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.searchCustomerInput = page.getByPlaceholder('Search Customer');
    this.customersTableRows = page.locator('table tbody tr');
    this.customersTable = page.locator('table');
  }

  async search(name) {
    await this.searchCustomerInput.fill(name);
  }

  async getVisibleRows() {
    const count = await this.customersTableRows.count();
    const visibleRows = [];
    for (let i = 0; i < count; i++) {
      const row = this.customersTableRows.nth(i);
      if (await row.isVisible()) {
        visibleRows.push(row);
      }
    }
    return visibleRows;
  }

  async searchCustomer(name) {
    await this.searchCustomerInput.fill(name);
  }

  async deleteCustomer(name) {
    await this.searchCustomer(name);
    await this.customersTableRows.first().locator('button', { hasText: 'Delete' }).click();
  }

  async deleteCustomerByName(name) {
  
    await this.deleteCustomer(name);
  }

  async verifyCustomerNotInList(name) {
    await this.searchCustomer(name);
    await expect(this.customersTable).not.toContainText(name);
  }

  async verifyCustomerInList(customer) {
    const { firstName, lastName, postCode } = customer;
    await this.searchCustomer(firstName);
    const row = this.customersTableRows.first();
    await expect(row).toContainText(firstName);
    await expect(row).toContainText(lastName);
    await expect(row).toContainText(postCode);
  }

  getCustomerRow(name) {
    return this.customersTableRows.filter({ hasText: name });
  }

  getLastCustomerRow() {
    return this.customersTableRows.last();
  }
}
