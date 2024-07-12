import React from "react";
import styled from "styled-components";

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ListItem = styled.li`
  margin: 5px 0;
`;

const ExchangeRateList: React.FC = () => {
  const data = [
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

  return (
    <div>
      <h1>Currency Exchange</h1>
      <List>
        {data?.map((rate) => (
          <ListItem key={rate.code}>
            {rate.code}: {rate.rate}
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ExchangeRateList;
