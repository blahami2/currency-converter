import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useExchangeRates } from "../hooks/useExchangeRates";
import { ExchangeRate } from "../models/ExchangeRate";
import { floorWithFixedPrecision } from "../utils/math";
import InputWithUnit from "./InputWithUnit";

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

  const [amount, setAmount] = useState<number | null>(null);
  const [currency, setCurrency] = useState("");
  const [result, setResult] = useState<number>(0);

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
    } else {
      setResult(0);
    }
  }, [amount, currency, data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data: {error?.message}</div>;

  // TODO fix formatting

  return (
    <div>
      <h2>Currency Converter</h2>
      <h3>Convert CZK to another currency</h3>
      <Form>
        <table>
          <tr>
            <td colSpan="2">
              <InputWithUnit
                type="number"
                value={amount || ""}
                onChange={(e) => {
                  setAmount(e.target.value ? parseFloat(e.target.value) : 0);
                }}
                placeholder="Amount in CZK"
                data-testid="amount-input"
                unit="CZK"
                // Allow only positive numbers with up to 2 decimal places
                regexp={/^\d*\.?\d{0,2}$/}
              />
            </td>
          </tr>
          <tr>
            <td>
              <Input
                type="number"
                // always round down to present a more conservative estimate
                value={result ? floorWithFixedPrecision(result, 2) : 0}
                readOnly
                placeholder="Converted amount"
                data-testid="result"
              />
            </td>
            <td>
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
            </td>
          </tr>
        </table>
      </Form>
    </div>
  );
};

export default CurrencyConverterForm;
