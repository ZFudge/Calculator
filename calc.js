const calc = {
	input: [],
	mainDisplay: document.getElementById('main-display'),
	subDisplay: document.getElementById('sub-display'),
	equals: function() {
		const n = calc.input.join('').split(/[^0-9\.]/);
		const o = calc.input.join('').split(/[0-9\.]/).join('');

		const result = this.operators[o](parseInt(n[0]),parseInt(n[1]));

		this.mainDisplay.innerHTML = result;
		this.input = [result];
	},
	clear: function() {
		this.input = [];

		this.mainDisplay.innerHTML = 0;
		this.subDisplay.innerHTML = "";
	},
	inputNumber: function(n) {
		n = parseInt(n);
		
		(this.input.length === 0 || isNaN(this.subDisplay.innerHTML[this.subDisplay.innerHTML.length-1]) && this.subDisplay.innerHTML[this.subDisplay.innerHTML.length-1] !== ".") ? this.mainDisplay.innerHTML = n : this.mainDisplay.innerHTML += n; 
		this.subAdd(n);
		this.input.push(n);
	},
	operators: {
		"*": (x,y) => x * y,
		"/": (x,y) => x / y,
		"+": (x,y) => x + y,
		"-": (x,y) => x - y
	},
	inputOperator: function(n, t) {
		(this.isFloat()) ? this.input.push(n) : this.equals();
		this.subAdd(n, t || n);
	},
	subAdd: function(c,t) {
		this.subDisplay.innerHTML += `${t || c}`;
	},
	isFloat: function() {
		return this.input.every((cur)=>!isNaN(cur) || cur === '.');
	},
	inputFloat: function(val = '.') {
		this.subAdd(val);
		this.input.push(val);
		this.mainDisplay.innerHTML += val;
	}
};

calc.input.join('').split(/[0-9\.]/).join('');
calc.input.join('').split(/[^0-9\.]/);
