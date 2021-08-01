module.exports = function (req, res, next) {
    if (req.user.role !== 'editor') return res.status(403).send('Forbidden');
    next();
}

// An Editor would sent a patch request to update header and newsText only.He can not do post or delete a news
