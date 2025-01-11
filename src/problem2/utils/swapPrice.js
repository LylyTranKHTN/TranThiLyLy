import { throttleFunction } from "./throttle";
import { currenciesStore } from "./currencyStore";

// Note: I realize that there was some currency that has the same name
// but different price, so I supposed that it is the same currency 
// retrieved at different times.
// So, I will store the latest price of each currency.
// I hope that I do not misunderstand the problem =))
const updateLatestPrice = () => new Promise((resolve, reject) => fetch("https://interview.switcheo.com/prices.json")
.then((response) => response.json())
.then((currencies) => {
	// get the latest price of each currency
	const latestPrices = {};

	currencies.forEach((currency) => {
		const { currency: currencyName, date, price } = currency;
		if (!latestPrices[currencyName] || new Date(date) > new Date(latestPrices[currencyName].date)) {
			latestPrices[currencyName] = { date, price };
		}
	});
	// store response value to currencyStore
	Object.keys(latestPrices).forEach((currencyName) => {
		currenciesStore.setCurrencies(currencyName, latestPrices[currencyName].price);
	});
	resolve();

}).catch((error) => {
	alert('Error when fetching currencies!');
	console.error('Error when fetching currencies:', error);
	reject();
}));

/**
 * Swap price of original currency to target currency
 * @param {String} originalCurrency name of original currency
 * @param {String} targetCurrency name of target currency
 * @param {Number} amount amount of original currency
 */
export function swapPrice(originalCurrency, targetCurrency, amount) {
	// Update latest price: use throttle to only update after 10s
	// That way, we can reduce the number of calls to the API
	throttleFunction(updateLatestPrice, 10000);

	const originalPrice = currenciesStore.getCurrencyPrice(originalCurrency) || 1;
	const targetPrice = currenciesStore.getCurrencyPrice(targetCurrency) || 1;

	return amount * targetPrice / originalPrice;
}