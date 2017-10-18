import { Polynomial } from './Polynomial';
import { expect } from 'chai';

function setupPoly (polynomial) {
	if (polynomial) return new Polynomial(polynomial);
	return new Polynomial('5x^2 + 6y^2 - 7x^-5 + 5');
}
let poly1;


/* You're an esteemed engineer at Math & Co. in their Algebraic 
 * Infrastructure team. The company is pivoting towards using 
 * this new technology that is based on polynomials and many of 
 * your peers are on the verge of creating servers that will
 * crunch polynomials. You have been tasked with designing a
 * class to optimally represent a polynomial for their use. This
 * class would need to be <high-performance> and cater to the
 * <operations> that can be performed on polynomials. Please provide
 * commentary on your thought process in your design and the code
 * for this class in a language of your choice.*/


describe('Polynomial', () => {

	describe('converts string to a polynomial table (Polynomial.polynomialTable)', () => {


		it('turns strings to object with structure, Example 12xy^3z^4 + 5 => {\n  x^1y^4z^4: { coefficient: 12, x: 1, y: 4, z: 4},\n  1^1: { coefficient: 5, 1: 1 } \n}', () => {
			poly1 = setupPoly();
			expect(poly1.polynomialTable).to.deep.equal({
				'x^2': { coefficient: 5, x: 2, id: 'x^2' },
				'y^2': { coefficient: 6, y: 2, id: 'y^2' },
				'x^-5': { coefficient: -7, x: -5, id: 'x^-5' },
				'1^1': { '1': 1, coefficient: 5, id: '1^1' },
			});
		});

		it('stores coefficents in this.polynomialTable', () => {
			poly1 = setupPoly();
			expect(poly1.polynomialTable).to.exist;
		});

		it('stores the data correctly', () => {
			poly1 = setupPoly();
			expect(poly1.polynomialTable).to.deep.equal({
				'x^2': { coefficient: 5, x: 2, id: 'x^2' },
				'y^2': { coefficient: 6, y: 2, id: 'y^2' },
				'x^-5': { coefficient: -7, x: -5, id: 'x^-5' },
				'1^1': { '1': 1, coefficient: 5, id: '1^1' },
			});
		});

	});

	describe('add method', () => {

		it('is a function', () => {
			poly1 = setupPoly();
			expect(poly1.add).to.be.a('function');
		});

		it('returns an instance of Polynomial object', () => {
			poly1 = setupPoly();
			expect(poly1.add(poly1)).to.be.instanceof(Polynomial);
		});

	});

	describe('subtract method', () => {

		it('is a function', () => {
			poly1 = setupPoly();
			expect(poly1.subtract).to.be.a('function');
		});

		it('returns an instance of Polynomial object', () => {
			poly1 = setupPoly();
			expect(poly1.subtract(poly1)).to.be.instanceof(Polynomial);
		});

	});

	describe('multiply method', () => {

		it('is a function', () => {
			poly1 = setupPoly();
			expect(poly1.multiply).to.be.a('function');
		});

		it('returns an instance of Polynomial object', () => {
			poly1 = setupPoly();
			expect(poly1.multiply(poly1)).to.be.instanceof(Polynomial);
		});

	});

	describe('syntheticDivide method', () => {

		it('is a function', () => {
			expect(poly1.syntheticDivide).to.be.a('function');
		});

	});

});
