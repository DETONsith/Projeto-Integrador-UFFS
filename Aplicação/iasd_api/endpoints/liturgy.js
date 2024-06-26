import Event from '../model/event';
default_endpoint = '/liturgy'

const express = require('express');
const api = express.Router();
const liturgy = new Liturgy();

api.get(default_endpoint, async (req, res) => {
    if (req.params.id){
        res.status(200);
        res.send(await liturgy.getLiturgy(req.params.id));
    }
    else{
        res.status(200);
        res.send(await liturgy.getLiturgy());
    }
});

api.post(default_endpoint, async (req, res) => {
    if (!req.body.cd_liturgy || !req.body.cd_person || !req.body.ds_status || !req.body.ds_description || !req.body.dt_event){
        res.status(400);
        res.send('{ "error": "Campos faltando" }');
        return;
    }
    liturgy.addLiturgy(req.body);
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
    liturgy.deleteLiturgy(req.params.id);
    res.status(200);
    res.send();
});

api.put(default_endpoint, async (req, res) => {
    if (!req.body.cd_liturgy || !req.body.cd_person || !req.body.ds_status || !req.body.ds_description || !req.body.dt_event){
        res.status(400);
        res.send('{ "error": "Campos faltando" }');
        return;
    }
    liturgy.updateLiturgy(req.body);
    res.status(200);
    res.send();
});