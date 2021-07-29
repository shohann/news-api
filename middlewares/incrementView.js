// age createView finish hobe tar por etar kaj suru korte hobe

const { View } = require('../models/view');

// This wll be called with every get requst 
// corner case: unapproved news 
// if newsId dont exist in the collection then we would not increment the view.then it will be considered as unapproved news
// we only incremet when we have a document with the current newsId

module.exports = async function (req, res, next) {
    const id = req.params.id; // current newsId.We will search for this.not View document id
    const isAvailable = await View.find( { newsId: id } );
    // console.log(isAvailable);
    if (!isAvailable) next();
    else {
        let result = isAvailable;
        // console.log(result[0].view);
        result[0].view = result[0].view + 1;
        // console.log(result[0].view);
        // console.log(result);
        // ey task ta mainlu nirvor kore response er upor tai array ashe
        await View.findByIdAndUpdate(result[0]._id, result[0],{
            new: true,
            useFindAndModify: false
        });
        next();
    }
}














