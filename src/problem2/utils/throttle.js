// closure fn to store previous called time
const previous = function () {
	let prev = 0;
	return {
		getPrev: () => prev,
		setPrev: (val) => prev = val,
	};
}();

/**
 * Throttle function
 * @param {func} func 
 * @param {number} delay 
 */
export const throttleFunction = (func, delay) => {
	// Previous called time
	let prev = previous.getPrev();

	// Current called time
	let now = new Date().getTime();

	// If difference is greater than delay
	// call the function again.
	if (now - prev > delay) {
		prev = now;

		// setting the previous called time
		previous.setPrev(now);
		
		// call the function
		func();
	}
}
