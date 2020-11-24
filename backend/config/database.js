require('dotenv').config('../../.env');
const mysql = require('mysql');

const conn = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DATABASE
});

conn.connect((err) => {
    if (err) throw err;
    console.log({ success: "MySQL Connected", chat_fullcam: 'Status - OK' });
});

module.exports = conn;