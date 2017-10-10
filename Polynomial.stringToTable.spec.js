import { Polynomial } from './Polynomial';
import { getPowerVariableAndCoeefficient, createDefaultValues, createId, splitTerm, stringToTable } from './Polynomial.stringToTable';
import { expect } from 'chai';

function setupPoly (p) {
	if (p) return new Polynomial(p);
	return new Polynomial('5x^2 + 6y^2 - 7x^-5 + 5');
}

describe('Polynomial Utility Functions', () => {

	describe('stringToTable(){ }', () => {
		it('is a function', () => {
			expect(stringToTable).to.be.a('function');
		});

		it('returns an object', () => {
			expect(stringToTable('5')).to.be.an('object');
			expect(stringToTable('-5x^2 + 6y^2 - 7x^-5 + 5')).to.be.an('object');
			expect(stringToTable('x')).to.be.an('object');
		});

		it('correctly formats data', () => {
			expect(JSON.stringify(stringToTable('5x^2 + 6y^2 - 7x^-5 + 5')))
				.to.equal(JSON.stringify({
					'x^2': {
						coefficient: 5,
						x: 2,
						id: 'x^2'
					},
					'y^2': {
						coefficient: 6,
						y: 2,
						id: 'y^2'
					},
					'x^-5': {
						coefficient: -7,
						x: -5,
						id: 'x^-5'
					},
					'1^1': {
						1: 1,
						coefficient: 5,
						id: '1^1'
					}
				}));
		});
	});

	describe('splitTerm(){ }', () => {
		it('is a function', () => {
			expect(splitTerm).to.be.a('function');
		});

		it('handles no coefficients Ex: x^12', () => {
			expect(JSON.stringify(splitTerm('x^2'))).to.be
				.equal(JSON.stringify({
					coefficient: 1,
					x: 2,
					id: 'x^2'
				}));
		});

		it('return undefined for 0', () => {
			expect(splitTerm('0')).to.be.an('undefined');
		});

		it('handles no exponents Ex: x', () => {
			expect(JSON.stringify(splitTerm('y'))).to.be
				.equal(JSON.stringify({
					coefficient: 1,
					y: 1,
					id: "y^1"
				}));
		});

		it('handles complex terms Ex:  30x^3y^15', () => {
			expect(JSON.stringify(splitTerm('12x^2y^3z^4'))).to.be
				.equal(JSON.stringify({
					coefficient: 12,
					x: 2,
					y: 3,
					z: 4,
					id: "x^2y^3z^4"
				}));
		});
	});

	describe('createId(){ }', () => {
		it('returns an id that is sorted alphabetically', () => {
			expect(createId({
					coefficient: 12,
					x: 2,
					y: 3,
					z: 4,
				})).to.equal('x^2y^3z^4');
		});

		it('returns an id that is sorted alphabetically', () => {
			expect(createId({
				x: 1,
				coefficient: 2
			})).to.equal('x^1');
		});

		it('overwrites id', () => {
			expect(createId({
				x: 1,
				coefficient: 2,
				id: 'x^123'
			})).to.equal('x^1');
		});
	});

	describe('createDefaultValues(){ }', () => {
		it('shallowly replaces null with 1', () => {
			expect(JSON.stringify(createDefaultValues({hello: null, x: null})))
				.to.equal(JSON.stringify({hello: 1, x: 1}));
		});
		it('create default exponent', () => {
			expect(JSON.stringify(createDefaultValues({
					coefficient: 12,
					x: null,
				})))
				.to.equal(JSON.stringify({
					coefficient: 12,
					x: 1,
				}));
		});
		it('create default exponent', () => {
			expect(JSON.stringify(createDefaultValues({
					coefficient: null,
					x: 2,
				})))
				.to.equal(JSON.stringify({
					coefficient: 1,
					x: 2,
				}));
		});

		it('handles no variables Ex: -12', () => {
			expect(JSON.stringify(createDefaultValues({coefficient: -12}))).to.be
				.equal(JSON.stringify({
					coefficient: -12,
					'1': 1
				}));
		});
	});

	describe('getPowerVariableAndCoeefficient(){ }', () => {
		it('handles complex terms', () => {
			expect(JSON.stringify(getPowerVariableAndCoeefficient('12x^2y^3z^4'))).to
				.equal(JSON.stringify({
					coefficient: 12,
					x: 2,
					y: 3,
					z: 4,
				}));
		});

		it('handles no variables Ex: -12', () => {
			expect(JSON.stringify(getPowerVariableAndCoeefficient('-12'))).to.be
				.equal(JSON.stringify({
					coefficient: -12,
					'1': 1
				}));
		});

		it('handles no exponent, multivariable term Ex: -12xy^3', () => {
			expect(JSON.stringify(getPowerVariableAndCoeefficient('-12xy^3'))).to.be
				.equal(JSON.stringify({
					coefficient: -12,
					x: 1,
					y: 3,
				}));
		});

		it('handles no exponent, multivariable term Ex: -12xy^3', () => {
			expect(JSON.stringify(getPowerVariableAndCoeefficient('xy^3'))).to.be
				.equal(JSON.stringify({
					coefficient: 1,
					x: 1,
					y: 3,
				}));
		});

		it('handles negative coefficient Ex: -12x^3', () => {
			expect(JSON.stringify(getPowerVariableAndCoeefficient('-12x^3'))).to.be
				.equal(JSON.stringify({
					coefficient: -12,
					x: 3,
				}));
		});

	});
});
