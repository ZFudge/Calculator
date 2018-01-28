const calc = {
	mainDisplay: document.getElementById('main-display'),
	subDisplay: document.getElementById('sub-display'),
	equals: function() {

	},
	clear: function() {
		calc.val
	}
};

function inputNumber(n) {
	n = parseInt(n);
	console.log(typeof n);
}

function inputOperator(n) {
	console.log(typeof n);
	console.log(n);
}

const operators = {
	"*": (x,y) => x * y,
	"/": (x,y) => x / y,
	"+": (x,y) => x + y,
	"-": (x,y) => x - y
};
