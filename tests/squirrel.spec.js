// @ts-check
import { test, expect } from '@playwright/test';

test('home page test', async ({ page }) => {
  await page.goto('https://squirrel.antoniocoutinho.pt/');

  // Verify if all labels are as expected
  await expect(page.getByRole('combobox')).toContainText('Select Departure Airport');
  await expect(page.getByRole('button')).toContainText('Search Flights');

  // Select Porto as departure Airport and click on Search

  await page.getByRole('combobox').selectOption('OPO');
  await page.getByRole('button', { name: 'Search Flights' }).click();

  // Verify if the arrivel aiport dropdown is displayed
  await expect(page.getByRole('combobox').nth(1)).toBeVisible();

  // Select Naples as arrivel Airport and click on Search

  await page.getByRole('combobox').nth(1).selectOption('NAP');
  await page.getByRole('button', { name: 'Search Flights' }).click();

  // Verify if the tables are displayed and their labels and buttons

  await expect(page.locator('#root')).toContainText('Date');
  await expect(page.locator('#root')).toContainText('Price');
  await expect(page.locator('#root')).toContainText('Airline');

  await expect(page.getByRole('cell', { name: 'Date' }).nth(1)).toContainText('Date');
  await expect(page.getByRole('cell', { name: 'Price' }).nth(1)).toContainText('Price');
  await expect(page.getByRole('cell', { name: 'Airline' }).nth(1)).toContainText('Airline');

  await expect(page.locator('#root div').filter({ hasText: 'DatePriceAirlineFri Jul 05 2024164.40VuelingSat Jul 06 2024204.99EasyjetSat Jul' }).nth(4)).toBeVisible();
  await expect(page.locator('#root div').filter({ hasText: 'DatePriceAirlineFri Jul 05 2024253.40VuelingSun Jul 07 2024370.40VuelingMon Jul' }).nth(4)).toBeVisible();
  await expect(page.getByRole('button', { name: 'SORT' }).first()).toBeVisible();
  await expect(page.getByRole('button', { name: 'No Decimals' }).first()).toBeVisible();
  await expect(page.getByRole('button', { name: 'SORT' }).nth(1)).toBeVisible();
  await expect(page.getByRole('button', { name: 'No Decimals' }).nth(1)).toBeVisible();

  // Verify if the sort buttons work

  const tableRows = await page.$$eval('#root div.sc-gKXOVf', rows => rows.map(row => row.textContent));

  const dates = tableRows.map(row => {
    const dateStr = row.split('Date')[1].split('Price')[0].trim();
    return new Date(dateStr);
  });

  const sortedDates = [...dates].sort((a, b) => a - b);
  expect(dates).toEqual(sortedDates);


  await page.close();
  
});