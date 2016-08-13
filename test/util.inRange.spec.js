import { expect } from 'chai';
import { inRange } from '../src/util/util';

describe('inRange', () => {
	it('Accepts number in range', () => {
		let test = inRange(42, 0 , 100);
		expect(test).to.equal(true);
	});
	it('Does not accept numbers below range minimum', () => {
		let test = inRange(-4, 0, 100);
		expect(test).to.equal(false);
	});
	it('Does not accept numbers above range maximum', () => {
		let test = inRange(1024, 0, 100);
		expect(test).to.equal(false);
	});
});