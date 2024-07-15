import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CurrencyConverterForm from "../components/CurrencyConverterForm";

let inputElement: HTMLInputElement;
let selectElement: HTMLSelectElement;

beforeEach(() => {
  // given
  render(<CurrencyConverterForm />);
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
  expect(screen.getByText(/Converted Amount: 4.63 USD/i)).toBeInTheDocument();
  // when#3
  // - change the amount
  fireEvent.change(inputElement, { target: { value: "200" } });
  // then#3
  // - check the correct converted amount is displayed
  expect(screen.getByText(/Converted Amount: 9.26 USD/i)).toBeInTheDocument();
});
