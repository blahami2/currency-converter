
import React from 'react';
import ExchangeRateList from './components/ExchangeRateList';
import CurrencyConverterForm from './components/CurrencyConverterForm';

const App: React.FC = () => {
  return (
    <div class="grid">
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
