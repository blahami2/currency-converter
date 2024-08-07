# Currency converter

![Node.js CI](https://github.com/blahami2/currency-converter/actions/workflows/node.js.yml/badge.svg)

## Task description

Create a simple React app (don’t use NextJS please), which:

1. When it starts, retrieve the latest currency exchange rates from the Czech National Bank.
    * API URL: <https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt>
    * Documentation: [Format of the foreign exchange market rates | FAQ | CNB](https://www.cnb.cz/en/faq/Format-of-the-foreign-exchange-market-rates/)
2. Parses the downloaded data and clearly displays a list to the user in the UI.
3. Add a simple form, into which the customer can enter an amount in CZK and select a currency, and after submitting (clicking a button or in real-time) sees the amount entered in CZK converted into the selected currency.
4. Commit your code throughout your work and upload the resulting codebase into a Github repo.
5. Deploy the app so it can be viewed online (it doesn’t matter where - e.q. Vercel, Netflify, etc.).
6. Add automated tests which might be appropriate to ensure that your solution is working correctly.
7. Tech stack: React (+ Hooks), TypeScript, Styled Components, React Query.

Overall: Keep the code simple and the UI nice and easy to use for the user.

## Setup

```bash
npm install
npx install playwright
```

## Run tests

```bash
npm run test
```

### Unit + Integration tests only

```bash
npm run test:jest
```

### End-to-end tests only

```bash
npm run test:playwright
```

## Demo

available at [Currency Exchange | Netlify](https://blahami2-currency-exchange.netlify.app/)
