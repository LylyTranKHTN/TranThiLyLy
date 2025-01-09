
// this is solution 1, use formula to calculate sum from 1 to n
var sum_to_n_a = function(n) {
    verify_n(n);
    return n * (n + 1) / 2;
};

// this is solution 2, use for loop to calculate sum from 1 to n
var sum_to_n_b = function(n) {
    verify_n(n);
    var sum = 0;
    for (var i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
};

// this is solution 3, use recursive to calculate sum from 1 to n
var sum_to_n_c = function(n) {
    verify_n(n);
    return recursiveSum(n);
};



// -- helper functions --

// verify n is an integer and n > 0
var verify_n = function(n) {
    if (n < 1 || typeof n !== 'number') {
        throw new Error('n must be a integer and n must be > 0');
    }
};

// recursive function to calculate sum from 1 to n, stop when n = 1
var recursiveSum = function(n) {
    if (n === 1) {
        return 1;
    } else {
        return n + recursiveSum(n - 1);
    }
}

// -- test cases --
function test() {
    const testCases = [1, 2, 3, 5, 100, -1];
    testCases.forEach((n) => {
        console.log("Sum to " + n, sum_to_n_a(n));
        console.log("The sum result from 3 functions are the same? ", sum_to_n_a(n) === sum_to_n_b(n) && sum_to_n_b(n) === sum_to_n_c(n));
    });
}
test();