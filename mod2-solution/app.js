(function(){
'use strict';

angular.module('ShoppingListCheckOff',[])
.controller('ToBuyController',ToBuyController)
.controller('AlreadyBoughtController',AlreadyBoughtController)
.service('ShoppingListCheckOffService',ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService)
{
    var list1 = this;

    list1.itemName = "";
    list1.itemQuantity = "";

    list1.itemsToBuy = ShoppingListCheckOffService.getItemsToBuy();

    list1.AddToBought = function ()
    {
      try
      {
        ShoppingListCheckOffService.AddToBought(list1.itemName,list1.itemQuantity.itemIndex);
      }
      catch(error)
      {
         list1.errorMessage = error.message;
      }
    }
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService)
{
  var list2 = this;

  try
  {
  list2.itemsBought = ShoppingListCheckOffService.getItemsBought();
  }
  catch(error)
  {
    list2.errorMessage = error.message;
  }
}


function ShoppingListCheckOffService()
{
  var service = this;

  var itemsToBuy = [
    {
      name:"cookies",
      quantity:"10 bags"
    },
    {
      name:"chips",
      quantity:"20 bags"
    },
    {
      name:"milk",
      quantity:"10 bottles"
    }
  ];
  var itemsBought = [];

  service.AddToBought = function (itemName,itemQuantity,itemIndex)
  {
      var items = {
        name : itemName,
        quantity : itemQuantity
      };
      itemsBought.push(items);
      itemsToBuy.splice(itemIndex,1);

  };

  service.getItemsToBuy = function()
  {
    if(itemsToBuy.length != 0)
    {
      return itemsToBuy;
    }
    else
    {
      throw new Error("Everything is bought!");
    }
  };

  service.getItemsBought = function()
  {
    if(itemsBought.length != 0)
    {
        return itemsBought;
    }
    else
    {
      throw new Error("Nothing bought yet.");
    }

  };

}


})();
