const { bcryptPasswordEncrypt, bcryptPasswordVerify } = require('../playground/02-password-hashing');

test('Basic async behaviour testing', (done) => {
    setTimeout(() => {
        expect(2).toBe(2);
        done(); // Call this once the async behaviour is done executing.
    }, 2000);
});

test('Password bcrypt encrypt', async () => {
    const hashedPassword = await bcryptPasswordEncrypt('adi123');
    expect(hashedPassword).not.toBe('adi123');
});

test('Verify password', async () => {
    const hashedPassword = await bcryptPasswordEncrypt('adi123');
    expect(hashedPassword).not.toBe('adi123');
    const verifyPassword = await bcryptPasswordVerify('adi123', hashedPassword);
    expect(verifyPassword).toBe(true);
});
