var express = require('express');
var router = express.Router();
var logic = require('../utilities/logic');

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

//POST route refactored
router.post('/items', function(req, res) {
  var response = logic.handlePost(req.body.name, storage.items);
  res.json(response);

});

//POST  item - original
// router.post('/items', function(req, res) {
//   //filter to see if item already exists
//   var listItem = storage.items.filter(function (item) {
//     return item.name.toLowerCase() === req.body.name.toLowerCase();

//   });
//   // console.log(listItem);

//   if (listItem.length > 0) {
//     res.json({
//       message: "Item already in the shopping list."
//     });
//   } else {
//     var newItem = storage.addItem(req.body.name);
//     res.json({
//       message: "Success",
//       itemList: storage.items
//     });

//   }

// });

//refactored put
router.put('/item/:id', function(req, res, next) {
  var response = logic.handlePut(req.params.id, req.body, req.body.name, req.body.id, storage.items);
  res.json(response);

});

// //put single item version 1
// router.put('/item/:id', function(req, res, next) {

//   // //validating to see if it exists
//   var listItem = storage.items.filter(function (item) {
//     return item.id === parseInt(req.params.id);
//   });

//   console.log(req.body, "req body");
//   console.log(req.body.name, "req body name");
//   console.log(req.body.id, "req body id");
//   //if item with that id exists, do the following
//   if (listItem.length>0){

//   //looping through storage items to find object with that id, and then changing it to whatever req.body.name input in httpie is
//     for (var i = 0; i < storage.items.length; i++) {
//        if (storage.items[i].id === parseInt(req.params.id)) {
//           for (var key in req.body) {
//             if (key === 'name') {
//               storage.items[i].name = req.body.name;
//             } else if (key === 'id') {
//               storage.items[i].id = req.body.id;
//             }
//         }
//       }
//     }
//     //updated on the browser
//     res.json(storage.items);
//   } else {
//     var newItem = storage.addItem(req.body.name);
//     res.json({
//       message: "Success",
//       itemList: storage.items
//     });

//   }

// });


//refactored delete route
router.delete('/item/:id', function(req, res, next){
  var response = logic.handleDelete(req.params.id, storage.items);
  res.json(response);
});


///delete route before refactoring
//http DELETE localhost:3000/item/2
// router.delete('/item/:id', function(req, res, next){

//   //test to  see if item exists
//   var listItem = storage.items.filter(function (item) {
//     return item.id === parseInt(req.params.id);
//   });

//   if (listItem.length > 0) {
//     for (var i = 0; i < storage.items.length; i++) {
//       if (storage.items[i].id === parseInt(req.params.id)) {

//         var tempItem = storage.items.splice(i,1);
//         res.json({
//           message: "That item is deleted from the list!",
//           removedItem: tempItem,
//           itemList: storage.items
//         });
//       }
//     }
//   } else {
//     res.json("This item doesn't exist in the list.");
//   }

// });






module.exports = router;
