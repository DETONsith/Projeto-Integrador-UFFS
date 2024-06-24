import Theme from '../model/theme';
const express = require('express');

const default_endpoint = '/theme';

const api = express.Router();
const theme = new Theme();

api.get(default_endpoint, async (req, res) => {
    if (req.params.id) {
        res.status(200);
        res.send(await theme.getTheme(req.params.id));
    } else {
        res.status(200);
        res.send(await theme.getTheme());
    }
});

api.post(default_endpoint, async (req, res) => {
    if (!req.body.name || !req.body.description) {
        res.status(400);
        res.send('{ "error": "Missing fields" }');
        return;
    }
    theme.addTheme(req.body);
    res.status(201);
    res.send();
});

api.delete(default_endpoint, async (req, res) => {
    if (!req.params.id) {
        res.status(400);
        res.send('{ "error": "Missing id" }');
        return;
    }
    theme.deleteTheme(req.params.id);
    res.status(200);
    res.send();
});

api.put(default_endpoint, async (req, res) => {
    if (!req.body.name || !req.body.description) {
        res.status(400);
        res.send('{ "error": "Missing fields" }');
        return;
    }
    theme.updateTheme(req.body);
    res.status(200);
    res.send();
});
