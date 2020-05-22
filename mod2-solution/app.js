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

    list1.AddToBought = function (itemIndex)
    {
        ShoppingListCheckOffService.AddToBought(list1.itemName,list1.itemQuantity);
        ShoppingListCheckOffService.removeItem(itemIndex);
    }
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService)
{
  var list2 = this;

  list2.itemName = "";
  list2.itemQuantity = "";

  list2.itemsBought = ShoppingListCheckOffService.getItemsBought();

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
    },
    {
      name:"cold drinks",
      quantity:"5 bottles"
    },
    {
      name:"ketchup",
      quantity:"2 bottles"
    }
  ];
  var itemsBought = [];

  service.AddToBought = function (itemName,itemQuantity)
  {
      var items = {
        name : itemName,
        quantity : itemQuantity
      };
      itemsBought.push(items);
      // return itemsBought;
  };

  service.removeItem = function(itemIndex)
  {
      itemsToBuy.splice(itemIndex,1);
  };
  service.getItemsToBuy = function()
  {
      return itemsToBuy;
  };

  service.getItemsBought = function()
  {
        return itemsBought;

  };

}


})();
