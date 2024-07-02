const Person = require('../model/person');
const crypto = require('crypto'); // Import the crypto module
default_endpoint = '/person';

const express = require('express');
const api = express.Router();
const person = new Person();

api.get(default_endpoint, async (req, res) => {
    if(!req.user){
        res.status(401).send('{ "error": "Token inválido" }');
        return;
    }
    if(req.user.ds_usertype !== 'admin' && req.user.ds_usertype !== 'ancião'){
        res.status(403).send('{ "error": "Usuário não tem permissão" }');
        return;
    }
    if (req.query.id){
        res.status(200);
        res.send(await person.getPerson(req.query.id));
    }
    else{
        res.status(200);
        res.send(await person.getPerson());
    }
});

api.post(default_endpoint, async (req, res) => {
    if (!req.body.ds_username || !req.body.ds_name || !req.body.ds_password || !req.body.ds_usertype || !req.body.ds_phone || !req.body.ds_email){
        res.status(400);
        res.send('{ "error": "Campos faltando" }');
        return;
    }
    var body = req.body;
    
    // Generate a salt
    const salt = crypto.randomBytes(16).toString('hex');
    // Hash the password with the salt
    const hashedPassword = crypto.pbkdf2Sync(body.ds_password, salt, 310000, 32, 'sha256').toString('hex');
    body.ds_password = hashedPassword;
    body.ds_salt = salt; // Add the salt to the body

    try {
        await person.addPerson(body);
        res.status(201).send();
    } catch (e) {
        res.status(500).send('Ocorreu um erro interno: ' + e);
    }
});

api.delete(default_endpoint, async (req, res) => {
    if (!req.query.id){
        res.status(400).send('{ "error": "id não informado" }');
        return;
    }
    await person.deletePerson(req.query.id);
    res.status(200).send();
});

api.put(default_endpoint, async (req, res) => {
    if (!req.body.cd_liturgy || !req.body.cd_person || !req.body.ds_status || !req.body.ds_description || !req.body.dt_event){
        res.status(400).send('{ "error": "Campos faltando" }');
        return;
    }
    await person.updatePerson(req.body);
    res.status(200).send();
});

module.exports = api;
