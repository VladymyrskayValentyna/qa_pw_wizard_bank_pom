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
 await addCustomerPage.fillPostCode(postalCode);
 await addCustomerPage.clickAddCustomer();
});


test('Assert manager can search customer by Last Name', async ({ page }) => {
 const managerPage = new BankManagerMainPage(page);
 const customersListPage = new CustomersListPage(page);


 await managerPage.clickCustomers();


 await customersListPage.search(lastName);


 const visibleRows = await customersListPage.getVisibleRows();
 expect(visibleRows.length).toBe(1);


 const row = visibleRows[0];
 await expect(row.locator('td').nth(1)).toHaveText(lastName); 
});


