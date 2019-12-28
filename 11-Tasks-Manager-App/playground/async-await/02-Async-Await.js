const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (a < 0 || b < 0) {
                return reject(new Error('Please provide positive numbers only'));
            }
            resolve(a + b);
        }, 500);
    });
};

const foo = async () => {
    const sum1 = await add(1, 1);
    const sum2 = await add(sum1, 1);
    const sum3 = await add(sum2, 1);

    return sum3;
};

foo()
    .then(res => console.log(res))
    .catch(err => console.log(err));
