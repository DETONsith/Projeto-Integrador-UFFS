const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');
const db = require('./helper/dbhelper');
const session = require('express-session');

const api = express();

api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: true }));

api.use(session({
    secret: 'miotech miau',
    resave: false,
    saveUninitialized: false
}));

api.use(cors());
api.use(passport.initialize());
api.use(passport.session());



var authRouter = require('./endpoints/auth');
var liturgy = require('./endpoints/liturgy');
const person = require('./endpoints/person');

const router = express.Router();


function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: 'Token required' });

    db.any('SELECT * FROM token_handler WHERE ds_token = $1', [token])
        .then(function (row) {
            if (row.length !== 1) {
                return res.status(401).json({ message: 'Invalid token' });
            }
            const userId = row[0].cd_person;
            db.any('SELECT * FROM person WHERE cd_person = $1', [userId])
                .then(function (userRow) {
                    if (userRow.length !== 1) {
                        return res.status(401).json({ message: 'User not found' });
                    }
                    req.user = userRow[0];
                    next();
                })
                .catch(function (err) {
                    return res.status(500).json({ message: 'Internal server error' });
                });
        })
        .catch(function (err) {
            return res.status(500).json({ message: 'Internal server error' });
        });
}

// Apply the authenticateToken middleware to protected routes
api.use('/' , authRouter);
api.use('/', authenticateToken, liturgy);
api.use('/', authenticateToken, person);


api.listen(3001,()=>{console.log('API está funcionando na porta 3001')})


module.exports = api;
