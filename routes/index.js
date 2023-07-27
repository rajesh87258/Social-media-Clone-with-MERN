const express = require('express');

const router = express.Router();

const homeController = require('../controllers/home_controllers');


console.log('Router Loaded');

router.get('/', homeController.home);
router.use('/users', require('./users'));

router.use('/posts', require('./posts'));
// router.use('/comments', require('./comments'));
router.use('/comments', require('./comments'));


// router.use('/post', require('./post'));

//for any further routes , access from here
//router.use('/routerName', require('./routerfile));

module.exports = router;