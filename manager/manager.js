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
    // console.log("connected as id " + connection.threadId + "\n");
});

function displayAll() {
    connection.query('SELECT * FROM pokémon_list', function (err, results) {
        if (err) { console.log(err) };
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
        console.log('\n' + pokémonTable.toString());
    });
}

function runManager() {
    inquirer.prompt([
        {
            name: 'menu',
            type: 'list',
            message: 'What would you like to do today?',
            choices: [
                'View Pokémon for Sale',
                'View Low Inventory',
                'Add to Inventory',
                'Add new Pokémon',
                'Exit'
            ],
        }
    ]).then(answers => {
        console.log('You have selected: ' + answers.menu);
        if (answers.menu === 'View Pokémon for Sale') {
            viewStore();
        }
        else if
            (answers.menu === 'View Low Inventory') {
            viewLow();
        }
        else if
            (answers.menu === 'Add to Inventory') {
            promptBreed();
        }
        else if
            (answers.menu === 'Add new Pokémon') {
            promptNew();
        }
        else if
            (answers.menu === 'Exit') {
                connection.end();
            }
    });
}

function returnMenu() {
    inquirer.prompt([
        {
            name: 'back',
            type: 'confirm',
            message: 'Would you like to go back to the main menu?'
        }
    ]).then(answers => {
        if (answers.back === true) {
            runManager();
        }
        else {
            connection.end();
        }
    })   
}

function viewStore() {
    displayAll();
    returnMenu();
}

function viewLow() {
    connection.query('SELECT * FROM pokémon_list WHERE store_quantity < 10', function (err, results) {
        if (err) { console.log(err) };
        const lowTable = new Table({
            head: ['ID', 'Name', 'Type', 'Price', 'Quantity'],
            chars: {
                'top': '═', 'top-mid': '╤', 'top-left': '╔', 'top-right': '╗'
                , 'bottom': '═', 'bottom-mid': '╧', 'bottom-left': '╚', 'bottom-right': '╝'
                , 'left': '║', 'left-mid': '╟', 'mid': '─', 'mid-mid': '┼'
                , 'right': '║', 'right-mid': '╢', 'middle': '│'
            }
        });
        for (var i = 0; i < results.length; i++) {
            lowTable.push([results[i].poké_id,
            results[i].pokémon_name,
            results[i].pokémon_type,
            results[i].price,
            results[i].store_quantity]);
        };
        console.log('\n' + lowTable.toString());
        returnMenu();
    });
}

function promptBreed() {
    inquirer.prompt([
        {
            name: 'ID',
            type: 'input',
            message: 'Please enter the ID of the Pokémon you would like to breed:',
            filter: Number
        },
        {
            name: 'Quantity',
            type: 'input',
            message: 'How many would you like to breed?',
            filter: Number
        }
    ]).then(answers => {
        var breedChoice = answers.ID;
        var breedQuantity = answers.Quantity;
        console.log(breedChoice)
        console.log(breedQuantity)
        breedPokémon(breedChoice, breedQuantity);
    });
}

function breedPokémon(breedChoice, breedQuantity) {
    connection.query('SELECT * FROM pokémon_list WHERE poké_id = ' + breedChoice, function (err, results) {
        if (err) throw err;
        connection.query('UPDATE pokémon_list SET store_quantity = store_quantity + ' + breedQuantity + ' WHERE poké_id = ' + breedChoice)
        viewStore();
    })
}

function promptNew() {
    inquirer.prompt([
        {
            name: 'newName',
            type: 'input',
            message: 'Enter the name of the pokémon:'
        },
        {
            name: 'newType',
            type: 'input',
            message: 'Enter the type of the pokémon:'
        },
        {
            name: 'newPrice',
            type: 'input',
            message: 'How much would you like to sell this pokémon for?'
        },
        {
            name: 'newQuantity',
            type: 'input',
            message: 'How many of these would you like to sell?',
            filter: Number
        }
    ]).then(answers => {
        var newName = answers.newName;
        var newType = answers.newType;
        var newPrice = answers.newPrice;
        var newQuantity = answers.newQuantity;
        newPokémon(newName, newType, newPrice, newQuantity);
    });
}

function newPokémon(newName, newType, newPrice, newQuantity) {
    connection.query('INSERT INTO pokémon_list (pokémon_name, pokémon_type, price, store_quantity) VALUES ' + '("' + newName + '","' + newType + '","' + newPrice + '","' + newQuantity + '")');
    viewStore();
}

runManager();