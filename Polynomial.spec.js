import { Polynomial } from './Polynomial';
import { expect, assert } from 'chai';

function setupPoly (p) {
	if (p) return new Polynomial(p);
	return new Polynomial('5x^2 + 6y^2 - 7x^-5 + 5');
}
let poly1, poly2;

describe('Polynomial', () => {

	describe('converts string to array of objects', () => {

		it('stores coefficents in this.polyObj', () => {
			poly1 = setupPoly();
			expect(poly1.polyObj).to.exist;
		});

		it('turns strings to object with structure {variable: {power: coefficent}}', () => {
			poly1 = setupPoly();
			assert(poly1 instanceof Object,
				'does not correctly convert strings into object');
		});

	});

	describe('add method', () => {

		it('is a function', () => {
			poly1 = setupPoly();
			expect(poly1.add).to.be.a('function');
		});

		it('returns an instance of Polynomial object', () => {
			poly1 = setupPoly();
			expect(poly1.add(poly1)).to.be.instanceof(Polynomial)
		});

	});

	describe('subtract method', () => {

		it('is a function', () => {
			poly1 = setupPoly();
			expect(poly1.subtract).to.be.a('function');
		});

		it('returns an instance of Polynomial object', () => {
			poly1 = setupPoly();
			expect(poly1.subtract(poly1)).to.be.instanceof(Polynomial)
		});

	});

	describe('multiply method', () => {

		it('is a function', () => {
			const polyTemp = setupPoly('1 + 3 + 3x^2')
			// console.log(polyTemp.polyObj)
			poly1 = setupPoly();
			expect(poly1.multiply).to.be.a('function');
		});

		it('returns an instance of Polynomial object', () => {
			poly1 = setupPoly();
			expect(poly1.multiply(poly1)).to.be.instanceof(Polynomial)
		});

	});

	xit('has syntheticDivide function', () => {
		expect(poly1.subtract).to.be.a('function')
	});

});











