var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 8889,
  
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
    var query = "SELECT item_id, product_name, price FROM products";
    connection.query( query, function(err, res) {
        if (err) throw err;
        console.table(res);
        connection.end();
    });
};

  
    /*inquirer
      .prompt({
        name: "artist",
        type: "input",
        message: "What is the name of the artist you would like to search?"

         })
      .then(function(answer){
        //connection.query(
        
           var query = "Select topAlbums.year, topAlbums.position, topAlbums.artist, top5000.song, album FROM topAlbums ";
                        query += "INNER JOIN top5000 on topAlbums.artist = top5000.artist  WHERE (topAlbums.artist = ?) ",
           connection.query( query, answer.artist, function(err, res)     
                        
             {
              if (err) throw err;
              console.log(res.length + "matches found")
              console.log(res);
              for(var i = 0; i < res.length; i++){
                console.log(
                  i+1 + ".) " +
                    "Year: " + res[i].year +
                    " || Album Position: " + res[i].position +
                    " || Artist: " + res[i].artist +
                    " || Song: " + res[i].song +
                    " || Album: " + res[i].album
                
                )
              }
            });
            connection.end();
      });
  }*/