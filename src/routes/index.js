var api = require('express').Router()

var produto = require('../routes/produto')
var autor = require('../routes/autor')
var editora = require('../routes/editora')
var usuario = require('../routes/usuario')
var venda = require('../routes/venda')

api.get('/', (req, res, next) => {
    res.status(200).send('API Tec Web')
})

api.use('/produto', produto);
api.use('/autor', autor);
api.use('/editora', editora);
api.use('/usuario', usuario);
api.use('/venda', venda);


module.exports = api
