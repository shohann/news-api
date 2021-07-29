const { Schema, model } = require('mongoose');

const newsSchema = Schema({
    header: {
        type: String,
        requred: true,
    },
    newsText: {
        type: String,
        requred: true,
    },
    imageLink: {
        type: String,
        requred: true,
    },
    category: {
        type: String,
        requred: true,
    },
    author: {
        type: String,
        requred: true,
    },
    publishTime: { 
        type: Date, 
        default: Date.now 
    },
    status: {
        type: Boolean,
        default: false
    }
})

module.exports.News = model('News', newsSchema);

// joi er validation lagbe
// Email varification lagbe -> search how to register user using email verification
// Id Auto generate hobe 
// image ta bahire upload kora thabe
// API er elta docs likhte hobe 
// tbe image upload korle besi valo hoy ,,nijer server a