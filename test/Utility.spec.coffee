describe 'Utility', ->
	it 'isString false', ->
		expect(please.isString(42)).toBe false
		expect(please.isString([])).toBe false
		expect(please.isString(new Date())).toBe false
	it 'isString true', ->
		expect(please.isString({})).toBe true
		expect(please.isString('string')).toBe true
