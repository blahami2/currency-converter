import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useExchangeRates } from "../hooks/useExchangeRates";
import { ExchangeRate } from "../models/ExchangeRate";
import { floorWithFixedPrecision } from "../utils/math";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 20px auto;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
`;

const Select = styled.select`
  margin: 10px 0;
  padding: 10px;
`;

function calculateAmountInCzk(amount: number, rate: ExchangeRate): number {
  return (rate.amount * amount) / rate.rate;
}

const CurrencyConverterForm: React.FC = () => {
  const { data, error, isLoading } = useExchangeRates();

  const [amount, setAmount] = useState<number>(0);
  const [currency, setCurrency] = useState("");
  const [result, setResult] = useState<number | null>(0);

  useEffect(() => {
    // set default currency upon data loaded
    if (data && data.length > 0) {
      setCurrency(data[0].code);
    }
  }, [data]);

  useEffect(() => {
    // calculate result when amount or currency changes or data load
    const exchangeRate = data?.find((rate) => rate.code === currency);
    if (amount && exchangeRate) {
      setResult(calculateAmountInCzk(amount, exchangeRate));
    }
  }, [amount, currency, data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data: {error?.message}</div>;

  return (
    <div>
      <h2>Currency Converter</h2>
      <h3>Convert CZK to another currency</h3>
      <Form>
        <Input
          type="number"
          value={amount}
          onChange={(e) => {
            // TODO add CZK as unit (create a react component), add restrictions (e.g. only positive numbers, only 2 decimals)
            setAmount(e.target.value ? parseFloat(e.target.value) : 0);
          }}
          placeholder="Amount in CZK"
          data-testid="amount-input"
        />
        <Select
          value={currency}
          onChange={(e) => {
            setCurrency(e.target.value);
          }}
          data-testid="currency-select"
        >
          {data?.map((rate) => (
            <option key={rate.code} value={rate.code}>
              {rate.code}
            </option>
          ))}
        </Select>
        {result != null && (
          // always round down to present a more conservative estimate
          <div data-testid="result">
            Converted Amount: {floorWithFixedPrecision(result, 2)} {currency}
          </div>
        )}
      </Form>
    </div>
  );
};

export default CurrencyConverterForm;
