const app = require('express').Router();

const usuarioController = require('../../controllers/usuario')

app.get('/', (req, res, next) => {
    res.status(200).send('Api de usuarios funcionando')
})

app.get('/all', usuarioController.getAll)

app.post('/', usuarioController.create)

app.put('/', usuarioController.update)

app.post('/login', usuarioController.login)

app.post('/update-password', usuarioController.alterPassword)

app.get('/:id', usuarioController.get)

app.delete('/:id', usuarioController.delete)

module.exports = app
