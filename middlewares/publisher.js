module.exports = function (req, res, next) {
    if (req.user.role !== 'publisher') return res.status(403).send('Forbidden');
    next();
}