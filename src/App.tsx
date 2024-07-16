import React from "react";
import "./App.css";
import ExchangeRateList from "./components/ExchangeRateList";
import CurrencyConverterForm from "./components/CurrencyConverterForm";

const App: React.FC = () => {
  return (
    <div className="app">
      <h1>Currency Exchange</h1>
      <div className="section">
        <ExchangeRateList />
      </div>
      <div className="section">
        <CurrencyConverterForm />
      </div>
    </div>
  );
};

export default App;
