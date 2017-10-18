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
	let storeObj = {}  // , count = 0;
	for (let i = 0; i < Math.pow(10, mag); i++) {
		storeObj[i] = i;
		// count++;
	}
	// console.log(count);
	return storeObj;
}
// storeObjects(createObj(7));
describe('storage', () => {

	describe('storeObjects(){ }', () => {

		xit('is a function', () => {
			expect(storeObjects).to.be.a('function');
		});

		xit('returns a promise', () => {
			let idsPromise = storeObjects(createObj());
			expect(idsPromise).to.be.instanceof(Promise);
		});

		xit('returns a promise that eventually resolves to an array', () => {
			let idsPromise = storeObjects(createObj());
			return expect(Promise.resolve(idsPromise)).to.eventually.be.an('array');
		}, 1000);

		xit('can take up to 10 arguements and return array of 10 file ids', () => {
			return expect(Promise.resolve(
				storeObjects(
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
					)
				)
			).to.eventually.be.an('array');
		}, 10000);

		it('can handle a big file', () => {
			return expect(Promise.resolve(
				storeObjects(createObj(7))
					.catch(console.error)
			)).to.eventually.be.a('array');
		}, 20000);

		xit('can handle 10 big file', () => {
			let ids = storeObjects(
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
			return storeObjects(createObj())
				.then(ids => {
					console.log('ids', ids[0]);
					let objPromise = readObject(ids[0]);
					expect(objPromise).to.be.instanceof(Promise);
					objPromise.then(obj => console.log('objPromise', obj));
					objPromise.then(obj =>
						expect(JSON.stringify(obj))
							.to.be.equal(JSON.stringify(createObj()))
					);
				})
				.catch(console.error);
		}, 10000);

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
