const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const connection = require('./db/connections');
const { viewDept, viewRole, viewEmp, addDept, addRole, addEmp, updateRole } = require('./db/index')
// const { connect } = require('./db/connections');


connection.connect((err) => {
    if (err) throw err;
    begin()
});


// function to run once connection is made, show prompt selections
function begin() {
    inquirer.prompt ([{
        type: "list",
        name: "main",
        message: "Hello! Welcome to The Office Employee Tracker. Please select from the options below.",
        choices: [
            "View all departments",
            "View all roles",
            "View all employees",
            "Add a department",
            "Add a role",
            "Add an employee",
            "Update an employee role",
            "Exit"
        ]
    }])
    // switch case through all choices and run function, imported from index.js in db folder
    .then((answer) => {
        switch(answer.main) {
            case "View all departments" : {
                viewDept();
                break;
            }
            case "View all roles" : {
                viewRole();
                break;
            }
            case "View all employees" : {
                viewEmp();
                break;
            }
            case "Add a department" : {
                addDept();
                break;
            }
            case "Add a role" : {
                addRole();
                break;
            }
            case "Add an employee" : {
                addEmp();
                break;
            }
            case "Update an employee role" : {
                updateRole();
                break;
            }
            case "Exit" : {
                return; //add ending sign?
                // break;
            }
        }
    });
}
