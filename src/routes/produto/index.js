const app = require('express').Router();

const produtoController = require('../../controllers/produto')

app.get('/', (req, res, next) => {
    res.status(200).send('Api de produtos funcionando')
})

app.get('/all', produtoController.getAll)

app.get('/limit/:limit', produtoController.getByLimit)

app.post('/', produtoController.create)

app.put('/', produtoController.update)

app.get('/:id', produtoController.get)

app.delete('/:id', produtoController.delete)

module.exports = app
