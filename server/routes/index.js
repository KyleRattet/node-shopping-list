var express = require('express');
var router = express.Router();

//ITEM CLASS CONSTRUCTOR
function ItemLibrary () {
  this.items = [];
  this.id = 0;
}

//Item Method

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
