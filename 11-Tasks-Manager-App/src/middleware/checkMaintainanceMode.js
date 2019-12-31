const checkMaintainanceMode = (req, res, next) => {
    // return res.status(503).send('Site is in maintainance mode.');
    next();
};

module.exports = checkMaintainanceMode;
