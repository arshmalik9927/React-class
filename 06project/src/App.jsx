
import { useState } from "react";
import "./App.css";
import Inputbox from "./components/input";
import useCurrencyInfo from "./hooks/useCurrencyinfo";

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo).length
    ? ["usd", "inr", "eur", "gbp", "jpy"]
    : [];

  const swap = () => {
    setFrom(to);
    setTo(from);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  };

  const convert = () => {
    if (currencyInfo.rate) {
      setConvertedAmount(amount * currencyInfo.rate);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat bg-center bg-gray-800">
      <div className="w-full max-w-md mx-auto border border-gray-300 rounded-xl p-5 bg-white/20 backdrop-blur-sm">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}
        >
          <div className="w-full mb-4">
            <Inputbox
              label="From"
              amount={amount}
              onAmountChange={setAmount}
              currencyOptions={options}
              selectCurrency={from}
              onCurrencyChange={setFrom}
            />
          </div>

          <div className="relative w-full h-0.5">
            <button
              type="button"
              onClick={swap}
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-3 py-1"
            >
              Swap
            </button>
          </div>

          <div className="w-full mt-4 mb-4">
            <Inputbox
              label="To"
              amount={convertedAmount}
              amountDisable
              currencyOptions={options}
              selectCurrency={to}
              onCurrencyChange={setTo}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700"
          >
            Convert {from.toUpperCase()} to {to.toUpperCase()}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
