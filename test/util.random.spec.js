import { expect } from 'chai';
import { random, isNumber, inRange } from '../src/util/util';

describe('random', () => {
	it('Generates a number', () => {
		let test = isNumber(random(0, 100));
		expect(test).to.equal(true);
	});
	it('Generates a number in a given range', () => {
		let test = inRange(random(0, 100), 0, 100);
		expect(test).to.equal(true);
	});
});