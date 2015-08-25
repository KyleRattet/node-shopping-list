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

//route handler showing items in json format
router.get('/items', function(req, res, next) {
  res.json(storage.items);
});

//POST single item
router.post('/items', function(req, res) {

  var newItem = storage.addItem(req.body.name);
  storage.item.push(newItem);
  console.log(storage.item);

  res.json({
    message: "success", item: newItem
  });


});

module.exports = router;
