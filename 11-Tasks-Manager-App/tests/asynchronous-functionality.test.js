test('Basic async behaviour testing', (done) => {
    setTimeout(() => {
        expect(2).toBe(2);
        done(); // Call this once the async behaviour is done executing.
    }, 2000);
});
