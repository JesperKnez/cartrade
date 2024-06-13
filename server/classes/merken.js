// Filename: adverts.js
// Author: Jesper Knez
const mysql = require('mysql');
require('dotenv').config({path: __dirname + '/../../.env'});

class MerkenModel {
    constructor(db) {
        this.db = new db(mysql, process.env.DB_HOST, process.env.DB_USER, process.env.DB_PASS, process.env.DB_NAME);
    }

    getAllMerken() {
        return new Promise((resolve, reject) => {
            this.db.connection.query('SELECT * FROM Merken ORDER BY label ASC', (err, result) => {
                this.db.connection.end();
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    getMerkById(id) {
        return new Promise((resolve, reject) => {
            this.db.connection.query('SELECT * FROM Merken WHERE id = ?', [id], (err, result) => {
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

module.exports = MerkenModel;