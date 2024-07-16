import React from "react";
import styled from "styled-components";
import { useExchangeRates } from "../hooks/useExchangeRates";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
  background-color: #f2f2f2;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableData = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

const ExchangeRateList: React.FC = () => {
  const { data, isLoading, error } = useExchangeRates();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data: {error?.message}</div>;

  return (
    <div>
      <h2>Exchange Rates</h2>
      <Table data-testid="currency-table">
        <thead>
          <TableRow>
            <TableHeader>Currency</TableHeader>
            <TableHeader>Rate</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {data?.map((rate) => (
            <TableRow key={rate.code}>
              <TableData>{rate.code}</TableData>
              <TableData>{rate.rate}</TableData>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ExchangeRateList;
