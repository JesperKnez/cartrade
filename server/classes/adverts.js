// Filename: adverts.js
// Author: Jesper Knez
const mysql = require('mysql');
require('dotenv').config({path: __dirname + '/../../.env'});

class AdvertsModel {
    constructor(db) {
        this.db = new db(mysql, process.env.DB_HOST, process.env.DB_USER, process.env.DB_PASS, process.env.DB_NAME);
    }

    getAllAdverts() {
        return new Promise((resolve, reject) => {
            this.db.connection.query('SELECT * FROM adverts', (err, result) => {
                this.db.connection.end();
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    getFilteredAdverts(filter) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM adverts';
            const keys = Object.keys(filter);

            const hasFilters = keys.some((key) => filter[key] !== '');

            if (hasFilters) {
                let whereClause = ' WHERE ';
                keys.forEach((key, index) => {
                    if (filter[key]) {
                        whereClause += `LOWER(${key}) = LOWER(${mysql.escape(filter[key])})`;
                        if (index < keys.length - 1) {
                            whereClause += ' AND ';
                        }
                    }
                });
                sql += whereClause;
            }


            if (!sql) {
                reject('No filter provided');
            } else {
                this.db.connection.query(sql, (err, result) => {
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

    getAdvertById(id) {
        return new Promise((resolve, reject) => {
            this.db.connection.query('SELECT * FROM adverts WHERE id = ?', [id], (err, result) => {
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

module.exports = AdvertsModel;