// closure function to store the currencies and value
// By using closure, we can store the value in the memory and use it later.
export const currenciesStore = function () {
  // [currencyName: string]: Price - number
  let currencies = {};

  return {
    setCurrencies: (key, value) => {
      currencies[key] = value;
    },
    getCurrencyPrice: (key) => {
      return currencies[key];
    },
    getAllCurrencies: () => {
      return currencies;
    },
  };
}();
