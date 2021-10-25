const mysql = require('mysql2');
const cTable = require('console.table');
const connection = require('./connections');
const inquirer = require('inquirer');

// const { start } = require("repl");

function viewDept() {
    const query = `SELECT * FROM department`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log("---------------------");
        console.log("All Departments:")
        console.log("---------------------");
        console.table(res);
        begin();
    });
};

function viewRole() {
    const query = `SELECT * FROM employee_role`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log("---------------------");
        console.log("All Roles:")
        console.log("---------------------");
        console.table(res);
        begin()
    });
}

function viewEmp() {
    const query = `SELECT employee.id,
    employee.first_name,
    employee.last_name,
    employee_role.id,
    employee_role.title,
    employee_role.salary,
    employee.manager_id
    FROM employee INNER JOIN employee_role ON employee_role.id = employee.role_id`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log("---------------------");
        console.log("All Employees:")
        console.log("---------------------");
        console.table(res);
        begin()
    });
}

function addDept() {
    inquirer.prompt ([{
        name: "dep_name",
        message: "What department would you like to add?",
        type: "input",
    }])
    .then((answer) => {
       const query = `INSERT INTO department(dep_name) VALUES (?)` 
       connection.query(query, [answer.dep_name], (err, res) => {
        if (err) throw err;

            const query = `SELECT * FROM department`;
            connection.query(query, (err, res) => {
            if (err) throw err;
            console.log("---------------------");
            console.log("New Department Added:")
            console.log("---------------------");
            console.table(res);
            begin();
            });
        });
    })
}

function addRole() {
    inquirer.prompt ([
        {
        name: "title",
        message: "What role would you like to add?",
        type: "input",
        },
        {
        name: "salary",
        message: "What is the salary of this new role?",
        type: "number",
        },
        {
        name: "department_id",
        message: "What department is the new role under? Please input department id.",
        type: "number"
        }
    ])
    .then((answer) => {
       const query = `INSERT INTO employee_role(title, salary, department_id) VALUES (?, ?, ?)` 
       connection.query(query, [answer.title, answer.salary, answer.department_id], (err, res) => {
        if (err) throw err;

            const query = `SELECT * FROM employee_role`;
            connection.query(query, (err, res) => {
            if (err) throw err;
            console.log("---------------------");
            console.log("New Role Added:")
            console.log("---------------------");
            console.table(res);
            begin();
            });
        });
    })
}

function addEmp() {
    const query = `SELECT employee.id,
    `
}

function updateRole() {
    const query = `SELECT employee.id,
    `
}

module.exports = { viewDept, viewRole, viewEmp, addDept, addRole, addEmp, updateRole }