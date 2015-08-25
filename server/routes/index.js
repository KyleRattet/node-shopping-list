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
storage.addItem('Noodles');
storage.addItem('Tomatoes');
storage.addItem('Peppers');

//route handler showing items in json format
router.get('/items', function(req, res, next) {
  res.json(storage.items);
});

//POST single item
router.post('/items', function(req, res) {
  //filter to see if item already exists


  var newItem = storage.addItem(req.body.name);
  // console.log(req.body.name);
  // console.log(newItem);
  // storage.item.push(newItem);
  console.log(storage);

  res.json({
    message: "success", item: newItem
  });

});

// //put single item
// router.put('/items/:id', function(req, res, next) {

// });




module.exports = router;
