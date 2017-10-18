import { readObject, storeObjects } from './storeObject';
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

describe('storage', () => {

	xdescribe('storeObjects(){ }', () => {

		it('is a function', () => {
			expect(storeObjects).to.be.a('function');
		});

		it('returns a promise', () => {
			let idsPromise = storeObjects(createObject());
			expect(idsPromise).to.be.instanceof(Promise);
		});

		it('returns a promise that eventually resolves to an array of ids', () => {
			let idsPromise = storeObjects(createObject());
			return expect(Promise.resolve(idsPromise)).to.eventually.be.an('array');
		}, 1000);

		it('can take up to 10 arguements and return array of 10 file ids', () => {
			const testObject = createObject(1);
			let idsPromise = storeObjects(
				testObject,
				testObject,
				testObject,
				testObject,
				testObject,
				testObject,
				testObject,
				testObject,
				testObject,
				testObject
				);
			return expect(Promise.resolve(idsPromise)
			).to.eventually.be.an('array');
		}, 10000);

		it('can handle a big file', () => {
			return expect(Promise.resolve(
				storeObjects(createObject(7))
					.catch(console.error)
			)).to.eventually.be.a('array');
		}, 20000);

		it('can handle 10 big file', () => {
			const testObject = createObject(6.7);
			let ids = storeObjects(
				testObject,
				testObject,
				testObject,
				testObject,
				testObject,
				testObject,
				testObject,
				testObject,
				testObject,
				testObject
				);
			return expect(Promise.resolve(ids))
				.to.eventually.be.a('array').that.has.length(10);
		}, 20000);

	});

	describe('readObject(){ }', () => {

		it('is a function', () => {
			expect(readObject).to.be.a('function');
		});

		it('returns a promise', () => {
			const objectIdPromise = Promise.resolve(storeObjects(createObject(1.5)))
				.then(ids => readObject(ids[0]))
				.catch(console.error);
			expect(objectIdPromise).to.be.an.instanceof(Promise);
		}, 20000);

		it('can read file', () => {
			return expect(Promise.resolve(storeObjects(createObject(2)))
				.then(ids => readObject(ids[0]))
				.catch(console.error)
				).to.eventually.equal(JSON.stringify(createObject(2)));
		}, 20000);

	});

});


/* mocks up data  */
function createObject(mag = 1) {
	let storeObj = {};
	for (let i = 0; i < Math.pow(10, mag); i++) {
		storeObj[i] = i;
	}
	return storeObj;
}