const Person = require('../model/person');
const crypto = require('crypto'); // Import the crypto module
default_endpoint = '/person'

const express = require('express');
const api = express.Router();
const person = new Person();

api.get(default_endpoint, async (req, res) => {
    if (req.query.id){
        res.status(200);
        res.send(await person.getPerson(req.query.id));
    }
    else{
        res.status(200);
        res.send(await person.getPerson());
    }
});

// cryptography of login password
// crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
//     if (err) { return cb(err); }
//     if (!crypto.timingSafeEqual(row.password, hashedPassword)) {
//       return cb(null, false, { message: 'Incorrect username or password.' });
//     }
//     return cb(null, row);
//   });


api.post(default_endpoint, async (req, res) => {
    if (!req.body.ds_username || !req.body.ds_name || !req.body.ds_password || !req.body.ds_usertype || !req.body.ds_phone || !req.body.ds_email){
        res.status(400);
        res.send('{ "error": "Campos faltando" }');
        return;
    }
    var body = req.body;
    body.ds_password = crypto.pbkdf2Sync(body.ds_password, 'salt', 310000, 32, 'sha256').toString();
    try{
    person.addPerson(body);
    res.status(201);
    res.send();
    }
    catch (e){
        res.status(500);
        res.send('Ocorreu um erro interno: ' + e);
    }
}
);

api.delete(default_endpoint, async (req, res) => {
    if (!req.query.id){
        res.status(400);
        res.send('{ "error": "id não informado" }');
        return;
    }
    person.deletePerson(req.query.id);
    res.status(200);
    res.send();
});

api.put(default_endpoint, async (req, res) => {
    if (!req.body.cd_liturgy || !req.body.cd_person || !req.body.ds_status || !req.body.ds_description || !req.body.dt_event){
        res.status(400);
        res.send('{ "error": "Campos faltando" }');
        return;
    }
    person.updatePerson(req.body);
    res.status(200);
    res.send();
});

module.exports = api;