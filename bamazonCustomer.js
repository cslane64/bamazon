var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");
var colors = require('colors');
var cart = 0;

var connection = mysql.createConnection({
    host: "localhost",
    // port: 8889,
    port: 3306,
    user: "root",
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
    

       // showInv();
    var query = "SELECT item_id AS Item, product_name  AS Description, concat('$', price) AS Price FROM products";
    connection.query( query, function(err, res) {
        if (err) throw err;
        console.table(res);
       
        makePurchase();
    });
       // makePurchase();
};
  function showInv(){
    
    var query = "SELECT item_id AS Item, product_name  AS Description, concat('$', price) AS Price FROM products";
    connection.query( query, function(err, res) {
        if (err) throw err;
        console.table(res);
        //connection.end();
    });
  }
  
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
    var quantityOrdered = input.quantity;
    
    
		// Query db to confirm that the given item ID exists in the desired quantity
    var queryStr = 'SELECT * FROM products WHERE ?';
    connection.query(queryStr, {item_id: input.item_id}, function(err, res){
      if (err) throw err;
      //console.log('data = ' + JSON.stringify(res));

      if (res.length === 0){
        console.log("Error! You selected an invalid product! Please select a product in the list".red);
      } else {
        productData = res[0];
      }
      var inventory = productData.stock_quantity;
      

      if(quantityOrdered < inventory){
        var orderAmount = input.quantity * productData.price;
        cart = parseFloat(orderAmount).toFixed(2) + cart;
        console.log("Your transction has been processed".green);
        console.log("Your total purchase amount for this item is: $".green + parseFloat(orderAmount ).toFixed(2));
        console.log("The total cost is: $".blue + cart);
        var query2 = 'UPDATE products SET stock_quantity = stock_quantity - ?  WHERE item_id = 4';
        connection.query(query2, [quantityOrdered, item], function(err, res){
         // if (err) throw err;
        })
        //nextStep();
      } else {
        console.log("You have ordered more than we have in stock, please select again!");
        console.log("We currently have " + inventory + " of these in stock.");
        console.log ("Available for purchases...\n");
        
        var query = "SELECT item_id AS Item, product_name  AS Description, concat('$', price) AS Price FROM products";
        connection.query( query, function(err, res) {
          if (err) throw err;
          console.table(res);
          makePurchase();
          });
        }
      })
    })
  };

  function nextStep(){
    inquirer.prompt([
      {
        message: 'Would you like to purchase another item?',
        type: "confirm",
        name: "exit",
        default: true
      }

    ]).then(function(answers){
      if(answers.exit == true) {
        showInv();
        makePurchase();
      } else {
        console.log(" Thank your for shopping with Bamazon!!".bgCyan)
        connection.end();
        process.exit();
      }

    })

  }