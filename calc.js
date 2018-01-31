const calc = {
	mainDisplay: document.getElementById('main-display'),
	subDisplay: document.getElementById('sub-display'),
	states: [],
	input: [],
	equaled: null,
	operators: {
		"*": (x,y) => x * y,
		"/": (x,y) => x / y,
		"+": (x,y) => x + y,
		"-": (x,y) => x - y,
		"%": (x,y) => x % y
	},
	equals() {
		if (!this.isFloat()) {
			this.equaled = true;
			let n = calc.input.join('').split(/[^0-9\.]/)
			if (n.length > 2) n.shift(),n[0] = n[0]*-1;
			let o = calc.input.join('').split(/[0-9\.]/).join('');
			if (o.length > 1) o = o[o.length -1];
			const result = this.operators[o](parseFloat(n[0]),parseFloat(n[1]));

			this.mainDisplay.innerHTML = result;
			this.input = [result];
			this.pushState();
		}
	},
	pushState() {
		this.states.push({
			input: this.input.toString(),
			mainDisplay: this.mainDisplay.innerHTML,
			subDisplay: this.subDisplay.innerHTML,
		});
	},
	clearOne() {
		if (this.states.length > 1) {
			this.states.pop();
			const oldState = this.states[this.states.length-1];
			this.input = Array.from(oldState.input.replace(/\,/g,""));
			this.mainDisplay.innerHTML = oldState.mainDisplay;
			this.subDisplay.innerHTML = oldState.subDisplay;
		}
	},
	clearAll() {
		this.input = [];
		this.mainDisplay.innerHTML = 0;
		this.subDisplay.innerHTML = "";
		this.states = [];
		this.pushState();
	},
	inputNumber(n) {
		if (this.mainDisplay.innerHTML.length < 12 || this.isOperator(this.input[this.input.length-1])) {
			if (this.equaled) this.clearAll(), this.equaled = false;
			n = parseInt(n);
			if (n === 0) {
				if (this.input.length > 0 && this.mainDisplay.innerHTML.length>0) {
					if (!this.isOperator(this.input[this.input.length-1])) {
						(this.input.length === 0 || this.isOperator(this.subDisplay.innerHTML[this.subDisplay.innerHTML.length-1])) ? this.mainDisplay.innerHTML = n : this.mainDisplay.innerHTML += n;
						this.subAdd(n);
						calc.input.push(n);
						this.pushState();
					}
				}
			} else {
				(this.input.length === 0 || this.isOperator(this.subDisplay.innerHTML[this.subDisplay.innerHTML.length-1])) ? this.mainDisplay.innerHTML = n : this.mainDisplay.innerHTML += n;
				this.subAdd(n);
				calc.input.push(n);
				this.pushState();
			}
		}
	},
	isOperator:(o) => (o === unescape("%D7") || o === "+" || o === "*" || o === "/" || o === "-" || o === "%" || o === unescape("%F7")),
	inputOperator(n, t) {
		if (this.input.length > 0 && !this.isOperator(this.input[this.input.length-1])) {
			if (!this.isFloat()) this.equals();
			if (this.equaled) this.equaled = false;
			if (this.input.length === 0) this.input.push(0),this.subAdd(0);
			this.input.push(n);
			this.subAdd(n, t || n);
			this.pushState();
		}
	},
	subAdd(c,t) {
		this.subDisplay.innerHTML += `${t || c}`;
	},
	isFloat() {
		return this.input.every((cur)=>!isNaN(cur) || cur === '.');
	},
	inputFloat(val = '.') {
		if (this.isOperator(this.input[this.input.length-1]) || this.input.length < 1) {
			this.subAdd("0"+val);
			this.input.push(0,val);
			this.mainDisplay.innerHTML = "0"+val;
			this.pushState();
		} else if (this.mainDisplay.innerHTML.indexOf(val) === -1) {
			this.subAdd(val);
			this.input.push(val);
			this.mainDisplay.innerHTML += val;
			this.pushState();
		}  
	},
	isWrapped() {
		return (calc.subDisplay.innerHTML[0] === "(" && calc.subDisplay.innerHTML[calc.subDisplay.innerHTML.length-1] === ")");
	},
	unwrap() {
		this.subDisplay.innerHTML = this.subDisplay.innerHTML.slice(1,this.subDisplay.innerHTML.length-1);
	},
	presetExponent(n) {
		if (calc.input.length > 0) {
			if (calc.isFloat()) {
				if (!calc.isWrapped()) calc.subDisplay.innerHTML = "(" + calc.subDisplay.innerHTML + ")";
				(n === 0.5) ? calc.subDisplay.innerHTML = "&radic;" + calc.subDisplay.innerHTML : calc.subDisplay.innerHTML = "(" + calc.subDisplay.innerHTML + "&and;" + n + ")";
				const result = parseFloat(calc.input.join("")) ** n;
				calc.mainDisplay.innerHTML = result;
				calc.input = [result];
				this.equaled = true;
			} else {
				calc.equals();
				calc.presetExponent(n);
			}
			this.pushState();
		}
	}
};
calc.pushState();

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