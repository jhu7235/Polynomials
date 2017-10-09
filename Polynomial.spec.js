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

		it('turns strings to object with structure, Example 12xy^3z^4 + 5 => {x^1y^4z^4: { coefficient: 12, x: 1, y: 4, z: 4}, 1^1: { coefficient: 5, 1: 1 } }', () => {
			poly1 = setupPoly();
			expect(poly1.polyObj).to.deep.equal({
				'x^2': { coefficient: 5, x: 2, id: 'x^2' },
				'y^2': { coefficient: 6, y: 2, id: 'y^2' },
				'x^-5': { coefficient: -7, x: -5, id: 'x^-5' },
				'1^1': { '1': 1, coefficient: 5, id: '1^1' },
			});
		});

		it('stores the data correctly', () => {
			poly1 = setupPoly();
			expect(poly1.polyObj).to.deep.equal({
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
			expect(poly1.subtract(poly1)).to.be.instanceof(Polynomial)
		});

	});

	describe('multiply method', () => {

		it('is a function', () => {
			poly1 = setupPoly();
			expect(poly1.multiply).to.be.a('function');
		});

		it('returns an instance of Polynomial object', () => {
			poly1 = setupPoly();
			expect(poly1.multiply(poly1)).to.be.instanceof(Polynomial)
		});

	});

	describe('syntheticDivide method', () => {

		it('is a function', () => {
			expect(poly1.syntheticDivide).to.be.a('function');
		});

	});

});











