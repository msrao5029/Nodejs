var express = require('express');
var router = express.Router();

var config = require('./student.json');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('test',
        {
            title: config.gender,
            name:config.name,
            age:config.age,
            gender:config.gender,

        });
});

module.exports = router;
