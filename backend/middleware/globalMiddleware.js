const globalMiddleware = (req, res, next) => {
    const timezone = req.headers['time-zone'];

    if (timezone) {
        process.env.TZ = timezone;
    }

    next();
};

module.exports = globalMiddleware;