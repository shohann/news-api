const { Schema, model } = require('mongoose');

const commentSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    newsId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    commentText: {
        type: String,
        required: true
    },
    commentTime: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports.Comment = model('Comment', commentSchema);