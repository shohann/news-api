const { Comment } = require('../models/comment');

module.exports = async function (req, res, next) {
    const commentId = req.params.commentId; // From Parameter
    const userId = req.user._id // It is current logged In userID.We extrated this data(userID) from token payload in authorization middleware
    //We are getting these id because here we already pass the authorize middleware
    // if result.userId  userId(req.user._id ) is equal then we can call the next function e
    try {
        const result = await Comment.find({ _id : commentId, userId : userId })
        if (result) next();
    } catch(err) {
        console.log(err);
        return res.status(403).send('Forbidden')
    }  
  
}

//HTTP status code gulo thik ase ki na check kora lagbe 