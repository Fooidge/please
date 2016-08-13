import { expect } from 'chai';
import { isNumber } from '../src/util/util';

describe('isNumber', () => {
	it('Accepts numbers', () => {
		let test = isNumber(42);
		expect(test).to.equal(true);
	});
	it('Accepts negative numbers', () => {
		let test = isNumber(-27);
		expect(test).to.equal(true);
	});
	it('Does not accept Strings', () => {
		let test = isNumber('a string');
		expect(test).to.equal(false);
	});
	it('Does not accept Arrays', () => {
		let test = isNumber([]);
		expect(test).to.equal(false);
	});
	it('Does not accept Objects', () => {
		let test = isNumber({});
		expect(test).to.equal(false);
	});
	it('Does not accept NaN', () => {
		let test = isNumber(NaN);
		expect(test).to.equal(false);
	});
	it('Does not accept Infinity', () => {
		let test = isNumber(Infinity);
		expect(test).to.equal(false);
	});
	it('Does not accept undefined', () => {
		let test = isNumber(undefined);
		expect(test).to.equal(false);
	});
	it('Does not accept boolean values', () => {
		let test = isNumber(true);
		expect(test).to.equal(false);
	});
});