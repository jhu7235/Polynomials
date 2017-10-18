import { Polynomial } from './Polynomial';
import { expect, assert } from 'chai';
import calculate, { add, subtract, multiply, divide } from './Polynomial.calculate';

function setupPoly (p) {
	if (p) return new Polynomial(p);
	//default setup
	return new Polynomial('5x^2 + 6y^2 - 7x^-5 + 5');
}
let poly1, poly2;

describe('calculate method', () => {

	describe('main method', () => {

		it('is a function', () => {
			expect(calculate).to.be.a('function');
		});

		it('returns a Polynomial object', () => {
			poly1 = setupPoly();
			poly2 = setupPoly('10x^5');
			expect(calculate(poly1, poly2, 'ADD')).to.be.instanceof(Polynomial);
		});

	}); 

	describe('add method', () => {

		it('is a function', () => {
			expect(add).to.be.a('function');
		});

		it('Not a test: takes in Polynomial.polyObj as arguement', () => {
			assert(true === true, 'not a test');
		});

		it('returns an plain old object', () => {
			poly1 = setupPoly();
			poly2 = setupPoly('10x^5');
			expect(add(poly1, poly2)).to.be.an('object');
		});

		it('adds correctly ', () => {
			poly1 = setupPoly();
			poly2 = setupPoly('10x^2 - 10xy^3');
			expect(add(poly1, poly2)).to.deep
				.equal({
					'x^2': { coefficient: 15, x: 2, id: 'x^2' },
	        'y^2': { coefficient: 6, y: 2, id: 'y^2' },
	        'x^-5': { coefficient: -7, x: -5, id: 'x^-5' },
	        '1^1': { 1: 1, coefficient: 5, id: '1^1' },
	        'x^1y^3': { coefficient: -10, x: 1, y: 3, id: 'x^1y^3' },
	      });
		});

	});

	describe('subtract method', () => {

		it('is a function', () => {
			expect(subtract).to.be.a('function');
		});

		it('Not a test: takes in Polynomial.polyObj as arguement', () => {
			assert(true === true, 'not a test');
		});

		it('returns an plain old object', () => {
			poly1 = setupPoly();
			poly2 = setupPoly('10x^5');
			expect(subtract(poly1, poly2)).to.be.an('object');
		});

		it('subtracts correctly ', () => {
			poly1 = setupPoly();
			poly2 = setupPoly('10x^2 - 10xy^3');
			expect(JSON.stringify(subtract(poly1, poly2))).to.be
				.equal(JSON.stringify({
					'x^2': { coefficient: -5, x: 2, id: 'x^2' },
	        'y^2': { coefficient: 6, y: 2, id: 'y^2' },
	        'x^-5': { coefficient: -7, x: -5, id: 'x^-5' },
	        '1^1': { '1': 1, coefficient: 5, id: '1^1' },
	        'x^1y^3': { coefficient: 10, x: 1, y: 3, id: 'x^1y^3' }
	      }));
		});

	});

	describe('multiply method', () => {

		it('is a function', () => {
			expect(multiply).to.be.a('function');
		});

		it('Not a test: takes in Polynomial.polyObj as arguement', () => {
			assert(true === true, 'not a test');
		});
		it('returns an plain old object', () => {
			poly1 = setupPoly();
			poly2 = setupPoly('10x^5');
			expect(multiply(poly1, poly2)).to.be.an('object');
		});

		it('multiplies correctly ', () => {
			poly1 = setupPoly('x');
			poly2 = setupPoly('10x^2 - 10xy^3');
			expect(JSON.stringify(multiply(poly1, poly2))).to.be
				.equal(JSON.stringify({
					'x^3': { coefficient: 10, x: 3, id: 'x^3' },
	        'x^2y^3': { coefficient: -10, x: 2, y: 3, id: 'x^2y^3' }
	      }));
			let poly3 = setupPoly('20x^2 + 10x + 5');
	    let poly4 = setupPoly('x + 1');
			expect(JSON.stringify(multiply(poly3, poly4))).to.be
				.equal(JSON.stringify({
					'x^3': { coefficient: 20, x: 3, id: 'x^3' },
	        'x^2': { coefficient: 30, x: 2, id: 'x^2' },
	        'x^1': { coefficient: 15, x: 1, id: 'x^1' },
	        '1^1': { 1: 1, coefficient: 5, id: '1^1' },
	      }));

			let poly5 = setupPoly('x + 1');
	    let poly6 = setupPoly('y + 1');
			expect(JSON.stringify(multiply(poly5, poly6))).to.be
				.equal(JSON.stringify({
					'x^1y^1': { coefficient: 1, x: 1, y: 1, id: 'x^1y^1' },
	        'y^1': { coefficient: 1, y: 1, id: 'y^1' },
	        'x^1': { coefficient: 1, x: 1, id: 'x^1' },
	        '1^1': { 1: 1, coefficient: 1, id: '1^1' },
	      }));
		});

	});

	xdescribe('divide method', () => {

		it('is a function', () => {
			expect(divide).to.be.a('function');
		});

		it('Not a test: takes in Polynomial.polyObj as arguement', () => {
			assert(true === true, 'not a test');
		});

		it('returns an plain old object', () => {
			poly1 = setupPoly();
			poly2 = setupPoly('10x^5');
			expect(divide(poly1, poly2)).to.be.an('object');
		});

		it('divides correctly ', () => {
			poly1 = setupPoly('x2 + 5x + 6');
			poly2 = setupPoly('x - 1');
			let polyAnswer = setupPoly('x - 6').polyObj;
			expect(JSON.stringify(divide(poly1, poly2))).to.be
				.equal(JSON.stringify(polyAnswer));

		});

	});

});
