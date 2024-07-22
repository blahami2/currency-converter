import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import ExchangeRateList from "../../../components/ExchangeRateList";

// mock the useQuery hook
jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useQuery: jest.fn(),
}));

const rates = [
  { country: "United States", currency: "Dollar", amount: 1, code: "USD", rate: 21.6 },
  { country: "Eurozone", currency: "Euro", amount: 1, code: "EUR", rate: 25.5 },
  { country: "Great Britain", currency: "Pound", amount: 1, code: "GBP", rate: 29.7 },
  { country: "Switzerland", currency: "Franc", amount: 100, code: "CHF", rate: 23.6 },
];
let tableElement: HTMLTableElement;

beforeEach(() => {
  // given
  // - mock implementation of useQuery
  (useQuery as jest.Mock).mockImplementation(() => ({
    data: rates,
    error: null,
    isLoading: false,
  }));
  // - render and get form elements
  const queryClient = new QueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <ExchangeRateList />
    </QueryClientProvider>
  );
  tableElement = screen.getByTestId("currency-table") as HTMLTableElement;
});

test("should display available rates", () => {
  // when
  // - data loaded
  // then
  expect(tableElement.textContent).toContain(
    "CountryCurrencyAmountCodeRate" +
      rates.map((rate) => `${rate.country}${rate.currency}${rate.amount}${rate.code}${rate.rate}`).join("")
  );
});
