import { Polynomial } from './Polynomial';
import { createId } from './Polynomial.stringToTable';

/* 	calcualte is a method used by
		Polynomial.add, 
		Polynomial.subtract,
		Polynomial.multiply,
		Polynomial.syntheticDivide */

export function setUp(operand1, operand2) {
	/* helper function that sets up new polynomial.polyObjs */
	let operandTable1 = new Polynomial(operand1).polyObj,
	operandTable2 = new Polynomial(operand2).polyObj;
	return {operandTable1, operandTable2};
}

export default function calculate(operand1, operand2, operator) {
	const newPolynomial = new Polynomial(operand1);
	switch (operator) {
		case 'ADD':
			newPolynomial.polyObj = add(operand1, operand2);
			return newPolynomial;

		case 'SUBTRACT':
			newPolynomial.polyObj = subtract(operand1, operand2);
			return newPolynomial;

		case 'MULTIPLY':
			newPolynomial.polyObj = multiply(operand1, operand2);
			return newPolynomial;

		case 'DIVIDE':
			// under development
			// newPolynomial.polyObj = divide(operand1, operand2);
			return newPolynomial;

		default:
			throw new Error('invalid operator');
	}
}

export function add(operand1, operand2) {
	// setup new polynomial.polyObjs
	const {operandTable1, operandTable2} = setUp(operand1, operand2);
	const resultTable = Object.assign(operandTable1);

	// add the coefficients
	for (let id in operandTable2) {
		if (!resultTable[id]) resultTable[id] = operandTable2[id];
		else resultTable[id].coefficient += operandTable2[id].coefficient;
	}
	return resultTable;
}

export function subtract(operand1, operand2) {
	// setup new 
	const {operandTable1, operandTable2} = setUp(operand1, operand2);
	const resultTable = Object.assign(operandTable1);

	// subtract the coefficients
	for (let id in operandTable2) {
		operandTable2[id].coefficient *= -1;
		if (!resultTable[id]) resultTable[id] = operandTable2[id];
		else resultTable[id].coefficient += operandTable2[id].coefficient;
	}
	return resultTable;
}

export function multiplyTerm(term1, term2) {
	/* 	multiply the terms by adding the exponents and 
			multiplying the coefficients */

	// es6 shallow clone;
	let term3 = {...term1};

	for (let key in term2) {

		// multiply the terms
		if (key === 'coefficient') {term3.coefficient *= term2.coefficient;}
		else if (key === 'id') {continue;}

		// add the exponents
		else if (term3[key]) {term3[key] += term2[key];}
		else {term3[key] = term2[key];}
	}

	// generate new id
	term3.id = createId(term3);

	return term3;
}

export function divide() {
// under development
}

export function multiply(operand1, operand2) {
	// setup
	const {operandTable1, operandTable2} = setUp(operand1, operand2);
	const resultTable = {};

	for (let id2 in operandTable2) {
		for (let id1 in operandTable1) {

			/* 	mutliply the polynomials by adding exponents and 
					multiplying coefficients
			*/
			let newTerm = multiplyTerm(operandTable1[id1], operandTable2[id2]);
			if(!resultTable[newTerm.id]) resultTable[newTerm.id] = newTerm;
			else resultTable[newTerm.id].coefficient += newTerm.coefficient;

		}
	}
	return resultTable;
}
