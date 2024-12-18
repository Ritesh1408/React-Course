import { useState } from 'react'
import {InputBox} from './components'
import useCurrencyInfo from './hooks/useCurrencyInfo'


function App() {
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);

  const options = Object.keys(currencyInfo);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  };

  return (
    <div
      className="w-full h-screen flex flex-wrap bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/3532540/pexels-photo-3532540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
      }}
    >
      
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <div className="bg-slate-400 border rounded-xl p-10">
          <h1 className="text-cyan-700 text-center font-bold text-6xl underline decoration-cyan-500 decoration-wavy transition-all duration-500 ease-in-out hover:scale-110 hover:text-cyan-800">
            Currency Converter
          </h1>
        </div>
      </div>

      
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <div className="w-full max-w-md border border-gray-200 shadow-2xl rounded-xl p-8 bg-gradient-to-br from-gray-100 to-gray-300 backdrop-blur-md">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-4">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)}
                selectCurrency={from}
                onAmountChange={(amount) => setAmount(amount)}
              />
            </div>
            <div className="relative w-full h-10 flex justify-center items-center my-4">
              <button
                type="button"
                className="absolute border-2 border-white rounded-full bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition-all duration-300 ease-in-out"
                onClick={swap}
              >
                Swap
              </button>
            </div>
            <div className="w-full mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency)}
                selectCurrency={to}
                amountDisable
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg relative overflow-hidden group hover:bg-blue-700 transition-all duration-300 ease-in-out"
            >
              <span
                className="absolute inset-0 bg-blue-500 transition-transform duration-300 ease-in-out -translate-x-full group-hover:translate-x-0 z-0"
              ></span>
              <span
                className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-25 z-0"
              ></span>
              <span className="relative z-10">
                Convert {from.toUpperCase()} to {to.toUpperCase()}
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;


