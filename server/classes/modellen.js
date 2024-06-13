// Filename: adverts.js
// Author: Jesper Knez
const mysql = require('mysql');
require('dotenv').config({path: __dirname + '/../../.env'});

class ModellenModel {
    constructor(db) {
        this.db = new db(mysql, process.env.DB_HOST, process.env.DB_USER, process.env.DB_PASS, process.env.DB_NAME);
    }

    getAllModellen() {
        return new Promise((resolve, reject) => {
            this.db.connection.query('SELECT * FROM Modellen ORDER BY label ASC', (err, result) => {
                this.db.connection.end();
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    getModelById(id) {
        return new Promise((resolve, reject) => {
            this.db.connection.query('SELECT * FROM Modellen WHERE id = ?', [id], (err, result) => {
                this.db.connection.end();
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    getModelByMerkId(merkId) {
        return new Promise((resolve, reject) => {
            if (merkId === '*') {
                this.db.connection.query('SELECT * FROM Modellen ORDER BY label ASC', (err, result) => {
                    this.db.connection.end();
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            } else {
                this.db.connection.query('SELECT * FROM Modellen WHERE merk_id = ?', [merkId], (err, result) => {
                    this.db.connection.end();
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            }
        });
    }
}

module.exports = ModellenModel;