import { expect } from 'chai';
import { isObject } from '../src/util/util';

describe('isObject', () => {
	it('Accepts Objects', () => {
		expect(isObject({})).to.equal(true);
	});
	it('Rejects non-numbers', () => {
		expect(isObject(42)).to.equal(false);
		expect(isObject('a string')).to.equal(false);
		expect(isObject([])).to.equal(false);
		expect(isObject(NaN)).to.equal(false);
		expect(isObject(Infinity)).to.equal(false);
		expect(isObject(undefined)).to.equal(false);
		expect(isObject(true)).to.equal(false);
	});
});