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
    console.log("Connected as Id: " + connection.threadId + "\n");
    afterConnection();
});

function afterConnection() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("ID" + "| " + "  Product Name" + "     | " + "  Price");
        console.log("----------------------------------------");
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + " $" + res[i].price);
        }

        start();
    });
0
    function start() {
        inquirer.prompt([{
            name: "id",
            message: "What is the ID of the product you would like to buy?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },
        {
            name: "units",
            message: "How many units of the product would you like to buy?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }])
            .then(function (answer) {
                var id = parseInt(answer.id);
                var unit = parseInt(answer.units)
                var chosenItem;
                connection.query("SELECT * FROM products", function (err, result) {
                    // console.log(result);
                    if (err) throw err;
                    for (var i = 0; i < result.length; i++) {
                        if (id === result[i].item_id) {
                            // connection.query("UPDATE products SET result[i].stock_quantity = ?",
                            //     result[i].stock_quantity = result[i].stock_quantity - unit
                            chosenItem = result[i];
                            
                        }                        
                    }
                    if(chosenItem.stock_quantity >= unit){
                        connection.query("UPDATE products SET stock_quantity=?, product_sales=? WHERE ?",
                        [
                            chosenItem.stock_quantity - unit,
                            chosenItem.price * unit,
                          
                          {
                            item_id: id  
                          }
                        ], function(err){
                            if(err) throw err;
                            console.log("Order has been placed");
                            console.log("Total Price is: " + "$" + (unit * chosenItem.price));
                        }
                     );
                    }
                    else{
                        console.log("Insufficient quantity!");
                        
                    }
                })
                
            });
    };
}
