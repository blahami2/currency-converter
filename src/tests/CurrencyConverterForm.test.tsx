import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CurrencyConverterForm from "../components/CurrencyConverterForm";

test("renders Currency Converter heading", () => {
  render(<CurrencyConverterForm />);
  const headingElement = screen.getByRole("heading", {
    name: /Currency Converter/i,
  });
  expect(headingElement).toBeInTheDocument();
});

test("renders Convert CZK to another currency heading", () => {
  render(<CurrencyConverterForm />);
  const headingElement = screen.getByRole("heading", {
    name: /Convert CZK to another currency/i,
  });
  expect(headingElement).toBeInTheDocument();
});

test("updates amount state when input value changes", () => {
  render(<CurrencyConverterForm />);
  const inputElement = screen.getByTestId("amount-input") as HTMLInputElement;
  fireEvent.change(inputElement, { target: { value: "100" } });
  expect(inputElement.value).toBe("100");
});

test("updates currency state when select value changes", () => {
  render(<CurrencyConverterForm />);
  const selectElement = screen.getByTestId("currency-select") as HTMLSelectElement;
  fireEvent.change(selectElement, { target: { value: "EUR" } });
  expect(selectElement.value).toBe("EUR");
});

test("calculates and displays converted amount when amount or currency is changed", () => {
  // given
  render(<CurrencyConverterForm />);
  const inputElement = screen.getByTestId("amount-input");
  const selectElement = screen.getByTestId("currency-select");
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
  expect(screen.getByText(/Converted Amount: 4.63 USD/i)).toBeInTheDocument();
  // when#3
  // - change the amount
  fireEvent.change(inputElement, { target: { value: "200" } });
  // then#3
  // - check the correct converted amount is displayed
  expect(screen.getByText(/Converted Amount: 9.26 USD/i)).toBeInTheDocument();
});
