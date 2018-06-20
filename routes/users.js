var express = require('express');
var router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const knexConfig = require('../knexfile.js')[environment];
const knex = require('knex')(knexConfig);
/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  knex('users')
  .then(function(users){
    res.render('users', {
      users
    });
  })
});

module.exports = router;
