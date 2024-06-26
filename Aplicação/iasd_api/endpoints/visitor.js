import Event from '../model/event';
default_endpoint = '/visitor'

const express = require('express');
const api = express.Router();
const visitor = new Visitor();

api.get(default_endpoint, async (req, res) => {
    if (req.params.id){
        res.status(200);
        res.send(await visitor.getVisitor(req.params.id));
    }
    else{
        res.status(200);
        res.send(await visitor.getVisitor());
    }
});

api.post(default_endpoint, async (req, res) => {
    if (!req.body.cd_liturgy || !req.body.cd_person || !req.body.ds_status || !req.body.ds_description || !req.body.dt_event){
        res.status(400);
        res.send('{ "error": "Campos faltando" }');
        return;
    }
    visitor.addVisitor(req.body);
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
    visitor.deleteVisitor(req.params.id);
    res.status(200);
    res.send();
});

api.put(default_endpoint, async (req, res) => {
    if (!req.body.cd_liturgy || !req.body.cd_person || !req.body.ds_status || !req.body.ds_description || !req.body.dt_event){
        res.status(400);
        res.send('{ "error": "Campos faltando" }');
        return;
    }
    visitor.updateVisitor(req.body);
    res.status(200);
    res.send();
});