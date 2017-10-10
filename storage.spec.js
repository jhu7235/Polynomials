import { readObject, storeObjects } from './storage';
import chai, { expect } from 'chai';
import Promise from 'bluebird';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
/*	Question #2:
		I need you to write some a function that's going to be able 
		to store up to 10 objects which are going to be average 80MB 
		in size each, which I'll later need to access. How would you 
		store them? Provide as detailed an explanation as you can, 
		including any other considerations that would influence your 
		design decision.
*/

function createObj(mag) {
	if (!mag) mag = 1;
	let storeObj = {};
	for (let i = 0; i < Math.pow(10, mag); i++) { storeObj[i] = i; }
	return storeObj;
}

describe('storage', () => {

	describe('storeObjects(){ }', () => {

		it('is a function', () => {
			expect(storeObjects).to.be.a('function');
		});

		it('returns a promise', () => {
			expect(storeObjects(createObj())).to.be.instanceof(Promise);
		});

		it('can take up to 10 arguements', () => {
			expect(storeObjects(
				createObj(),
				createObj(),
				createObj(),
				createObj(),
				createObj(),
				createObj(),
				createObj(),
				createObj(),
				createObj(),
				createObj()
				)).to.eventually.be.a('array');
		});

		it('returns a path', () => {
			expect(storeObjects(createObj())).to.eventually.be.a('array');
		});

		it('can handle a big file', () => {
			expect(storeObjects(createObj(7))).to.eventually.be.a('array');
		});

		it('can handle 10 big file', () => {
			expect(storeObjects(
				createObj(6.7),
				createObj(6.7),
				createObj(6.7),
				createObj(6.7),
				createObj(6.7),
				createObj(6.7),
				createObj(6.7),
				createObj(6.7),
				createObj(6.7),
				createObj(6.7)
				)).to.eventually.be.a('array');
		});

	});

	describe('readObject(){ }', () => {

		it('is a function', () => {
			expect(readObject).to.be.a('function');
		});

		it('returns a promise', () => {
			storeObjects(createObj())
				.then(ids =>
					expect(readObject(ids[0])).to.be.instanceof(Promise)
				);
		});

		it('can read file', () => {
			storeObjects(createObj())
				.then(ids => {
					ids.map(id => {
						readObject(id)
							.then(data => {
								expect(data).to.eventually
									.equal(JSON.stringify(createObj()));
							});
					});
				})
				.catch(console.error);
		});

	});


});
