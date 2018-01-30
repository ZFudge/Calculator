const calc = {
	states: [{input:[],mainDisplay:0,subDisplay: ""}],
	pushState() {
		this.states.push({
			input: this.input.toString(),
			mainDisplay: this.mainDisplay.innerHTML,
			subDisplay: this.subDisplay.innerHTML,
		});
	},
	input: [],
	mainDisplay: document.getElementById('main-display'),
	subDisplay: document.getElementById('sub-display'),
	equals: function() {
		if (!this.isFloat()) {
			let n = calc.input.join('').split(/[^0-9\.]/)
			if (n.length > 2) n.shift(),n[0] = n[0]*-1;
			let o = calc.input.join('').split(/[0-9\.]/).join('');
			if (o.length > 1) o = o[o.length -1];
			const result = this.operators[o](parseInt(n[0]),parseInt(n[1]));

			this.mainDisplay.innerHTML = result;
			this.input = [result];
			this.pushState();
		}
	},
	clearAll: function() {
		this.states = [{input:[],mainDisplay:"0",subDisplay: ""}],
		this.input = [];
		this.mainDisplay.innerHTML = 0;
		this.subDisplay.innerHTML = "";
	},
	clearOne: function() {
		if (this.states.length > 1) this.states.pop();
		const oldState = this.states[this.states.length-1];
		this.input = oldState.input.split(",");
		this.mainDisplay.innerHTML = oldState.mainDisplay;
		this.subDisplay.innerHTML = oldState.subDisplay;
	},
	inputNumber: function(n) {
		if (this.mainDisplay.innerHTML.length < 12 || this.isOperator(this.input[this.input.length-1])) {
			n = parseInt(n);
			(this.input.length === 0 || this.isOperator(this.subDisplay.innerHTML[this.subDisplay.innerHTML.length-1])) ? this.mainDisplay.innerHTML = n : this.mainDisplay.innerHTML += n;
			this.subAdd(n);
			this.input.push(n);
			this.pushState();
		}
	},
	operators: {
		"*": (x,y) => x * y,
		"/": (x,y) => x / y,
		"+": (x,y) => x + y,
		"-": (x,y) => x - y,
		"%": (x,y) => x % y
	},
	isOperator: function(o) {
		return (o === unescape("%D7") || o === "+" || o === "*" || o === "/" || o === "-" || o === "%" || o === unescape("%F7"))
	},
	inputOperator: function(n, t) {
		if (this.input.length > 0 && !this.isOperator(this.input[this.input.length-1])) {
			if (!this.isFloat()) this.equals();
			if (this.input.length === 0) this.input.push(0),this.subAdd(0);
			this.input.push(n);
			this.subAdd(n, t || n);
			this.pushState();
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
		this.pushState();
	},
	isWrapped() {
		return (calc.subDisplay.innerHTML[0] === "(" && calc.subDisplay.innerHTML[calc.subDisplay.innerHTML.length-1] === ")");
	},
	unwrap() {
		this.subDisplay.innerHTML = this.subDisplay.innerHTML.slice(1,this.subDisplay.innerHTML.length-1);
	},
	presetExponent: function(n) {
		if (calc.input.length > 0) {
			if (calc.isFloat()) {
				if (!calc.isWrapped()) calc.subDisplay.innerHTML = "(" + calc.subDisplay.innerHTML + ")";
					
				(n === 0.5) ? calc.subDisplay.innerHTML = "&radic;" + calc.subDisplay.innerHTML : calc.subDisplay.innerHTML = "(" + calc.subDisplay.innerHTML + "&and;" + n + ")";
				
				const result = parseFloat(calc.input.join("")) ** n;
				calc.mainDisplay.innerHTML = result;
				calc.input = [result];
			} else {
				calc.equals();
				calc.presetExponent(n);
			}
			this.pushState();
		}
	}
};

window.addEventListener("keydown", function(btn) { 
	if (btn.keyCode === 13) { calc.equals();
	} else if (btn.keyCode === 48 || btn.keyCode === 96) { calc.inputNumber(0);
	} else if (btn.keyCode === 49 || btn.keyCode === 97) { calc.inputNumber(1);
	} else if (btn.keyCode === 50 || btn.keyCode === 98) { calc.inputNumber(2);
	} else if (btn.keyCode === 51 || btn.keyCode === 99) { calc.inputNumber(3);
	} else if (btn.keyCode === 52 || btn.keyCode === 100) { calc.inputNumber(4);
	} else if (btn.keyCode === 53 || btn.keyCode === 101) { calc.inputNumber(5);
	} else if (btn.keyCode === 54 || btn.keyCode === 102) { calc.inputNumber(6);
	} else if (btn.keyCode === 55 || btn.keyCode === 103) { calc.inputNumber(7);
	} else if (btn.keyCode === 56 || btn.keyCode === 104) { calc.inputNumber(8);
	} else if (btn.keyCode === 57 || btn.keyCode === 105) { calc.inputNumber(9);
	} else if (btn.keyCode === 107) { calc.inputOperator("+"); 
	} else if (btn.keyCode === 109) { calc.inputOperator("-"); 
	} else if (btn.keyCode === 106) { calc.inputOperator("*"); 
	} else if (btn.keyCode === 111) { calc.inputOperator("/");}
});