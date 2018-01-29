const calc = {
	input: [],
	mainDisplay: document.getElementById('main-display'),
	subDisplay: document.getElementById('sub-display'),
	equals: function() {
		let n = calc.input.join('').split(/[^0-9\.]/)
		if (n.length > 2) n.shift(),n[0] = n[0]*-1;
		let o = calc.input.join('').split(/[0-9\.]/).join('');
		if (o.length > 1) o = o[o.length -1];
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
		(this.input.length === 0 || this.isOperator(this.subDisplay.innerHTML[this.subDisplay.innerHTML.length-1])) ? this.mainDisplay.innerHTML = n : this.mainDisplay.innerHTML += n;
		this.subAdd(n);
		this.input.push(n);
	},
	operators: {
		"*": (x,y) => x * y,
		"/": (x,y) => x / y,
		"+": (x,y) => x + y,
		"-": (x,y) => x - y
	},
	isOperator: function(o) {
		return (o === unescape("%D7") || o === "+" || o === "*" || o === "/" || o === "-" || o === unescape("%F7"))
	},
	inputOperator: function(n, t) {
		if (this.input.length > 0 && !this.isOperator(this.input[this.input.length-1])) {
			if (!this.isFloat()) this.equals();
			if (this.input.length === 0) this.input.push(0),this.subAdd(0);
			this.input.push(n);
			this.subAdd(n, t || n);
		}
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
	},
	x: {
		square: function() {
			if (calc.input.length > 0) {
				if (calc.isFloat()) {
					calc.subDisplay.innerHTML = "((" + calc.subDisplay.innerHTML + ")&and;2)";
					const result = parseFloat(calc.input.join("")) ** 2;
					calc.mainDisplay.innerHTML = result;
					calc.input = [result];
				} else {
					calc.equals();
					calc.x.square();
				}
			}
		},
		cube: function(n) {
			if (calc.input.length > 0) {
				if (calc.isFloat()) {
					calc.subDisplay.innerHTML = "((" + calc.subDisplay.innerHTML + ")&and;3)";
					const result = parseFloat(calc.input.join("")) ** 3;
					calc.mainDisplay.innerHTML = result;
					calc.input = [result];
				} else {
					calc.equals();
					calc.x.cube();
				}
			}
		},
		sqroot: function(n) {
			calc.subDisplay.innerHTML = '&radic;' + "(" + calc.subDisplay.innerHTML + ")" 
			return n ** 0.5;
		} 
	}
};

