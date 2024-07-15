import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
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
  const inputElement = screen.getByPlaceholderText("Amount in CZK");
  fireEvent.change(inputElement, { target: { value: "100" } });
  expect(inputElement.value).toBe("100");
});

test("updates currency state when select value changes", () => {
  render(<CurrencyConverterForm />);
  const selectElement = screen.getByRole("combobox");
  fireEvent.change(selectElement, { target: { value: "EUR" } });
  expect(selectElement.value).toBe("EUR");
});

test("calculates and displays converted amount when form is submitted", () => {
  render(<CurrencyConverterForm />);
  const inputElement = screen.getByPlaceholderText("Amount in CZK");
  const selectElement = screen.getByRole("combobox");
  const submitButton = screen.getByRole("button", { name: /submit/i });

  fireEvent.change(inputElement, { target: { value: "100" } });
  fireEvent.change(selectElement, { target: { value: "EUR" } });
  fireEvent.click(submitButton);

  const convertedAmountElement = screen.getByText(/Converted Amount:/i);
  expect(convertedAmountElement).toBeInTheDocument();
});
