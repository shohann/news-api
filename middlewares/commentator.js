module.exports = function (req, res, next) {
    const commentId = req.params.commentId; // From Parameter
    const userId = req.user._id // It is current logged In userID.We extrated this data(userID) from token payload in authorization middleware
    //We are getting these id because here we already pass the authorize middleware
    if (commentId !== userId) return res.status(403).send('Forbidden');
    next();
}

//HTTP status code gulo thik ase ki na check kora lagbe 