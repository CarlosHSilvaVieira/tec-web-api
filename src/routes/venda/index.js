const app = require('express').Router();

const vendasController = require('../../controllers/venda')

app.get('/', (req, res, next) => {
    res.status(200).send('Api de vendas funcionando')
})

app.get('/all', vendasController.getAll)

app.post('/', vendasController.create)

app.put('/', vendasController.update)

app.get('/:id', vendasController.get)

app.delete('/:id', vendasController.delete)

module.exports = app
