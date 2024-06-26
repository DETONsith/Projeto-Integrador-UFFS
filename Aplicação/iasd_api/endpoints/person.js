import Event from '../model/event';
default_endpoint = '/person'

const express = require('express');
const api = express.Router();
const person = new Person();

api.get(default_endpoint, async (req, res) => {
    if (req.params.id){
        res.status(200);
        res.send(await person.getPerson(req.params.id));
    }
    else{
        res.status(200);
        res.send(await person.getPerson());
    }
});

api.post(default_endpoint, async (req, res) => {
    if (!req.body.cd_liturgy || !req.body.cd_person || !req.body.ds_status || !req.body.ds_description || !req.body.dt_event){
        res.status(400);
        res.send('{ "error": "Campos faltando" }');
        return;
    }
    person.addPerosn(req.body);
    res.status(201);
    res.send();
}
);

api.delete(default_endpoint, async (req, res) => {
    if (!req.params.id){
        res.status(400);
        res.send('{ "error": "id não informado" }');
        return;
    }
    person.deletePerson(req.params.id);
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