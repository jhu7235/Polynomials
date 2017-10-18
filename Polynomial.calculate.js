import { Polynomial } from './Polynomial';
import { createId } from './Polynomial.stringToTable';

/* -----------------MAIN-------------------- */
/* HOF - performs calculation for the Polynomial methods */
/* calcualte is a method used by:
 * 		Polynomial.add, 
 * 		Polynomial.subtract,
 * 		Polynomial.multiply,
 * 		Polynomial.syntheticDivide 													*/
export default function calculate(operand1, operand2, operator) {
	const newPolynomial = new Polynomial(operand1);
	switch (operator) {
		case 'ADD':
			newPolynomial.polynomialTable = add(operand1, operand2);
			return newPolynomial;

		case 'SUBTRACT':
			newPolynomial.polynomialTable = subtract(operand1, operand2);
			return newPolynomial;

		case 'MULTIPLY':
			newPolynomial.polynomialTable = multiply(operand1, operand2);
			return newPolynomial;

		case 'DIVIDE':
			// under development
			// newPolynomial.polynomialTable = divide(operand1, operand2);
			return newPolynomial;

		default:
			throw new Error('invalid operator');
	}
}

/* -----------------HELPER-------------------- */
/* takes two tables, add the coefficients of like terms, and
 * returns a new a table */
export function add(operand1, operand2) {
	// setup new polynomial.polynomialTables
	const {polynomialTable1, operandTable2} = setUp(operand1, operand2);
	const resultTable = Object.assign(polynomialTable1);

	/* add the coefficients */
	for (let id in operandTable2) {
		if (!resultTable[id]) resultTable[id] = operandTable2[id];
		else resultTable[id].coefficient += operandTable2[id].coefficient;
	}
	return resultTable;
}

/* -----------------HELPER-------------------- */
/* takes two tables, subtract the coefficients of like terms, and
 * returns a new a table */
export function subtract(operand1, operand2) {
	// setup new 
	const {polynomialTable1, operandTable2} = setUp(operand1, operand2);
	const resultTable = Object.assign(polynomialTable1);

	/* subtract the coefficients */
	for (let id in operandTable2) {
		operandTable2[id].coefficient *= -1;
		if (!resultTable[id]) resultTable[id] = operandTable2[id];
		else resultTable[id].coefficient += operandTable2[id].coefficient;
	}
	return resultTable;
}

/* -----------------HELPER-------------------- */
/* HOF - takes two tables, "FOIL" the terms, and
 * returns a new a table. It delegates the term multiplication 
 * to multiplyTerm()*/
export function multiply(operand1, operand2) {
	// setup
	const {polynomialTable1, operandTable2} = setUp(operand1, operand2);
	const resultTable = {};

	for (let id2 in operandTable2) {
		for (let id1 in polynomialTable1) {

			/* 	mutliply the polynomials by adding exponents and 
					multiplying coefficients */
			let newTerm = multiplyTerm(polynomialTable1[id1], operandTable2[id2]);
			if(!resultTable[newTerm.id]) resultTable[newTerm.id] = newTerm;
			else resultTable[newTerm.id].coefficient += newTerm.coefficient;

		}
	}
	return resultTable;
}

/* -----------------HELPER-------------------- */
/* multiply the terms by adding the exponents and 
 * multiplying the coefficients */
export function multiplyTerm(term1, term2) {

	// es6 shallow clone - to not mutate the term;
	let term3 = { ...term1 };

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

/* -----------------HELPER-------------------- */
/* setUp is a helper function that normalize the input 
 * into a  polynomial.polynomialTables 				 */
export function setUp(operand1, operand2) {
	let polynomialTable1 = new Polynomial(operand1).polynomialTable,
	operandTable2 = new Polynomial(operand2).polynomialTable;
	return {polynomialTable1, operandTable2};
}
