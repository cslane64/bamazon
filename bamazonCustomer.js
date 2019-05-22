var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 8889,
    //port: 3306,
  
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
        //connection.end();
        makePurchase();
    });
};
  
  
function makePurchase(){

  inquirer.prompt([
		{
			type: 'input',
			name: 'item_id',
			message: 'Please enter the Item ID which you would like to purchase.',
			filter: Number
		},
		{
			type: 'input',
			name: 'quantity',
			message: 'How many do you need?',
			filter: Number
		}
	]).then(function(input) {
		// console.log('Customer has selected: \n    item_id = '  + input.item_id + '\n    quantity = ' + input.quantity);

		var item = input.item_id;
		var quantity = input.quantity;

		// Query db to confirm that the given item ID exists in the desired quantity
    var queryStr = 'SELECT * FROM products WHERE ?';
    connection.query(queryStr, {item_id: input.item_id}, function(err, res){
      console.log('data = ' + JSON.stringify(res));

      if (res.length === 0){
        console.log("Error! You selected an invalid product! Please select a product in the list");
      } else {
        productData = res[0];
      }
      console.log(productData.stock_quantity);

      /*if(productData.stock_quantity <= quantity) {
        console.log("These is not sufficient quantity in stock for your order. Please choose a lower quantity!");
      } else {
        var query = "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ? ";
        connection.query( query, {quantity: input.quantity}, {item: input.item}, function(err, res) {
          console.log("Your order has been placed");
        })
      }*/
      })
    


    console.log(item, quantity);
    

    


  /*
      
          //var query = "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ? ";
          //var query = "SELECT * FROM products";
          //connection.query( query, answer.quantity, answer.name, function(err, res)     
                      
            //{
           // if (err) throw err;
            //console.log(res.length + "matches found")
            //console.log(res);
           /* for(var i = 0; i < res.length; i++){
              console.log(
                i+1 + ".) " +
                  "Year: " + res[i].year +
                  " || Album Position: " + res[i].position +
                  " || Artist: " + res[i].artist +
                  " || Song: " + res[i].song +
                  " || Album: " + res[i].album
              
              )
            }
          });*/
          connection.end();
    //});
        })
  };