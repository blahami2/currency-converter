import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";

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
  const data = useMemo(
    () => [
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
    ],
    []
  );

  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState("USD");
  const [result, setResult] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const rate = data?.find((rate) => rate.code === currency)?.rate || 1;
    setResult(amount / rate);
  };

  useEffect(() => {
    const rate = data?.find((rate) => rate.code === currency)?.rate || 1;
    amount && setResult(amount / rate);
  }, [amount, currency, data]);

  return (
    <div>
      <h2>Currency Converter</h2>
      <h3>Convert CZK to another currency</h3>
      <Form onSubmit={handleSubmit}>
        <Input
          type="number"
          value={amount}
          onChange={(e) => {
            setAmount(parseFloat(e.target.value));
            //             updateResult()
          }}
          placeholder="Amount in CZK"
          data-testid="amount-input"
        />
        <Select
          value={currency}
          onChange={(e) => {
            setCurrency(e.target.value);
            //           updateResult()
          }}
          data-testid="currency-select"
        >
          {data?.map((rate) => (
            <option key={rate.code} value={rate.code}>
              {rate.code}
            </option>
          ))}
        </Select>
        {result && (
          <div>
            Converted Amount: {result.toFixed(2)} {currency}
          </div>
        )}
      </Form>
    </div>
  );
};

export default CurrencyConverterForm;
