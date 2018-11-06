var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "SHams1363$",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected as Id " + connection.threadId + "\n");
    afterConnection();
});

function afterConnection() {
    inquirer.prompt({
        type: "list",
        name: "menu",
        message: "What do you want to do?",
        choices: [
            "View Products for Sale",
            "View Low Inventory",
            "Add to Inventory",
            "Add New Product"
        ]
    }).then(function (answer) {
        if (answer.menu === "View Products for Sale") {
            viewProducts();
        }
        else if (answer.menu === "View Low Inventory") {
            lowInventory();
        }
        else if (answer.menu === "Add to Inventory") {
            addToInventory();
        }
        else{
            addNewItem()
        }

    });
    //View Products for Sale Function
    function viewProducts() {
        connection.query("SELECT * FROM products", function (err, result) {
            if (err) throw err;
            console.log("ID" + "| " + "  Product Name" + "   | " + " Price" + " |" + "Quantities");
            console.log("----------------------------------------");
            for (var i = 0; i < result.length; i++) {
                console.log(result[i].item_id + " | " + result[i].product_name + " | " + " $" + result[i].price + " | " + result[i].stock_quantity);
            }
        })
    };
    //View Low Inventory Function
    function lowInventory() {
        connection.query("SELECT * FROM products", function (err, result) {
            if (err) throw err;
            console.log("ID" + "| " + "\t\tProduct Name" + "\t|" + "  Quantities");
            console.log("---------------------------------------------------");
            for (var i = 0; i < result.length; i++) {
                if (result[i].stock_quantity < 5) {
                    console.log(result[i].item_id + " | " + result[i].product_name + " | " + result[i].stock_quantity);
                }
            }
        });
    };

    //Add to Inventory Function
    function addToInventory() {
        connection.query("SELECT * FROM products", function (err, result) {
            if (err) throw err;
            inquirer.prompt([
                {
                    type: "list",
                    name: "choice",
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < result.length; i++) {
                            choiceArray.push(result[i].product_name);
                        }
                        return choiceArray;
                    },
                    message: "Which item do you want to add to?"
                },
                {
                    name: "add",
                    message: "How many do you want to add? "
                }
            ])
            .then(function (answer) {
                var add = parseInt(answer.add);
                var chosenItem;
                for (var i = 0; i < result.length; i++) {
                    if (answer.choice === result[i].product_name) {
                        chosenItem = result[i];

                    }
                }
                connection.query("UPDATE products SET ? WHERE ?",
                    [
                    {
                        stock_quantity: chosenItem.stock_quantity + add
                    },
                    {
                        product_name: answer.choice
                    }
                    ], function (err) {
                        if (err) throw err;
                        console.log("Item has been added successfully!");
                    }
                )
            });
        });
    };
    //Add New Item Function
    function addNewItem(){
        inquirer
        .prompt([
          {
            name: "item",
            type: "input",
            message: "What is the item you would like to add?"
          },
          {
            name: "department",
            type: "input",
            message: "What department would you like to place your item in?"
          },
          {
            name: "price",
            type: "input",
            message: "What is the unit price for the added item?",
            validate: function(value) {
              if (isNaN(value) === false) {
                return true;
              }
              return false;
            }
          },
          {
            name: "quantity",
            type: "input",
            message: "How many would you like to add?"
          }
        ])
        .then(function(answer){
            connection.query("INSERT INTO products SET ?",{
                product_name: answer.item,
                department_name: answer.department,
                price: answer.price,
                stock_quantity: answer.quantity
            },
            function(err){
                if(err)throw err;
                console.log("Your item has been added successfully!")
            }
        );
        });
    };
}
