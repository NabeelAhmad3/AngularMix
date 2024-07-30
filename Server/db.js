const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.db_host,
    user: process.env.db_user,
    password: process.env.db_pass,
    database: process.env.db_database,
});



module.exports = connection;