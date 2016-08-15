import { expect } from 'chai';
import { isString } from '../src/util/util';

describe('isString', () => {
	it('Accepts strings', () => {
		expect(isString('a string')).to.equal(true);
	});
	it('Rejects non-strings', () => {
		expect(isString(42)).to.equal(false);
		expect(isString([])).to.equal(false);
		expect(isString({})).to.equal(false);
		expect(isString(NaN)).to.equal(false);
		expect(isString(Infinity)).to.equal(false);
		expect(isString(undefined)).to.equal(false);
		expect(isString(true)).to.equal(false);
	});
});