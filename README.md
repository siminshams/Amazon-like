# Amazon-like
The Amazon-like app will take in orders from customers and deplete stock from the store's inventory.The app has customer view, manager view, and supervisor view. The customer view takes orders from customers and depletes stock from the inventory. The manager view gives managers an overview of current products and allows them to add inventory or new products. The supervisor view tracks product sales across departments and allows supervisors to add new departments.

Customer View:
The app will display all of the items available for sale. Include the ids, names, and prices of products for sale.

![customerView screenshot](../master/Images/CustomerView1.JPG)


Enter the id of the product and the quantity you would like to purchase

If there is enough of the product in storage to meet your request, the app will return the total cost of your order:

![customerView screenshot](../master/Images/CustomerView2.JPG)

If there is not enough of the product in storage to meet your request, the app will return "Insufficient quantity"

![customerView screenshot](../master/Images/CustomerView3.JPG)

Manager View:
The app will display for command:
    * View Products for Sale
    
    * View Low Inventory
    
    * Add to Inventory
    
    * Add New Product

 ![managerView screenshot](../master/Images/ManagerView1.JPG)

 The `View Products for Sale` list every available item: the item IDs, names, prices, and quantities.

 ![managerView screenshot](../master/Images/ManagerView2.JPG)

 The `View Low Inventory` list all items with an inventory count lower than five.

![managerView screenshot](../master/Images/ManagerView3.JPG)

The `Add to Inventory`display a prompt that will let the manager "add more" of any item currently in the store.

![managerView screenshot](../master/Images/ManagerView4.JPG)

The `Add New Product`allow the manager to add a completely new product to the store.

![managerView screenshot](../master/Images/ManagerView5.JPG)