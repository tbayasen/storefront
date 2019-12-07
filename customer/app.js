var mysql = require("mysql");
var inquirer = require("inquirer")
var Table = require("cli-table");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "pokémon_shop"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    displayShop();
});

function displayShop() {
    connection.query('SELECT * FROM pokémon_list', function (err, results) {
        if (err){console.log(err)};
        const pokémonTable = new Table({
            head: ['ID', 'Name', 'Type', 'Price', 'Quantity'],
            chars: {
                'top': '═', 'top-mid': '╤', 'top-left': '╔', 'top-right': '╗'
                , 'bottom': '═', 'bottom-mid': '╧', 'bottom-left': '╚', 'bottom-right': '╝'
                , 'left': '║', 'left-mid': '╟', 'mid': '─', 'mid-mid': '┼'
                , 'right': '║', 'right-mid': '╢', 'middle': '│'
            }
        });
        for (var i = 0; i < results.length; i++) {
            pokémonTable.push([results[i].poké_id,
            results[i].pokémon_name,
            results[i].pokémon_type,
            results[i].price,
            results[i].store_quantity]);
        };
        console.log(pokémonTable.toString());
        inquirer.prompt([
            {
                name: 'shop',
                type: 'confirm',
                message: 'Would you like to adopt a Pokémon?'
            }
        ]).then(answers => {
            if (answers.shop === true) {
                promptUser();
            }
            else {
                connection.end();
            }
        })
    });
}

function promptUser() {
    inquirer.prompt([
        {
            name: 'ID',
            type: 'input',
            message: 'Please enter the ID of the Pokémon you would like to "adopt"',
            filter: Number
        },
        {
            name: 'Quantity',
            type: 'input',
            message: 'How many would you like to "adopt"?',
            filter: Number
        }
    ]).then(answers => {
        var pokémonChoice = answers.ID;
        var pokémonQuantity = answers.Quantity;
        console.log(pokémonChoice)
        console.log(pokémonQuantity)
        calcOrder(pokémonChoice, pokémonQuantity);
    });
}

function calcOrder(pokémonChoice, pokémonQuantity) {
    connection.query('SELECT * FROM pokémon_list WHERE poké_id = ' + pokémonChoice , function (err, results) {
        console.log(results[0]);
        if (err){console.log(err)};
        if (pokémonQuantity <= results[0].store_quantity) {
            const totalPrice = results[0].price * pokémonQuantity;
            console.log("Congratulations! You are now the proud kidnapper of " + pokémonQuantity + " Pokémon!")
            console.log("Your total cost is: " + totalPrice);
            connection.query("UPDATE pokémon_list SET store_quantity = store_quantity - " + pokémonQuantity + " WHERE poké_id = " + pokémonChoice);
            displayShop();
        }
    });
}