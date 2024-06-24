const express = require('express');
import VisitorTheme from '../model/visitor_theme';

const default_endpoint = '/visitor_theme';

const api = express.Router();
const visitor_interest_theme = new VisitorTheme();

api.get(default_endpoint, async (req, res) => {
    if (req.params.id) {
        res.status(200);
        res.send(await visitor_interest_theme.getVisitorInterestTheme(req.params.id));
    } else {
        res.status(200);
        res.send(await visitor_interest_theme.getVisitorInterestTheme());
    }
});

api.post(default_endpoint, async (req, res) => {
    if (!req.body.name || !req.body.description) {
        res.status(400);
        res.send('{ "error": "Missing fields" }');
        return;
    }
    visitor_interest_theme.addVisitorInterestTheme(req.body);
    res.status(201);
    res.send();
});

api.delete(default_endpoint, async (req, res) => {
    if (!req.params.id) {
        res.status(400);
        res.send('{ "error": "Missing id" }');
        return;
    }
    visitor_interest_theme.deleteVisitorInterestTheme(req.params.id);
    res.status(200);
    res.send();
});

api.put(default_endpoint, async (req, res) => {
    if (!req.body.name || !req.body.description) {
        res.status(400);
        res.send('{ "error": "Missing fields" }');
        return;
    }
    visitor_interest_theme.updateVisitorInterestTheme(req.body);
    res.status(200);
    res.send();
});
