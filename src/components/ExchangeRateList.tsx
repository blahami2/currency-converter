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
`;

const TableRow = styled.tr``;

const TableData = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

const ExchangeRateList: React.FC = () => {
  const { data, isLoading, error } = useExchangeRates();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data: {error?.message}</div>;

  // TODO add all data - amount, currency name, ...
  return (
    <div>
      <h2>Exchange Rates</h2>
      <Table data-testid="currency-table">
        <thead>
          <TableRow>
            <TableHeader>Country</TableHeader>
            <TableHeader>Currency</TableHeader>
            <TableHeader>Rate</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {data?.map((rate) => (
            <TableRow key={rate.code}>
              <TableData>{rate.country}</TableData>
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
