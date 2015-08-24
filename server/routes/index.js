var express = require('express');
var router = express.Router();

//ITEM CLASS CONSTRUCTOR
function ItemLibrary () {
  this.items = [];
  this.id = 0;
}

//Item Methods
ItemLibrary.prototype.addItem = function (name) {
  var newItem = {
    name: name,
    id: this.id
  };
  this.items.push(newItem);
  this.id += 1;
};

//test instances
var storage = new ItemLibrary ();
storage.addItem('apples');
storage.addItem('bananas');
storage.addItem('oranges');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
