const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'missing3013',
    database: 'employees'
});


module.exports = db;