const express = require('express');
const cors = require('cors');
const api = express();

api.use(express.json());
api.use(cors());


api.listen(3001,()=>{console.log('API está funcionando')})

module.exports = (api);
