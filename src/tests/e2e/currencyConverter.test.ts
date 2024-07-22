import { test, expect } from "@playwright/test";

test.describe("Currency Converter", () => {
  test.beforeEach(async ({ page }) => {
    // given
    // - intercept the API request and provide a mock response
    await page.route(
      "/api/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt",
      (route) => {
        route.fulfill({
          status: 200,
          body: `Date|21 Jul 2023
        Country|Currency|Amount|Code|Rate
        USA|Dollar|1|USD|22.5
        Eurozone|Euro|1|EUR|26.5`,
        });
      }
    );
    // - visit the app
    await page.goto("/");
  });

  test("should display available rates", async ({ page }) => {
    // when
    // - wait for the currency list to be displayed
    const resultText = await page.textContent('[data-testid="currency-table"]');
    // then
    // - check if the table contains the expected data (ignore whitespaces)
    expect(resultText?.replace(/\s/g, "")).toContain(
      `Country  Currency Amount Code Rate
       USA      Dollar   1      USD  22.5
       Eurozone Euro     1      EUR  26.5`.replace(/\s/g, "")
    );
  });

  test("should convert currency correctly", async ({ page }) => {
    // when
    // - set amount and currency
    await page.fill('[data-testid="amount-input"]', "1000");
    await page.selectOption('[data-testid="currency-select"]', "EUR");
    // then
    const inputText = await page.inputValue('[data-testid="amount-input"]');
    expect(inputText).toBe("1000");
    const selectText = await page.textContent('[data-testid="currency-select"]');
    expect(selectText).toContain("EUR");
    const resultText = await page.inputValue('[data-testid="amount-output"]');
    expect(resultText).toContain("37.73");
  });
});
