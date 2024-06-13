const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
// Database
const AccountsModel = require('./classes/accounts.js');
const AdvertsModel = require('./classes/adverts.js');
const MerkenModel = require('./classes/merken.js');
const ModellenModel = require('./classes/modellen.js');
const Db = require('./classes/db.js');


// Setup the app
const api = express();

api.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
api.use(express.json());
api.use(cookieParser());

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

// Deze route is async zodat we kunnen wachten op de bcrypt hash zonder de main thread te blokkeren
api.post('/api/accounts/add', async (req, res) => {
    let accounts = new AccountsModel(Db);
    try {
        const hash = await bcrypt.hash(req.body.password, 10);
        const result = await accounts.createAccount(req.body.username, req.body.email, hash);
        res.send({message: 201})
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            res.send({message: 409});
        } else {
            res.send({message: 500});
        }
    }
});

api.post('/api/accounts/login', (req, res) => {
    let accounts = new AccountsModel(Db);

    accounts.getAccountByUsername(req.body.username).then((result) => {
        if (result.length === 0) {
            res.send({message: 404});
        } else {
            bcrypt.compare(req.body.password, result[0].password).then((match) => {
                if (match) {
                    const username = req.body.username;
                    const token = jwt.sign(username, process.env.API_SECRET);
                    res.cookie('token', token, {httpOnly: true, maxAge: 7200 * 1000, secure: false, sameSite: 'none'});
                    res.cookie('user', JSON.stringify({
                        username: username,
                        uid: result[0].id,
                        loggedIn: true,
                    }), {maxAge: 7200 * 1000, secure: false, sameSite: 'none'})
                    res.send({message: 200});

                } else {
                    res.send({message: 401});
                }
            });
        }
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

//Get filtered adverts
api.post('/api/adverts/filter', (req, res) => {
    let adverts = new AdvertsModel(Db);
    console.log(req.body.filters)
    const result = adverts.getFilteredAdverts(req.body.filters).then((result) => {
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

// Merken routes
// Get all merken
api.get('/api/merken/all', (req, res) => {
    let merken = new MerkenModel(Db);
    const result = merken.getAllMerken().then((result) => {
        res.send(result);
    })
        .catch((error) => {
            res.send(error);
        });
});

// Get merk by id
api.post('/api/merken/get', (req, res) => {
    let merken = new MerkenModel(Db);
    const result = merken.getMerkById(req.body.id).then((result) => {
        res.send(result[0]);
    })
        .catch((error) => {
            res.send(error);
        });
});

// Modellen routes
// Get all modellen
api.get('/api/modellen/all', (req, res) => {
    let modellen = new ModellenModel(Db);
    const result = modellen.getAllModellen().then((result) => {
        res.send(result);
    })
        .catch((error) => {
            res.send(error);
        });
});

// Get model by id
api.post('/api/modellen/get', (req, res) => {
    let modellen = new ModellenModel(Db);
    const result = modellen.getModelById(req.body.id).then((result) => {
        res.send(result[0]);
    })
        .catch((error) => {
            res.send(error);
        });
});

// Get model by merk id
api.post('/api/modellen/merk', (req, res) => {
    let modellen = new ModellenModel(Db);
    const result = modellen.getModelByMerkId(req.body.merk_id).then((result) => {
        res.send(result);
    })
        .catch((error) => {
            res.send(error);
        });
});


const port = 3001;
api.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
