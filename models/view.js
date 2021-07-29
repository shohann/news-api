const {Schema, model} = require('mongoose');

// It is related to all types of get request
const viewSchema = Schema({
    newsId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    view: {
        type:Number,
        required: true,
        default: 0
    }
});

// Can i use a method for increment ?

module.exports.View = model('View', viewSchema);


// View Operations : 
// (i) view document creation after approving(PUT request or patch request) a news by admin
// (ii) View increment after every get request 
// (iii) Get request for most viewed newses which will be seen by all type of user(even anonymous user also)

