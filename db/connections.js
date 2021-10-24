const mysql = require('mysql2');

// Connect to database
const connection = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'password123',
    database: 'employees_db'
  },
  console.log(`Connected to the employees_db database.`)
);

module.exports = connection;