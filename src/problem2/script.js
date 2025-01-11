import { swapPrice } from "./utils/swapPrice.js";

// fetch currencies from https://interview.switcheo.com/prices.json
// Note: Currently, I use this API to get currency list, but it better to have another API to get those.
function fetchCurrencies() {
  fetch("https://interview.switcheo.com/prices.json")
    .then((response) => response.json())
    .then((currencies) => {
      // get HTML elements have classname is 'currency-list'
      const currencyList = Array.from(document.getElementsByClassName("currency-list"));

      // create option element for each currency
			const distinctCurrencyValues = currencies.reduce((acc, curr) => {
				if (!acc.find((currency) => currency === curr.currency)) {
					acc.push(curr.currency);
				}
				return acc;
			}, []);
      distinctCurrencyValues.forEach((currencyValue) => {
        // add currency option to each currency-list select element
				currencyList.forEach((list) => {
					let option = document.createElement("option");
					option.value = currencyValue;
					option.text = currencyValue;
						// add default currency as USD
					if (currencyValue === 'USD') {
						option.selected = true;
					}
					list.appendChild(option);
				});
      });
    });
}

function setUp() {
	fetchCurrencies();

	// add event listener to currency-list select element
	const swapBtn = document.getElementById('swap-btn');
	swapBtn.addEventListener('click', () => {
		const originalCurrency = document.getElementById('input-currency').value;
		const targetCurrency = document.getElementById('output-currency').value;
		const amount = document.getElementById('input-amount').value;
		const result = swapPrice(originalCurrency, targetCurrency, amount);
		document.getElementById('output-amount').value = `${result}`;
	});

	// add event listener to input amount to show error message when input is invalid
	const inputAmount = document.getElementById('input-amount');
	inputAmount.addEventListener('input', () => {
		const amount = inputAmount.value;
		if (isNaN(amount) || amount < 0) {
			document.getElementById('input-amount-error').innerHTML = 'Invalid input amount';
			document.getElementById('swap-btn').disabled = true;
		} else {
			document.getElementById('input-amount-error').innerHTML = '';
			document.getElementById('swap-btn').disabled = false;
		}
	});

	// add default currency as USD
	const inputCurrency = document.getElementById('input-currency');
	document.getElementById('input-currency-symbol').innerHTML = `<img src="./icons/USD.svg" alt="USD" />`;
	const outputCurrency = document.getElementById('output-currency');
	document.getElementById('output-currency-symbol').innerHTML = `<img src="./icons/USD.svg" alt="USD" />`;


	// add event listener to select currency
	// showing currency symbol when currency is selected
	inputCurrency.addEventListener('change', () => {
		const currency = inputCurrency.value;
		const currencySymbol = document.getElementById('input-currency-symbol');
		// add svg to currency symbol import from icons folder
		currencySymbol.innerHTML = `<img src="./icons/${currency || 'USD'}.svg" alt="${currency || 'USD'}" />`;
	});

	outputCurrency.addEventListener('change', () => {
		const currency = outputCurrency.value;
		const currencySymbol = document.getElementById('output-currency-symbol');
		// add svg to currency symbol import from icons folder
		currencySymbol.innerHTML = `<img src="./icons/${currency || 'USD'}.svg" alt="${currency || 'USD'}" />`;
	});
}

// run function when the page is loaded
setUp();
