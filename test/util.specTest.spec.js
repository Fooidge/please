import { expect } from 'chai';
import { specTest } from '../src/util/util';

describe('random', () => {
	it('Accepts an object of the correct spec', () => {
		let spec = {
			foo: {
				min: 0,
				max: 100
			}
		};
		let obj = {
			foo: 4
		};
		let test = specTest(spec, obj);
		expect(test).to.equal(true);
	});
	it('Rejects test of wrong type', () => {
		let spec = {
			foo: {
				min: 0,
				max: 100
			}
		};
		let string = 'A String';
		let test = specTest(spec, string);
		expect(test).to.equal(false);
	});
	it('Rejects an object with a missing key from the spec', () => {
		let spec = {
			foo: {
				min: 0,
				max: 100
			}
		};
		let obj = {
			bar: 4
		};
		let test = specTest(spec, obj);
		expect(test).to.equal(false);
	});
	it('Rejects an object of the wrong type from the spec', () => {
		let spec = {
			foo: {
				min: 0,
				max: 100
			}
		};
		let obj = {
			foo: 'lulz'
		};
		let test = specTest(spec, obj);
		expect(test).to.equal(false);
	});
	it('Rejects an object with a number out of range', () => {
		let spec = {
			foo: {
				min: 0,
				max: 100
			}
		};
		let obj = {
			foo: 400
		};
		let test = specTest(spec, obj);
		expect(test).to.equal(false);
	});
});