var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    //port: 8889,
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "root",
    database: "bamazon"
  });

  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    start();
  });

  function start() {
    console.log ("Available for purchase...\n");
    var query = "SELECT item_id AS Item, product_name  AS Description, concat('$', price) AS Price FROM products";
    connection.query( query, function(err, res) {
        if (err) throw err;
        console.table(res);
        connection.end();
    });
};
  makePurchase();

  
  function makePurchase() {
  inquirer
    .prompt({
      item: "item#",
      type: "input",
      message: "What is the ID of the item you would like to purchase?",
    },
    {
      quantity: "quantity",
      type: "input",
      message: "How many units would you like to purchase?"

    })
    .then(function(answer){
      //connection.query(
      
          //var query = "UPDATE products SET stock_quantity = stock_quantity - 2 WHERE item_id = 3 ";
            var query = "SELECT * FROM products";
          connection.query( query, function(err, res)     
                      
            {
            if (err) throw err;
            //console.log(res.length + "matches found")
            console.log(res);
           /* for(var i = 0; i < res.length; i++){
              console.log(
                i+1 + ".) " +
                  "Year: " + res[i].year +
                  " || Album Position: " + res[i].position +
                  " || Artist: " + res[i].artist +
                  " || Song: " + res[i].song +
                  " || Album: " + res[i].album
              
              )
            }*/
          });
          connection.end();
    });
  };