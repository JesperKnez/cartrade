// Filename: accountsModel.js
// Author: Jesper Knez
const mysql = require('mysql');
require('dotenv').config({path: __dirname + '/../../.env'});


class AccountsModel {
    constructor(db) {
        this.db = new db(mysql, process.env.DB_HOST, process.env.DB_USER, process.env.DB_PASS, process.env.DB_NAME);
    }

    getAllAccounts() {
        return new Promise((resolve, reject) => {
            this.db.connection.query('SELECT * FROM users', (err, result) => {
                this.db.connection.end();
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    getAccountById(id) {
        return new Promise((resolve, reject) => {
            this.db.connection.query('SELECT * FROM users WHERE id = ?', [id], (err, result) => {
                this.db.connection.end();
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    getAccountByUsername(username) {
        return new Promise((resolve, reject) => {
            this.db.connection.query('SELECT * FROM users WHERE username = ?', [username], (err, result) => {
                this.db.connection.end();
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    createAccount(username, email, password) {
        return new Promise((resolve, reject) => {
            this.db.connection.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password], (err, result) => {
                this.db.connection.end();
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

module.exports = AccountsModel;



