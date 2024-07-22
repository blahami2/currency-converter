import React from "react";
import styled from "styled-components";
import { useExchangeRates } from "../hooks/useExchangeRates";

const ScrollableTableContainer = styled.div`
  border-top: 1px solid #ddd;
  background-color: #494949;
  max-height: 40vh;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  position: sticky;
  top: 0;
  border-left: 1px solid #ddd;
  padding: 8px;
  text-align: left;
  background-color: #494949;
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

  return (
    <div>
      <h2>Exchange Rates</h2>
      <ScrollableTableContainer>
        <Table data-testid="currency-table">
          <thead>
            <TableRow>
              <TableHeader>Country</TableHeader>
              <TableHeader>Currency</TableHeader>
              <TableHeader>Amount</TableHeader>
              <TableHeader>Code</TableHeader>
              <TableHeader>Rate</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {data?.map((rate) => (
              <TableRow key={rate.code}>
                <TableData>{rate.country}</TableData>
                <TableData>{rate.currency}</TableData>
                <TableData>{rate.amount}</TableData>
                <TableData>{rate.code}</TableData>
                <TableData>{rate.rate}</TableData>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </ScrollableTableContainer>
    </div>
  );
};

export default ExchangeRateList;
