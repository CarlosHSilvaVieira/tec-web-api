const app = require('express').Router();

const autorController = require('../../controllers/autor')

const autor = new autorController()

app.get('/', (req, res, next) => {
    res.status(200).send('Api de autores funcionando')
})

app.get('/all', autor.getAll)

app.post('/', autor.create)

app.put('/', autor.update)

app.get('/:id', autor.get)

app.delete('/:id', autor.delete)

module.exports = app
