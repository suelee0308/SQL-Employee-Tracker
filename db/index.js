const mysql = require('mysql2');
const cTable = require('console.table');
const connection = require('./connections');

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
    FROM employee INNER JOIN employee_role ON employee.role_id`;
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
    const query = `SELECT employee.id,
    `
}

function addRole() {
    const query = `SELECT employee.id,
    `
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