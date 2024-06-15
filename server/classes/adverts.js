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

    getAdvertsByUserId(id) {
        return new Promise((resolve, reject) => {
            this.db.connection.query('SELECT * FROM adverts WHERE verkoper_id = ?', [id], (err, result) => {
                this.db.connection.end();
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    createAdvertisement(advertisement, verkoper_id) {
        return new Promise((resolve, reject) => {
            this.db.connection.query(`
                        INSERT INTO adverts (verkoper_id, kenteken, merk, model, uitvoering, bouwjaar, brandstof,
                                             transmissie,
                                             kilometerstand, prijs, carosserie, vermogen_pk, vermogen_kw, koppel,
                                             cilinderinhoud,
                                             aantal_cilinders,
                                             aandrijving, versnellingen, massa_ledig_voertuig, massa_rijklaar, maximum_massa,
                                             trekmassa_ongeremd,
                                             trekmassa_geremd, max_massa_samenstelling, kleur, energieklasse, verbruik_stad,
                                             verbruik_snelweg, verbruik_gecombineerd, uitstoot_gecombineerd, stoelen, deuren)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
                                ?, ?)`,
                [
                    verkoper_id, advertisement.kenteken, advertisement.merk, advertisement.model,
                    advertisement.uitvoering, advertisement.bouwjaar, advertisement.brandstof, advertisement.transmissie,
                    advertisement.kilometerstand, advertisement.prijs, advertisement.carosserie, advertisement.vermogen_pk, advertisement.vermogen_kw,
                    advertisement.koppel, advertisement.cilinderinhoud, advertisement.aantal_cilinders, advertisement.aandrijving, advertisement.versnellingen,
                    advertisement.massa_ledig_voertuig, advertisement.massa_rijklaar, advertisement.maximum_massa, advertisement.trekmassa_ongeremd,
                    advertisement.trekmassa_geremd, advertisement.max_massa_samenstelling, advertisement.kleur, advertisement.energieklasse,
                    advertisement.verbruik_stad, advertisement.verbruik_snelweg, advertisement.verbruik_gecombineerd, advertisement.uitstoot_gecombineerd,
                    advertisement.stoelen, advertisement.deuren
                ],
                (err, result) => {
                    this.db.connection.end();
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    }

    editAdvert(advert) {
        return new Promise((resolve, reject) => {
            this.db.connection.query(`
                        UPDATE adverts
                        SET kenteken                = ?,
                            merk                    = ?,
                            model                   = ?,
                            uitvoering              = ?,
                            bouwjaar                = ?,
                            brandstof               = ?,
                            transmissie             = ?,
                            kilometerstand          = ?,
                            prijs                   = ?,
                            carosserie              = ?,
                            vermogen_pk             = ?,
                            vermogen_kw             = ?,
                            koppel                  = ?,
                            cilinderinhoud          = ?,
                            aantal_cilinders        = ?,
                            aandrijving             = ?,
                            versnellingen           = ?,
                            massa_ledig_voertuig    = ?,
                            massa_rijklaar          = ?,
                            maximum_massa           = ?,
                            trekmassa_ongeremd      = ?,
                            trekmassa_geremd        = ?,
                            max_massa_samenstelling = ?,
                            kleur                   = ?,
                            energieklasse           = ?,
                            verbruik_stad           = ?,
                            verbruik_snelweg        = ?,
                            verbruik_gecombineerd   = ?,
                            uitstoot_gecombineerd   = ?,
                            stoelen                 = ?,
                            deuren                  = ?
                        WHERE id = ?`,
                [
                    advert.kenteken, advert.merk, advert.model, advert.uitvoering, advert.bouwjaar, advert.brandstof, advert.transmissie,
                    advert.kilometerstand, advert.prijs, advert.carosserie, advert.vermogen_pk, advert.vermogen_kw, advert.koppel,
                    advert.cilinderinhoud, advert.aantal_cilinders, advert.aandrijving, advert.versnellingen, advert.massa_ledig_voertuig,
                    advert.massa_rijklaar, advert.maximum_massa, advert.trekmassa_ongeremd, advert.trekmassa_geremd, advert.max_massa_samenstelling,
                    advert.kleur, advert.energieklasse, advert.verbruik_stad, advert.verbruik_snelweg, advert.verbruik_gecombineerd, advert.uitstoot_gecombineerd,
                    advert.stoelen, advert.deuren, advert.id
                ],
                (err, result) => {
                    this.db.connection.end();
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    }

    deleteAdvert(id) {
        return new Promise((resolve, reject) => {
            this.db.connection.query('DELETE FROM adverts WHERE id = ?', [id], (err, result) => {
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