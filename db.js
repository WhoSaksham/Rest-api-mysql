const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "saksham123",
    database: "saksham"
});

connection.connect((err) => {
    if (!err) {
        console.log('Connection successful to DB!')
    }
    else {
        console.error(err.message)
    }
});

module.exports = connection;