const express = require('express');
const cors = require('cors');
// Database
const AccountsModel = require('./classes/accounts.js');
const AdvertsModel = require('./classes/adverts.js');
const Db = require('./classes/db.js');


// Setup the app
const api = express();

api.use(cors());
api.use(express.json());

// Accounts
api.get('/api/accounts/all', (req, res) => {
    let accounts = new AccountsModel(Db);
    const result = accounts.getAllAccounts().then((result) => {
        res.send(result);
    })
    .catch((error) => {
        res.send(error);
    });
});

api.post('/api/accounts/add', (req, res) => {
    let accounts = new AccountsModel(Db);
    const result = accounts.createAccount(req.body.username, req.body.email, req.body.password).then((result) => {
        res.send(result);
    })
    .catch((error) => {
        res.send(error);
    });
});

// Advert routes
// Get all adverts
api.get('/api/adverts/all', (req, res) => {
    let adverts = new AdvertsModel(Db);
    const result = adverts.getAllAdverts().then((result) => {
        res.send(result);
    })
    .catch((error) => {
        res.send(error);
    });
});

// Get advert by id
api.post('/api/adverts/get', (req, res) => {
    let adverts = new AdvertsModel(Db);
    const result = adverts.getAdvertById(req.body.id).then((result) => {
        res.send(result[0]);
    })
    .catch((error) => {
        res.send(error);
    });
});

const port = 3001;
api.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
