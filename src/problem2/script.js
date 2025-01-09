import { currenciesStore } from "./utils/currencyStore.js";
import { swapPrice } from "./utils/swapPrice.js";

// fetch currencies from https://interview.switcheo.com/prices.json
// Note: Currently, I use this API to get currency list, but it better to have another API to get those.
function fetchCurrencies() {
  fetch("https://interview.switcheo.com/prices.json")
    .then((response) => response.json())
    .then((currencies) => {

			// store response value to currencyStore
			currencies.forEach((c) => {
				currenciesStore.setCurrencies(c.currency, c.price);
			});

      // get HTML elements have classname is 'currency-list'
      const currencyList = Array.from(document.getElementsByClassName("currency-list"));

      // create option element for each currency
      currencies.forEach((c) => {
        // add currency option to each currency-list select element
				currencyList.forEach((list) => {
					let option = document.createElement("option");
					option.value = c.currency;
					option.text = c.currency;

					list.appendChild(option);
				});
      });
    });
}

// add event listener to currency-list select element
const swapBtn = document.getElementById('swap');
swapBtn.addEventListener('click', () => {
	const originalCurrency = document.getElementById('input-currency').value;
	const targetCurrency = document.getElementById('output-currency').value;
	const amount = document.getElementById('input-amount').value;

	const result = swapPrice(originalCurrency, targetCurrency, amount);
	document.getElementById('output-amount').value = `${result}`;
});

// run function when the page is loaded
fetchCurrencies();
