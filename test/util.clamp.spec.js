import { expect } from 'chai';
import { clamp } from '../src/util/util';

describe('clamp', () => {
	it('Does nothing when number in range', () => {
		let test = clamp(42, 0 , 100);
		expect(test).to.equal(42);
	});
	it('Clamps to minimum value', () => {
		let test = clamp(-4, 0, 100);
		expect(test).to.equal(0);
	});
	it('Clamps to maximum value', () => {
		let test = clamp(1024, 0, 100);
		expect(test).to.equal(100);
	});
});