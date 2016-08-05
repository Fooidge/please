please = require './main.coffee'

do ->
	if typeof define is 'function' and define.amd then define(please)
	else if typeof module is 'object' and module.exports then module.exports = please
	this.please = please