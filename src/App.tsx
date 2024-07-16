import React from "react";
import ExchangeRateList from "./components/ExchangeRateList";
import CurrencyConverterForm from "./components/CurrencyConverterForm";

const App: React.FC = () => {
  return (
    <div className="grid">
      <h1>Currency Exchange</h1>
      <section>
        <ExchangeRateList />
      </section>
      <section>
        <CurrencyConverterForm />
      </section>
    </div>
  );
};

export default App;
