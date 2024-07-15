import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { ExchangeRate } from "../models/ExchangeRate";

const fetchExchangeRates = async (): Promise<ExchangeRate[]> => {
  return [
    {
      country: "United States",
      currency: "Dollar",
      amount: 1,
      code: "USD",
      rate: 21.6,
    },
    {
      country: "Eurozone",
      currency: "Euro",
      amount: 1,
      code: "EUR",
      rate: 25.5,
    },
    {
      country: "Great Britain",
      currency: "Pound",
      amount: 1,
      code: "GBP",
      rate: 29.7,
    },
    {
      country: "Switzerland",
      currency: "Franc",
      amount: 100,
      code: "CHF",
      rate: 23.6,
    },
  ];
};

export const useExchangeRates = (): UseQueryResult<ExchangeRate[], Error> => {
  return useQuery(["exchangeRates"], fetchExchangeRates);
};
