import { expect } from 'chai';
import { specTest } from '../src/util/util';

describe('random', () => {
	it('Accepts an object of the correct spec', () => {
		let spec = {
			foo: {
				type: 'Number',
				rangeMin: 0,
				rangeMax: 100
			}
		};
		let obj = {
			foo: 4
		};
		let test = specTest(spec, obj);
		expect(test).to.equal(true);
		spec = {
			foo: {
				type: 'String',
			}
		};
		obj = {
			foo: 'A string'
		};
		test = specTest(spec, obj);
		expect(test).to.equal(true);
	});
	it('Rejects an object with a missing key from the spec', () => {
		let spec = {
			foo: {
				type: 'Number',
				rangeMin: 0,
				rangeMax: 100
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
				type: 'Number',
				rangeMin: 0,
				rangeMax: 100
			}
		};
		let obj = {
			foo: 'lulz'
		};
		let test = specTest(spec, obj);
		expect(test).to.equal(false);
		spec = {
			foo: {
				type: 'String'
			}
		};
		obj = {
			foo: 14
		};
		test = specTest(spec, obj);
		expect(test).to.equal(false);
	});
	it('Rejects an object with a number out of range', () => {
		let spec = {
			foo: {
				type: 'Number',
				rangeMin: 0,
				rangeMax: 100
			}
		};
		let obj = {
			foo: 400
		};
		let test = specTest(spec, obj);
		expect(test).to.equal(false);
	});
});