import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { ExchangeRate } from "../models/ExchangeRate";
import axios from "axios";

const fetchExchangeRates = async (): Promise<ExchangeRate[]> => {
  const response = await axios.get(
    "/api/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt"
  );
  const lines = response.data.split("\n").slice(2); // Skip the header lines
  return lines
    .map((line: string) => {
      const [country, currency, amount, code, rate] = line.split("|");
      // Example condition: check if any field is empty TODO be more defensive
      if (!country || !currency || !amount || !code || !rate) {
        return null;
      }
      return {
        country,
        currency,
        amount: parseInt(amount, 10),
        code,
        rate: parseFloat(rate),
      };
    })
    .filter((item: ExchangeRate) => item !== null);
};

export const useExchangeRates = (): UseQueryResult<ExchangeRate[], Error> => {
  return useQuery({
    queryKey: ["exchangeRates"],
    queryFn: fetchExchangeRates,
  });
};
