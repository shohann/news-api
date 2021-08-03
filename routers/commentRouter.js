const express = require('express');
const _ = require('lodash'); // Lodash
const { Comment } = require('../models/comment');
const authorize = require('../middlewares/authorize');
const commentator = require('../middlewares/commentator');

const router = express.Router();

// It is releted to news ID
const commentList = async(req, res) => {
    const id = req.params.newsId; // news id in parameter
    try {
        const result = await Comment.find({ newsId : id }).sort({ commentTime : 1 }); // compare  newsId in database with the parameter newsId
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
        commentText: req.body.commentText
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
// These will be identify from the array of objects which we get from the GET request for a specific news
// update and delete is relete fd to user ID and that specific comment id.We have to check weather current user is the original comentator of this comment or not using comment id 
const updateComment = async(req, res) => {
    const commentId = req.params.commentId; // From Paramete
    const updatedData = req.body;
    // Here we are approving  news by put request and also content updation
    // Idea : approval status ta ekhane restrict kora jaite pare,,,admin alada route or patch request dia satus true korbe
    console.log(req.params.commentId);
    try {
        const result = await Comment.findByIdAndUpdate(commentId, updatedData,{
            new: true,
            useFindAndModify: false
        });
        if (!result) return res.status(404).send('ID not found'); // Other should have this or not?

        res.send(result);
    } catch (err) {
        return res.status(404).send('ID not found'); //ager gulo te kan arokom hoy ni 
    }

}

const deleteComment = async(req, res) => {
    const commentId = req.params.commentId; // From Paramete

    try {
        const result = await Comment.findByIdAndDelete(commentId);

        if (!result) return res.status(404).send('ID not found'); // Other should have this or not?
        res.send(result);
    } catch (err) {
        return res.status(404).send('ID not found'); //ager gulo te kan arokom hoy ni 
    }

}

router.route('/:newsId')
    .get(commentList) // for getting all the comments for a specific news
    .post(authorize, addComment) // For posting a comment in a sepecific news by every authorize user

router.route('/:commentId') //For specific comment.I client side we would have to get all the comments first.from there we can get all comments with id's. 
    .patch(authorize, commentator, updateComment) // For updeating a comment in a sepecific news by every authorize user
    .delete(authorize, commentator, deleteComment); // For deleting a comment in a sepecific news by every authorize user

module.exports = router;

// In authorize middleware we can get the payload of currnet logged in users
// In payload, we can get the user id
// We will get the news id from parameter 
// news id and parameter id needed for authorized comment
// Only autorize user can post a comment
// A Comment can only be update or delete by Current logged In user if he really posted the comment
// For update and delete we will need to check current user id(from token payload) with the userID in the comment document.If it match then we would allow that user to update or delete that comment
// If the user is the  actual commentator then he can edit or delete the comment
// In client side we need conditional rendering for showing the "EDIT" and "DELETE" option for current loggein in user for his aothorized comments