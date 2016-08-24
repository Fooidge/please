import { expect } from 'chai';
import { isNumber } from '../../src/util/util';

describe('isNumber', () => {
	it('Accepts numbers', () => {
		expect(isNumber(42)).to.equal(true);
		expect(isNumber(-42)).to.equal(true);
		expect(isNumber(42.2)).to.equal(true);
	});
	it('Rejects non-numbers', () => {
		expect(isNumber('a string')).to.equal(false);
		expect(isNumber([])).to.equal(false);
		expect(isNumber({})).to.equal(false);
		expect(isNumber(NaN)).to.equal(false);
		expect(isNumber(Infinity)).to.equal(false);
		expect(isNumber(undefined)).to.equal(false);
		expect(isNumber(true)).to.equal(false);
	});
});