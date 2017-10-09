import { stringToTable } from './Polynomial.stringToTable';
import calculate, { add, subtract, multiply } from './Polynomial.calculate';

// Polynomials should take in a string and return a Polynomal object
export class Polynomial {
	constructor(poly) {

		// if the input is a string convert it to a hashtable
		if (typeof poly === 'string') this.polyObj = stringToTable(poly);

		// if the input is a Polynomial object clone the .polyObj property 
		else if (poly instanceof Polynomial) this.polyObj = {...poly.polyObj};

		// throws generic error
		else throw new Error(`expected a string or an Polynomial object but got ${JSON.stringify(poly)}`);
	}

}


/* 	The methods are not in the class, but apart of the 
		prototype chain to make so we don't need to 
		regenerate the methods for every instance of a 
		Polynomial.  All their methods will must point to 
		the prototype chain. 
*/
Polynomial.prototype.add = function (polyObj) {
	return calculate(this, polyObj, 'ADD');
};

Polynomial.prototype.subtract = function (polyObj) {
		return calculate(this, polyObj, 'SUBTRACT');
};

Polynomial.prototype.multiply = function (polyObj) {
		return calculate(this, polyObj, 'MULTIPLY');
};

Polynomial.prototype.syntheticDivide = function (polyObj) {
		return calculate(this, polyObj, 'DIVIDE');
};

// Question #2:
/* I need you to write some a function that's going to be able to store up to 10 objects which are going to be average 80MB in size each, which I'll later need to access. How would you store them? Provide as detailed an explanation as you can, including any other considerations that would influence your design decision. */
