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
    logPokémon();
});

function logPokémon() {
    connection.query("SELECT * FROM pokémon_shop", function (err, results) {
        if (err) throw err;
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
            pokémonTable.push([results[i].id,
            results[i].pokémon_name,
            results[i].pokémon_type,
            results[i].price,
            results[i].store_quantity]);
        };
        console.log(pokémonTable.toString());
        promptUser();
    })
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
    ]).then(function (response) {
        var pokémonChoice = response.ID;
        var pokémonQuantity = response.Quantity;
        calcOrder(pokémonChoice, pokémonQuantity);
    });
}

function calcOrder(pokémonChoice, pokémonQuantity) {
    connection.query("SELECT * FROM pokémon_shop WHERE id = " + pokémonChoice, function (err, results) {
        if (err) throw err;
        if (pokémonQuantity <= results[0].store_quantity) {
            console.log("Congratulations! You are now the proud kidnapper of " + pokémonQuantity + " Pokémon!")
            connection.query("UPDATE products SET store_quantity = store_quantity " + pokémonQuantity + " WHERE id = " + pokémonChoice);
            logPokémon();
        }
        connection.end();
    });
}