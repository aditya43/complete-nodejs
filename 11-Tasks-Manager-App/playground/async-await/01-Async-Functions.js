// Async functions always return Promise.

/* -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+ */

const foo = () => {};

console.log(foo()); // By default, JS functions return 'undefined'. So we will receive 'undefined' here.

/* -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+ */

const bar = async () => {};

console.log(bar()); // We will not receive 'undefined' here. Instead, we will receive a promise.

/* -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+ */

const baz = async () => { return 'Aditya Hajare'; };

baz()
    .then(name => console.log(name))
    .catch(e => console.log(e));

/* -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+ */

const qux = async () => { throw new Error('Something went wrong'); };

qux()
    .then(() => {})
    .catch(e => console.log(e));
