describe('Test Underscore', function() {
	it('Has Dependency Underscore', function() {
		expect(typeof _).not.toBe('undefined');
	});

	it('Can Clone an Object', function() {
		var a = { x:1 }, b = _.clone(a);

		expect(a.x).toBe(b.x);
		
		b.x = 3;

		expect(a.x).not.toBe(b.x);
	});
});