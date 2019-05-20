const app = require('express').Router();

const editoraController = require('../../controllers/editora')

app.get('/', (req, res, next) => {
    res.status(200).send('Api de editoras funcionando')
})

app.get('/all', editoraController.getAll)

app.post('/', editoraController.create)

app.put('/', editoraController.update)

app.get('/:id', editoraController.get)

app.delete('/:id', editoraController.delete)

module.exports = app
