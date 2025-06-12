export class CustomersPage {
  constructor(page) {
    this.page = page;

    this.customersTableRows = page.locator('table tbody tr');
    this.searchInput = page.locator('input[placeholder="Search Customer"]');
  }

  async open() {
  
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/customers');
  }

  async searchCustomerByName(name) {
    await this.searchInput.fill(name);
    await this.page.waitForTimeout(500);
  }

  async deleteCustomerByName(name) {
  
    const rowsCount = await this.customersTableRows.count();

    for (let i = 0; i < rowsCount; i++) {
      const row = this.customersTableRows.nth(i);
      const firstName = await row.locator('td').nth(0).innerText();

      if (firstName.trim() === name) {
        const deleteButton = row.locator('button', { hasText: 'Delete' });
        await deleteButton.click();
        return;  
      }
    }

    throw new Error(`Customer with first name "${name}" not found`);
  }
}
