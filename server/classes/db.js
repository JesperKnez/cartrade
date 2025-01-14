// File: dbConnect.js
//Author: Jesper Knez

//database connection in constructor
const mysql = require('mysql2');

class DbConnect {
    constructor(mysql, host, user, password, database) {
        this.connection = mysql.createConnection({
            host: host,
            user: user,
            'password': password,
            database: database,
            dateStrings: true
        });
        this.connection.connect((err) => {
            if (err) {
                console.error('Error connecting to the database:', err);
            } else {
                // console.log('Connected to the database');
            }
        });
    }
}

module.exports = DbConnect;