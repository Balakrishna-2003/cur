import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { currencyConverter } from './api/postapi.jsx';

function App() {
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleConvertCurrency = async () =>{
    setLoading(true);
    setError(null);
    try {
      const response =await currencyConverter(fromCurrency, toCurrency, amount);
      const {conversion_result} = await response.data;
      // console.log(data);
      setConvertedAmount(conversion_result);
    } catch (error) {
      setError("Error fetching conversion rate ");
      console.log(error);
    }
    setLoading(false);
  }

  return <section className='currency-converter'> 
    <div className='currency-div'>
      <h1>Currency Converter</h1>
      <div>
        <label htmlFor='currency_amount'>Amount: </label>
        <input type='number' id='currency_amount' value={amount} onChange={(e) => {
          setAmount(e.target.value);
        }}/>
      </div>
      <div>
        <label htmlFor=''>From: 
          <select  value={fromCurrency} onChange={(e) => {setFromCurrency(e.target.value)}}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="INR">INR</option>
            <option value="GBR">GBR</option>
            <option value="AUD">AUD</option>
          </select>
        </label>
      </div>
       <div>
        <label>To: 
          <select value={toCurrency} onChange={(e) => {setToCurrency(e.target.value)}}>
            <option value="INR">INR</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBR">GBR</option>
            <option value="AUD">AUD</option>
          </select>
        </label>
      </div>
      <button disabled={loading || amount <= 0} onClick={handleConvertCurrency}>{loading ? "converting..": "convert"}</button>
    
    <hr/>
    {
      convertedAmount && (
        <div>
          <h2>
            {amount} {fromCurrency} = {convertedAmount.toFixed(2)}
            {toCurrency}
          </h2>
        </div>
      )
    }
    {error && <p>{error}</p>}
    </div>
  </section>
}

export default App;
