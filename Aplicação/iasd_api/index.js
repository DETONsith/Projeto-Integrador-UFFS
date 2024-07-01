const express = require('express');
const cors = require('cors');
const api = express();


var authRouter = require('./endpoints/auth');
var liturgy = require('./endpoints/liturgy');
const person = require('./endpoints/person');
api.set('view engine', 'html');
api.use(express.json());
api.use(cors());
const router = express.Router();

api.use('/', liturgy);
api.use('/' , authRouter);
api.use('/' , person);

api.listen(3001,()=>{console.log('API está funcionando na porta 3001')})

api.get('/login', (req, res) => {
    res.render('login');
    }
);

module.exports = (api);
