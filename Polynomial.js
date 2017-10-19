import { stringToTable } from './Polynomial.stringToTable';
import calculate, { add, subtract, multiply } from './Polynomial.calculate';


/* ---------------------MAIN----------------------- */
/* Polynomials should take in a string/Polynomial object and 
 * return a new Polynomal object 
 * 		- see spec for requirements */
export class Polynomial {
	constructor(poly) {

		// if the input is a string convert it to a hashtable
		if (typeof poly === 'string') this.polynomialTable = stringToTable(poly);

		// if the input is a Polynomial object clone the polynomialTable property 
		else if (poly instanceof Polynomial) this.polynomialTable = {...poly.polynomialTable};

		// throws generic error
		else throw new Error(`expected a string or an Polynomial object but got ${JSON.stringify(poly)}`);
	}

}


/* The methods are not in the class, but apart of the 
 * prototype chain to make so we don't need to 
 * regenerate the methods for every instance of a 
 * Polynomial.  All their methods will must point to 
 * the prototype chain. 											*/
Polynomial.prototype.add = function (polynomial) {
	return calculate(this, polynomial, 'ADD');
};

Polynomial.prototype.subtract = function (polynomial) {
		return calculate(this, polynomial, 'SUBTRACT');
};

Polynomial.prototype.multiply = function (polynomial) {
		return calculate(this, polynomial, 'MULTIPLY');
};

Polynomial.prototype.syntheticDivide = function (polynomial) {
		return calculate(this, polynomial, 'DIVIDE');
};
