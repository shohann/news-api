const express = require('express');
const _ = require('lodash'); // Lodash
const { News } = require('../models/news');
const { View } = require('../models/view');
const authorize = require('../middlewares/authorize');
const admin = require('../middlewares/admin');
const publisher = require('../middlewares/publisher');
const createView = require('../middlewares/createView');
const incrementView = require('../middlewares/incrementView');

const router = express.Router();

const allNews = async(req, res) => {
    try {
        const result = await News.find({status: false}).sort({ publishTime : -1 }); // stutas true dite hobe by admin
        res.send(result);
    } catch(err) {
        const errMsgs = [];
        for (field in err.error) {
            errMsgs.push(err.error[field].message);
        }
        return res.status(400).send(errMsgs);
    }
}

// write a function which will give all the category names

const letestNews = async(req, res) => {
    try {
        const result = await News.find({status: false}).limit(5).sort({ publishTime : -1 }); // stutas true dite hobe by admin
        res.send(result);
    } catch(err) {
        const errMsgs = [];
        for (field in err.error) {
            errMsgs.push(err.error[field].message);
        }
        return res.status(400).send(errMsgs);
    }
}

const categoryFilter = async(req, res) => {
    const categoryName = req.params.category;
    try {
        const result = await News.find({ status: false, category: categoryName }).sort({ publishTime : -1 }); // stutas true dite hobe by admin
        res.send(result);
    } catch(err) {
        const errMsgs = [];
        for (field in err.error) {
            errMsgs.push(err.error[field].message);
        }
        return res.status(400).send(errMsgs);
    }
}

const newsSearch = async(req, res) => {
    const key = req.params.search;
    try {
        const result = await News.find({ status: false, header: { $regex: key, $options: 'i' }}); // stutas true dite hobe by admin
        res.send(result);
    } catch(err) {
        const errMsgs = [];
        for (field in err.error) {
            errMsgs.push(err.error[field].message);
        }
        return res.status(400).send(errMsgs);
    }
}

const mostPopular = async(req, res) => {
    console.log('djds');
    // const result = await News.find({}); 
    // res.send(result);
    try {
        //const result = await View.find().limit(5).sort({ view : -1 }); // stutas true dite hobe by admin
        const result = await View.find({}); 
        res.send(result);
    } catch(err) {
        const errMsgs = [];
        for (field in err.error) {
            errMsgs.push(err.error[field].message);
        }
        return res.status(400).send(errMsgs);
    }
}

const detailNews = async(req, res) => {
    const id = req.params.id;

    try {
        const result = await News.findById(id)
        res.send(result);
    } catch(err) {
        const errMsgs = [];
        for (field in err.error) {
            errMsgs.push(err.error[field].message);
        }
        return res.status(400).send(errMsgs);
    }
}

const addNews = async(req, res) => {
    //const news = new News(req.body);
    const news = new News(_.pick(req.body, ['header', 'newsText', 'imageLink', 'category', 'author']));

    try {
        const result = await news.save();
        res.send(result);
    } catch(err) {
        const errMsgs = [];
        for (field in err.error) {
            errMsgs.push(err.error[field].message);
        }
        return res.status(400).send(errMsgs);
    }
}

const updateNews = async(req, res) => {
    const id = req.params.id;
    const updatedData = req.body;

    // Here we are approving  news by put request and also content updation
    // Idea : approval status ta ekhane restrict kora jaite pare,,,admin alada route or patch request dia satus true korbe

    try {
        const result = await News.findByIdAndUpdate(id, updatedData,{
            new: true,
            useFindAndModify: false
        });

        if (!result) return res.status(404).send('ID not found'); // Other should have this or not?

        res.send(result);
    } catch (err) {
        return res.status(404).send('ID not found'); //ager gulo te kan arokom hoy ni 
    }
}

const deleteNews = async(req, res) => {
    const id = req.params.id;

    try {
        const result = await News.findByIdAndDelete(id);

        if (!result) return res.status(404).send('ID not found'); // Other should have this or not?

        res.send(result);
    } catch (err) {
        return res.status(404).send('ID not found'); //ager gulo te kan arokom hoy ni 
    }
}

router.route('/')
    .get(allNews);

router.route('/letest')
    .get(letestNews);

router.route('/popular') 
    .get(mostPopular);


router.route('/:id')
    .get(incrementView, detailNews);

// Fetch all the approved news witch view is more.
router.route('/all/:category') 
    .get(categoryFilter);

router.route('/results/:search')
    .get(newsSearch);

router.route('/publisher/add')  
    .post([authorize, publisher], addNews);

router.route('/admin/add') // baki ase
    .post([authorize, admin], addNews)

router.route('/admin/:id')
    .put([authorize, admin, createView], updateNews)
    .delete([authorize, admin], deleteNews);

// ekta patch operation lagbe jeta dia approval system ta alada vabe kora jabe,,tkhn r update kor lagbe na

// error handle nia ekhane conflict dekhte pacchi...kon error ki dibe ta investigate kora lagbe

module.exports = router;