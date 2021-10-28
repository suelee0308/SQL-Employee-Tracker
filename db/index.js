const mysql = require('mysql2');
const cTable = require('console.table');
const connection = require('./connections');
const inquirer = require('inquirer');
const { connect } = require('./connections');

async function viewDept() {
    const query = `SELECT * FROM department`;
    return connection.promise().query(query);
};

async function viewRole() {
    const query = `SELECT * FROM employee_role`;
    return connection.promise().query(query);
}

async function viewEmp() {

    const query = `SELECT employee.id,
    employee.first_name,
    employee.last_name,
    e.first_name as manager_first_name,
    e.last_name as manager_last_name,
    employee_role.title,
    employee_role.salary,
    employee.manager_id
    FROM employee JOIN employee_role ON employee_role.id = employee.role_id
    JOIN employee e ON e.id = employee.manager_id
    JOIN department WHERE department_id = department.id ORDER BY employee.id`;
    return connection.promise().query(query);
}

async function viewEmpByDep() {
    const depName = await inquirer.prompt ([{
        name: "dep_name",
        message: "What department would you like to view the employees of?",
        type: "list",
        choices: [
            "Accounting",
            "Sales",
            "Customer Service",
            "Quality Assurance",
            "Warehouse",
            "Management"
        ]
    }])
    const depQuery = await connection.promise().query(`SELECT id FROM department WHERE department.dep_name = ?`, depName.dep_name)
    console.log(depQuery);
    const query = await connection.promise().query(`SELECT department.id,
        department.dep_name,
        employee_role.id,
        employee_role.department_id,
        employee.first_name,
        employee.last_name,
        employee.role_id
        FROM department INNER JOIN employee_role ON department.id = employee_role.department_id
        JOIN employee ON employee_role.id = employee.role_id WHERE department.id = ?`, depQuery[0][0].id);
    return query;
}

async function addDept() {
    const depInfo = await inquirer.prompt ([{
        name: "dep_name",
        message: "What department would you like to add?",
        type: "input",
    }])
    await connection.promise().query(`INSERT INTO department (dep_name) VALUE (?)`, depInfo.dep_name) 
    const query = await connection.promise().query(`SELECT * FROM department`);
    return query;     
}

async function addRole() {
    const roleInfo = await inquirer.prompt ([
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
    ]);
    await connection.promise().query(`INSERT INTO employee_role(title, salary, department_id) VALUES (?, ?, ?)`, [roleInfo.title, roleInfo.salary, roleInfo.department_id]);

    const query = await connection.promise().query(`SELECT * FROM employee_role`);
    return query;
}

async function addEmp() {
    const empInfo = await inquirer.prompt ([
        {
        name: "first_name",
        message: "What is the new employee's first name?",
        type: "input",
        },
        {
        name: "last_name",
        message: "Last name?",
        type: "input",
        },
        {
        name: "role",
        message: "What is the new employee's role? Please input their role id.",
        type: "number"
        }
    ]);
    await connection.promise().query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, 1)`, [empInfo.first_name, empInfo.last_name, empInfo.role])

    const query = await connection.promise().query(`SELECT * FROM employee`);
    return query;
}

async function updateRole() {
    const updateInfo = await inquirer.prompt ([
        {
        name: "first_name",
        message: "Whose role would you like to update? Please input first name with first letter capatalized.",
        type: "input",
        },
        {
        name: "last_name",
        message: "Last name?",
        type: "input",
        },
        {
        name: "update_role",
        message: "What would you like to update their role to? Please input their role id.",
        type: "number"
        }
    ]);
    await connection.promise().query(`UPDATE employee SET role_id=? WHERE first_name=? AND last_name=?`,
        [updateInfo.update_role, updateInfo.first_name, updateInfo.last_name]);

    const query = await connection.promise().query(`SELECT employee.id,
    employee.first_name,
    employee.last_name,
    employee_role.id,
    employee_role.title
    FROM employee INNER JOIN employee_role ON employee_role.id = employee.role_id`);
    return query;
}

module.exports = { viewDept, viewRole, viewEmp, viewEmpByDep, addDept, addRole, addEmp, updateRole }