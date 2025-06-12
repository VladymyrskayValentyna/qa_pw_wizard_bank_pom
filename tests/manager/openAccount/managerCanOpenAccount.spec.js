/*
 Pre-conditons:
 1. Open Add Customer page
 2. Fill the First Name. 
 3. Fill the Last Name.
 4. Fill the Postal Code.
 5. Click [Add Customer].
 6. Reload the page (This is a simplified step to close the popup).
 */
import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';

import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';



let firstName;
let lastName;
let postalCode;


test.beforeEach(async ({ page }) => {
 const addCustomerPage = new AddCustomerPage(page);


 
 firstName = faker.person.firstName();
 lastName = faker.person.lastName();
 postalCode = faker.location.zipCode();


 
 await addCustomerPage.open();
 await addCustomerPage.fillFirstName(firstName);
 await addCustomerPage.fillLastName(lastName);
 await addCustomerPage.fillPostCode(postalCode);
 await addCustomerPage.clickAddCustomer();


 
 await page.reload();
});


 /*
 Test:
 1. Click [Open Account].
 2. Select Customer name you just created.
 3. Select currency.
 4. Click [Process].
 5. Reload the page (This is a simplified step to close the popup).
 6. Click [Customers].
 7. Assert the customer row has the account number not empty.


 Tips:
 1. Do not rely on the customer row id for the step 13.
   Use the ".last()" locator to get the last row.
 */
test('Assert manager can add new account for customer', async ({ page }) => {
 const managerPage = new BankManagerMainPage(page);
 const openAccountPage = new OpenAccountPage(page);
 const customersListPage = new CustomersListPage(page);


 await managerPage.clickOpenAccount();


 
 await openAccountPage.selectCustomer(`${firstName} ${lastName}`);
 await openAccountPage.selectCurrency('Dollar');
 await openAccountPage.clickProcess();


 await page.reload();


 await managerPage.clickCustomers();


 const lastRow = customersListPage.getLastCustomerRow();
 await expect(lastRow.locator('td').nth(0)).toHaveText(firstName);
 await expect(lastRow.locator('td').nth(1)).toHaveText(lastName);
 await expect(lastRow.locator('td').nth(2)).toHaveText(postalCode);
 await expect(lastRow.locator('td').nth(3)).not.toBeEmpty();
});


