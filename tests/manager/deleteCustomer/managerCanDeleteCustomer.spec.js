/*
 Pre-conditons:
 1. Open Add Customer page.
 2. Fill the First Name. 
 3. Fill the Last Name.
 4. Fill the Postal Code.
 5. Click [Add Customer].
 */
import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';

import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';


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
 await addCustomerPage.fillPostalCode(postalCode);
 await addCustomerPage.clickAddCustomer();


 
 await page.reload();


});


 /*
 Test:
 1. Open Customers page.
 2. Click [Delete] for the row with customer name.
 3. Assert customer row is not present in the table.
 4. Reload the page.
 5. Assert customer row is not present in the table.
 */
test('Assert manager can delete customer', async ({ page }) => {
 const managerPage = new BankManagerMainPage(page);
 const customersPage = new CustomersListPage(page);


 await managerPage.clickCustomersButton();


 
 await customersPage.deleteCustomerByName(firstName);


 
 await expect(customersPage.getCustomerRow(firstName)).toHaveCount(0);


 
 await page.reload();
 await expect(customersPage.getCustomerRow(firstName)).toHaveCount(0);
});
