module.exports = {
    auth: (req, res, next) => {
        console.log('Hello from auth');
        next();
    }
};