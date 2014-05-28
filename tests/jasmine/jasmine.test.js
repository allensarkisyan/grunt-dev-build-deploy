function add (n1, n2) {
	return n1 + n2;
}

describe('Test Adding Numbers', function() {
	it('Has the add function', function() {
		expect(add).toBeDefined();
		expect(typeof add).toBe('function');
	});

	it('Adds 1 + 1', function() {
		expect(add(1, 1)).toBe(2);
	});
});