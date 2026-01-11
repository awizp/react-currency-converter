import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {

  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [exchangeRate, setExchangeRate] = useState(null);
  const [convertedAmount, setConvertedAmount] = useState(null);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getExchangeRate = async () => {
      try {
        setLoading(true);

        const url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
        const res = await axios.get(url);
        setExchangeRate(res.data.rates[toCurrency]);

      } catch (error) {
        console.error("Error in fetching currency from API", error);
      } finally {
        setLoading(false);
      }
    };
    getExchangeRate();
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    if (exchangeRate !== null) {
      let convertedCurrency = (amount * exchangeRate).toFixed(2);
      setConvertedAmount(convertedCurrency);
    }
  }, [amount, exchangeRate]);

  const handleAmountChange = (e) => {
    let value = parseFloat(e.target.value);

    if (isNaN(value)) {
      setError(true);
      setAmount(0);
    } else {
      setError(false);
      setAmount(value);
    }
  };

  return (
    <>
      <section className="bg-zinc-900 rounded-xl p-10 flex flex-col md:flex-row justify-center items-center gap-10">
        {/* banner */}
        <div className="w-full">
          <img src="/banner.svg" alt="Currencies banner" />
        </div>

        {/* content */}
        <div className="w-full flex flex-col items-start justify-center gap-5">
          <h1 className="text-purple-800 font-bold text-2xl">Currency Converter</h1>

          {/* amount value */}
          <div className="w-full flex flex-col justfiy-center items-start">
            <label htmlFor="weight" className="text-sm text-blue-700 mb-2 font-semibold">Your Amount:</label>
            <input placeholder="Enter your amount" className="border-2 border-gray-500/20 rounded p-2 outline-none w-full" value={amount} onChange={handleAmountChange} />
          </div>

          {/* error message */}
          {error && <p className="text-xs text-red-500">Please enter valid amount</p>}

          {/* from currency value */}
          <div className="w-full flex flex-col justfiy-center items-start">
            <label htmlFor="fromCurrency" className="text-sm text-blue-700 mb-2 font-semibold">From Currency:</label>
            <select className="border-2 border-gray-500/20 rounded p-2 outline-none w-full bg-zinc-800"
              value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
              <option value="USD">USD - United States Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound Sterling</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="AUD">AUD - Australian Dollar</option>
              <option value="CAD">CAD - Canadian Dollar</option>
              <option value="CNY">CNY - Chinese Yuan</option>
              <option value="INR">INR - Indian Rupee</option>
              <option value="BRL">BRL - Brazilian Real</option>
              <option value="ZAR">ZAR - South African Rand</option>
            </select>
          </div>

          {/* to currency value */}
          <div className="w-full flex flex-col justfiy-center items-start">
            <label htmlFor="toCurrency" className="text-sm text-blue-700 mb-2 font-semibold">To Currency:</label>
            <select className="border-2 border-gray-500/20 rounded p-2 outline-none w-full bg-zinc-800"
              value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
              <option value="USD">USD - United States Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound Sterling</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="AUD">AUD - Australian Dollar</option>
              <option value="CAD">CAD - Canadian Dollar</option>
              <option value="CNY">CNY - Chinese Yuan</option>
              <option value="INR">INR - Indian Rupee</option>
              <option value="BRL">BRL - Brazilian Real</option>
              <option value="ZAR">ZAR - South African Rand</option>
            </select>
          </div>

          {/* converted amount */}
          <div className="border-2 border-dotted border-purple-800/40 rounded-xl p-5">
            {!loading && !error ? (
              <p className="text-sm font-semibold">
                <span className="text-purple-700 ms-3"> {amount} {fromCurrency}</span> is Equal to <span className="text-purple-700">{convertedAmount} {toCurrency}</span></p>
            ) : (
              <p className="text-sm font-semibold">Please wait...</p>
            )}
          </div>

        </div>
      </section>

      <footer className="text-center text-black py-5 mt-10">
        <p className="text-sm font-semibold">Mentored by <a href="https://youtu.be/RNq1nYnhcuE?si=E0Z19DBQQjaxoK2n" className="text-zinc-900 hover:text-black transition-colors">Tutor Joes</a></p>
      </footer>
    </>
  );
};

export default App;