import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useExchangeRates } from "../hooks/useExchangeRates";
import { ExchangeRate } from "../models/ExchangeRate";
import { floorWithFixedPrecision } from "../utils/math";
import InputWithUnit from "./InputWithUnit";

// Styled components
const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%; // Adjust this as needed
`;

const FullWidthInput = styled(InputWithUnit)`
  width: 100%;
`;

const PartialWidthInput = styled.input`
  margin: 10px 0;
  padding: 10px;
  width: 82%;
`;

const Select = styled.select`
  margin: 10px 0;
  padding: 10px;
  width: 15%; // Adjust for margin/padding
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

  return (
    <div>
      <h2>Currency Converter</h2>
      <h3>Convert CZK to another currency</h3>
      <StyledForm>
        <FullWidthInput
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
        <Row>
          <PartialWidthInput
            type="text"
            // always round down to present a more conservative estimate
            value={result ? floorWithFixedPrecision(result, 2) : ""}
            readOnly
            placeholder="Converted amount"
            data-testid="amount-output"
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
        </Row>
      </StyledForm>
    </div>
  );
};

export default CurrencyConverterForm;
