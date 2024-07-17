import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import CurrencyConverterForm from "../../../components/CurrencyConverterForm";

// mock the useQuery hook
jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useQuery: jest.fn(),
}));

const rates = [
  { country: "United States", currency: "Dollar", amount: 1, code: "USD", rate: 21.6 },
  { country: "Eurozone", currency: "Euro", amount: 1, code: "EUR", rate: 25.5 },
  { country: "Great Britain", currency: "Pound", amount: 1, code: "GBP", rate: 29.7 },
  { country: "Turkey", currency: "Lira", amount: 100, code: "TRY", rate: 23.6 },
];
let inputElement: HTMLInputElement;
let selectElement: HTMLSelectElement;

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
      <CurrencyConverterForm />
    </QueryClientProvider>
  );
  inputElement = screen.getByTestId("amount-input") as HTMLInputElement;
  selectElement = screen.getByTestId("currency-select") as HTMLSelectElement;
});

test("renders Currency Converter heading", () => {
  // when
  const headingElement = screen.getByRole("heading", {
    name: /Currency Converter/i,
  });
  // then
  expect(headingElement).toBeInTheDocument();
});

test("handles empty amount", () => {
  // when
  fireEvent.change(inputElement, { target: { value: "" } });
  // then
  expect(screen.getByText(/Converted Amount: 0.00 USD/i)).toBeInTheDocument();
});

test("renders Convert CZK to another currency heading", () => {
  // when
  const headingElement = screen.getByRole("heading", {
    name: /Convert CZK to another currency/i,
  });
  // then
  expect(headingElement).toBeInTheDocument();
});

test("updates amount state when input value changes", () => {
  // when
  fireEvent.change(inputElement, { target: { value: "100" } });
  // then
  expect(inputElement.value).toBe("100");
});

test("updates currency state when select value changes", () => {
  // when
  fireEvent.change(selectElement, { target: { value: "EUR" } });
  // then
  expect(selectElement.value).toBe("EUR");
});

test("calculates and displays converted amount when amount or currency is changed", () => {
  // when#1
  // - set amount and currency
  fireEvent.change(inputElement, { target: { value: "100" } });
  fireEvent.change(selectElement, { target: { value: "EUR" } });
  // then#1
  // - check the correct converted amount is displayed
  expect(screen.getByText(/Converted Amount: 3.92 EUR/i)).toBeInTheDocument();
  // when#2
  // - change the currency
  fireEvent.change(selectElement, { target: { value: "USD" } });
  // then#2
  // - check the correct converted amount is displayed
  expect(screen.getByText(/Converted Amount: 4.62 USD/i)).toBeInTheDocument();
  // when#3
  // - change the amount
  fireEvent.change(inputElement, { target: { value: "200" } });
  // then#3
  // - check the correct converted amount is displayed
  expect(screen.getByText(/Converted Amount: 9.25 USD/i)).toBeInTheDocument();
});

test("rate amount is properly reflected in calculation", () => {
  // when
  fireEvent.change(selectElement, { target: { value: "TRY" } });
  fireEvent.change(inputElement, { target: { value: "100" } });
  // then
  expect(screen.getByText(/Converted Amount: 423.72 TRY/i)).toBeInTheDocument();
});
