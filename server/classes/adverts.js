// Filename: adverts.js
// Author: Jesper Knez
const mysql = require('mysql');
require('dotenv').config({ path: __dirname + '/../../.env' });

class AdvertsModel{
    constructor(db) {
        this.db = new db(mysql, process.env.DB_HOST, process.env.DB_USER, process.env.DB_PASS, process.env.DB_NAME);
    }

    getAllAdverts(){
        return new Promise((resolve, reject) => {
            this.db.connection.query('SELECT * FROM adverts', (err, result) => {
                this.db.connection.end();
                if (err) {
                    reject(err);
                }else{
                    resolve(result);
                }
            });
        });
    }

    getAdvertById(id){
        return new Promise((resolve, reject) => {
            this.db.connection.query('SELECT * FROM adverts WHERE id = ?', [id], (err, result) => {
                this.db.connection.end();
                if (err) {
                    reject(err);
                }else{
                    resolve(result);
                }
            });
        });
    }
}

module.exports = AdvertsModel;