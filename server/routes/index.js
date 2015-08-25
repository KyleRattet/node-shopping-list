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
  var listItem = storage.items.filter(function (item) {
    return item.name.toLowerCase() === req.body.name.toLowerCase();

  });

  if (listItem.length > 0) {
    res.json({
      message: "Item already in the shopping list."
    });
  } else {
    var newItem = storage.addItem(req.body.name);
    res.json({
      message: "Success",
      itemList: storage.items
    });

  }

});

// //put single item
router.put('/items/:id', function(req, res, next) {

  // //validating to see if it exists
  var listItem = storage.items.filter(function (item) {
    return item.id === parseInt(req.params.id);
  });

  console.log(listItem);

  if (listItem.length>0){

    for (var i = 0; i < storage.items.length; i++) {
       if (storage.items[i].id === parseInt(req.params.id)) {
          for (key in req.body) {
            if (key === 'name') {
              storage.items[i].name = req.body.name;
            }
        }
      }
    }
    res.send(storage.items);
  } else {
    res.json({message: "Item doesn't exist."});
  }



});




module.exports = router;
