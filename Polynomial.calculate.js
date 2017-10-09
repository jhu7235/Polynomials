import { Polynomial } from './Polynomial';
import { createId } from './Polynomial.stringToTable';

export function setUp(operand1, operand2) {
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
			newPolynomial.polyObj = divide(operand1, operand2);
			return newPolynomial;

		default:
			throw new Error('invalid operator');
	}
}

export function add(operand1, operand2) {
	const {operandTable1, operandTable2} = setUp(operand1, operand2);
	const resultTable = Object.assign(operandTable1);
	for (let id in operandTable2) {
		if (!resultTable[id]) resultTable[id] = operandTable2[id];
		else resultTable[id].coefficient += operandTable2[id].coefficient;
	}
	return resultTable;
}

export function subtract(operand1, operand2) {
	const {operandTable1, operandTable2} = setUp(operand1, operand2);
	const resultTable = Object.assign(operandTable1);
	for (let id in operandTable2) {
		operandTable2[id].coefficient *= -1;
		if (!resultTable[id]) resultTable[id] = operandTable2[id];
		else resultTable[id].coefficient += operandTable2[id].coefficient;
	}
	return resultTable;
}

export function multiplyTerm(term1, term2) {

	// es6 shallow clone;
	let term3 = {...term1};

	// console.log('term3', term3);
	// console.log('term2', term2);
	for (let key in term2) {
		if (key === 'coefficient') {term3.coefficient *= term2.coefficient;}
		else if (key === 'id') {continue;}
		else if (term3[key]) {

			// console.log('term3[key]', term3[key])
			term3[key] += term2[key];}
		else {term3[key] = term2[key];}
	}

	// console.log('1 term3', term1, term2);
	term3.id = createId(term3);
	
	// console.log('2 term3', term1, term2);
	return term3;
}

export function divide() {

}

export function multiply(operand1, operand2) {
	const {operandTable1, operandTable2} = setUp(operand1, operand2);
	const resultTable = {};
	for (let id2 in operandTable2) {
		for (let id1 in operandTable1) {
			let newTerm = multiplyTerm(operandTable1[id1], operandTable2[id2]);
			if(!resultTable[newTerm.id]) resultTable[newTerm.id] = newTerm;
			else resultTable[newTerm.id].coefficient += newTerm.coefficient;

		}
	}
	return resultTable;
}
