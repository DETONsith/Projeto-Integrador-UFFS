const pgp = require('pg-promise')({});
require('dotenv').config();

const user = process.env.db_user;
const password = process.env.db_password;
const host = process.env.db_host;
const port = process.env.db_port;
const database = process.env.db_database;


const db = pgp(
    'postgres://' + user + ':' + password + '@' + host + ':' + port + '/' + database
)

module.exports = db;