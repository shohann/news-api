const express = require('express');
const _ = require('lodash'); // Lodash
const { Comment } = require('../models/comment');
const authorize = require('../middlewares/authorize');

const router = express.Router();

const commentList = async(req, res) => {
    const id = req.params.newsId;
    try {
        const result = await Comment.find({ _id : id }.sort({ commentTime : 1 }));
        res.send(result); // Give all news which will match with the parameter newsId
    } catch(err) {
        const errMsgs = []
        for (field in err.errors) {
            errMsgs.push(err.errors[field].message)
        }
        return res.status(400).send(errMsgs)
    }
}

// For Add comment we need newsId, Current user Id, Comment time(default)
const addComment = async(req, res) => {
    const newsId = req.params.newsId; // From Parameter
    const userId = req.user._id // It is current logged In userID.We extrated this data(userID) from token payload in authorization middleware
    const commentObj = {
        // Creating comment object
        userId : userId,
        newsId : newsId,
        commentText: req.body
    }

    const comment = new Comment(commentObj);

    try {
        // saving the comment  in database
        const result = await comment.save();
        res.send(result)
    } catch(err) {
        const errMsgs = []
        for (field in err.errors) {
            errMsgs.push(err.errors[field].message)
        }
        return res.status(400).send(errMsgs)
    } 
}

// Update and Delete are restricted feature for other user.only real comentator can do this
// comment authorizatin middlewares -> commentator
const updateComment = async(req, res) => {

}

const deleteComment = async(req, res) => {

}

router.route('/:newsId')
    .get(commentList) // for getting all the comments for a specific news
    .post(authorize, addComment) // For posting a comment in a sepecific news by every authorize user
    .put(authorize, updateComment) // For updeating a comment in a sepecific news by every authorize user
    .delete(authorize, deleteComment); // For deleting a comment in a sepecific news by every authorize user

module.exports = router;

// In authorize middleware we can get the payload of currnet logged in users
// In payload, we can get the user id
// We will get the news id from parameter
// news id and parameter id needed for authorized comment
// Only autorize user can post a comment
// A Comment can only be update or delete by Current logged In user if he really posted the comment
// For update and delete we will need to check current user id with the userID in the comment document.If it match then we would allow that user to update or delete that comment

