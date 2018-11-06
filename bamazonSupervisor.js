var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require("console.table");

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

function afterConnection(){
    inquirer.prompt({
        type:"list",
        name:"choice",
        message:"What do you want to do?",
        choices:[
            "View Product Sales by Department",
            "Create New Department"
        ]
    }).then(function(answer){
        if (answer.choice === "View Product Sales by Department") {
            viewSaleByDepartment();
        }
        else {
            createNewDepartment();
        }
    });

    function viewSaleByDepartment(){
        var query = "SELECT departments.department_id, products.department_name, departments.over_head_costs, products.product_sales, product_sales-over_head_costs as total_profit FROM departments INNER JOIN products on products.department_name = departments.department_name";
        connection.query(query, function(err,result){
           // console.log(result);
            if(err)throw err;
            var array=[];
            for (var i = 0;i<result.length;i++){
                array.push(result[i].department_id);             
                array.push(result[i].department_name);              
                array.push(result[i].over_head_costs);              
                array.push(result[i].product_sales);
                array.push(result[i].total_profit);
            }
           console.table(array);
        
        }); 
    }  
      
    

    function createNewDepartment(){
     inquirer
      .prompt([
          {
            name: "department",
            type: "input",
            message: "What department would you like to add?"
          },
          
        ])
        .then(function(answer){
            connection.query("INSERT INTO departments SET ?",{
                department_name: answer.department,
                over_head_costs:0                
            },
             function(err){
                if(err)throw err;
                console.log("Your department has been added successfully!")
            }
        );
        });    
    }
}
