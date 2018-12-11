
// VARIABLESSS
var inquirer = require('inquirer');
var mysql = require('mysql');
var table = require('console.table');
var itemId;
var amount;
var stock;
var name;
var price;



//Connection with Mysql 
var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'root',
	database: 'bamazon'
}); 

//Establish Connection
connection.connect(function(err){
	if (err) throw err;
	console.log('connected as id: ' + connection.threadId)
	start()
});



function start() {
    //Shows products available for purchase and console.table npm was install for this function
    connection.query("SELECT * FROM bamazon.products", function (err, res) {
        if (err) throw err;
        console.log("\nCurrent items available for purchase: \n")
        console.table(res);
    });

    //Prompts user to select a item_ID and amounts of products desire to purchase
    inquirer.prompt([
        {
            type: "input",
            name: "itemId",
            message: "\nWhat is the item ID you would like to buy?"
        },
        {
            type: "input",
            name: "amount",
            message: "\nHow many would you like to buy?"
        }
    ]).then(function (response) {

        itemId = response.itemId;
        amount = response.amount;

        purchase();
    })

};


function purchase() {
    //Updates the stock amount after purchases and subtracts it from orignal stock
    connection.query("SELECT stock_quantity, product_name, price FROM products WHERE item_id=?", [itemId], function (err, res) {
        if (err) throw err;

        //Store variables
        stock = parseInt(res[0].stock_quantity);
        name = res[0].product_name;
        price = parseFloat(res[0].price);

        if (stock - amount > 0) {
            //Update stock with new amount
            stock = stock - amount;
            console.log("\nYou have purchased " + amount + " " + name + "s" +
                "\n Your total cost is " + "$" + (price * amount).toFixed(2));
            updateStock();

            inquirer.prompt([
                {
                    type:"list",
                    name:"another",
                    message:"\nWould you like to buy another item?",
                    choices:["YES", "NO"]
                }
            ]).then(function(response){
                if (response.another === "YES"){
                    start();
                } else {
                    console.log("\nThank you for shopping @ BAMAZON!!, \n SEE YOU SOON!");
                    return;
                }
            });
        }
        else {
            console.log("\nSorry! Insufficient quantity! Make another selection please.\n");
            start();
        }
    });

   
}


function updateStock() {
    connection.query("UPDATE products SET stock_quantity=? WHERE item_id=?", [stock, itemId], function (err, res) {
        if (err) throw err;
    });
}

