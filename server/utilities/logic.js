//handle post
function handlePost (bodyName, storage) {
    //filter to see if item already exists
  var listItem = storage.items.filter(function (item) {
    return item.name.toLowerCase() === bodyName.toLowerCase();

  });

  if (listItem.length > 0) {
    return({
      message: "Item already in the shopping list."
    });
  } else {

     var newItem = storage.addItem(bodyName);
    return ({
      message: "Success",
      itemList: storage.items
    });
  }
}

//itemID = req.params.id
//body = req.body
///handle put
function handlePut (itemID, body, storage) {
    // //validating to see if it exists
  var listItem = storage.items.filter(function (item) {
    return item.id === parseInt(itemID);
  });


  //if item with that id exists, do the following
  if (listItem.length>0){

  //looping through storage items to find object with that id, and then changing it to whatever req.body.name input in httpie is
    for (var i = 0; i < storage.items.length; i++) {
       if (storage.items[i].id === parseInt(itemID)) {
          for (var key in body) {
            if (key === 'name') {
              storage.items[i].name = body.name;
            }
        }
      }
    }
    //updated on the browser
    return storage.items;
  } else {
    var newItem = storage.addItem(body.name);
    console.log(newItem, "newItem");
    return ({
      message: "Success",
      itemList: storage.items
    });

  }
}

//handle delete
function handleDelete(itemID, storageArray) {
  var listItem = storageArray.filter(function(item){
    return item.id===parseInt(itemID);
  });
  if(listItem.length>0){
    for (var i = 0; i < storageArray.length; i++) {
      if(storageArray[i].id === parseInt(itemID)){

        var tempItem = storageArray.splice(i, 1);
        return {
          message: 'That item is off the list!',
          removedItem: tempItem,
          itemlist: storageArray
        };
      }
    }
  } else {
    return ("That item doesn't exist");
  }
}

//export function

module.exports = {
  handlePost: handlePost,
  handleDelete: handleDelete,
  handlePut: handlePut,
};
