const { View } = require('../models/view');

module.exports = async function (req, res, next) {
    //kaj hoa gele eng a comment likhe dite hobe sob gulo te
    // ***Ensure korte hobe amade age pdate korar smy view document already exsist kore ki na..na korle sudhu create kora lagbe..
    // Exist korle old document use korbo
    const id = req.params.id; // document with this id will be incremented in view collection
    const isAvailable = await View.find( { newsId: id } );
    if (!req.body.status) next(); // if admin dont put the status it will call next function
    else if (!isAvailable) next();
    else {
        // Creating view document for the given ID
        const view = new View({
            newsId: id
        });

        await view.save();
        next();
    }
    
    // If we need error handling
    // try {
    //     await view.save;
    //     next();
    // } catch (err) {
    //     const errMsgs = [];

    //     for (field in err.errors) {
    //         errMsgs.push(err.errors[field].message)
    //     }
    //     // ekhane next er ki hobe ?
    //     return res.status(400).send(errMsgs);
    // }
    
}