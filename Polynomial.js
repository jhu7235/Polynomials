import { stringToTable } from './Polynomial.stringToTable';
// import calculate from "./Polynomial.calculate";
import calculate, { add, subtract, multiply } from './Polynomial.calculate';

// Question #1:
/* You're an esteemed engineer at Math & Co. in their Algebraic Infrastructure team. The company is pivoting towards using this new technology that is based on polynomials and many of your peers are on the verge of creating servers that will crunch polynomials. 

You have been tasked with designing a class to optimally represent a polynomial for their use. This class would need to be high-performance and cater to the operations that can be performed on polynomials. Please provide commentary on your thought process in your design and the code for this class in a language of your choice. */

// Polynomials should take in a string.  Each element in the array should represent the coefficents of a unique variable. For example [[2,1,4,2]]
export class Polynomial {
	constructor(poly) {
		// code
		if (typeof poly === 'string') this.polyObj = stringToTable(poly);
		else if (poly instanceof Polynomial) this.polyObj = poly.polyObj;
		// throws generic error
		else throw new Error(`expected a string or an Polynomial object but got ${JSON.stringify(poly)}`);
	}

	// methods
	add(polyObj) {
		return calculate(this, polyObj, 'ADD');
	}

	subtract(polyObj) {
		return calculate(this, polyObj, 'SUBTRACT');
	}

	multiply(polyObj) {
		return calculate(this, polyObj, 'MULTIPLY');
	}

	syntheticDivide() {

	}
}

// Question #2:
/* I need you to write some a function that's going to be able to store up to 10 objects which are going to be average 80MB in size each, which I'll later need to access. How would you store them? Provide as detailed an explanation as you can, including any other considerations that would influence your design decision. */


