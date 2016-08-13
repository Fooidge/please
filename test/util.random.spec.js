import { expect } from 'chai';
import { random } from '../src/util/util';

describe('random', () => {
	it('Generates a number', () => {
		let test = random(0, 100);
		expect(test).to.be.a('number');
	});
	it('Generates a number in a given range', () => {
		let test = random(0, 100);
		expect(test).to.be.within(0, 100);
	});
	it('Generates a float if either argument is a float', () => {
		let test = random(1.1, 100);
		expect(test)
			.to.be.a('number')
			.that.is.within(0, 100);
	});
	it('Generates a float if 3rd argument is true', () => {
		let test = random(0, 100, true);
		expect(test)
			.to.be.a('number')
			.that.is.within(0, 100);
	});
});