import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useExchangeRates } from "../hooks/useExchangeRates";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 400px;
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
    const rate = data?.find((rate) => rate.code === currency)?.rate || 1;
    amount && setResult(amount / rate);
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
          <div data-testid="result">
            Converted Amount: {result.toFixed(2)} {currency}
          </div>
        )}
      </Form>
    </div>
  );
};

export default CurrencyConverterForm;
