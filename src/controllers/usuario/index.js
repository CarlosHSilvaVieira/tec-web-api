var connection = require('../../models')

class UsuarioController {

    constructor() {
        this.mysql = connection
        this.tabela = 'usuario'
        this.tabela_plural = 'usuarios'

        this.create = this.create.bind(this)
        this.update = this.update.bind(this)
        this.get = this.get.bind(this)
        this.getAll = this.getAll.bind(this)
        this.delete = this.delete.bind(this)

        this.login = this.login.bind(this)
        this.loginEmployeer = this.loginEmployeer.bind(this)
        this.alterPassword = this.alterPassword.bind(this)
    }

    async create(req, res, next) {

        var usuario = req.body.usuario

        if (!usuario) {
            return res.status(500).json({ code: 500, id: null, error: `${this.tabela} não fornecido` })
        }

        var query = `insert into ${this.tabela} set ?`
        const promise_id = new Promise((resolve, reject) => {

            this.mysql.query(query, { ...usuario }, function (error, results, fields) {

                if (error) {
                    return reject(error)
                }
    
                return resolve(results.insertId)
            })
        })

        promise_id.then((id) => {

            new Promise((resolve, reject) => {

                this.mysql.query(`Select * from usuario where id = ?`, id, function (error, results, fields) {

                    if (error || !results.length) {
                        return reject(error)
                    }
        
                    const user = { ...results[0], senha: null, isEmployeer: false }
                    return resolve(user)
                })
            })
            .then((user) => {
                return res.status(200).json({ code: 200, resultado: user, error: null })
            })
            .catch((error) => {
                return res.status(200).json({ code: 200, resultado: null, error: error })
            })
        })
        .catch((error) => {
            return res.status(200).json({ code: 200, resultado: null, error: error })
        })
    }

    get(req, res, next) {

        var id = req.params.id
        if (!id) {
            return res.status(500).json({ code: 500, usuario: null, error: `id da ${this.tabela} não fornecido` })
        }

        this.mysql.query(`Select * from ${this.tabela} where id = ?`, id, function (error, results, fields) {

            if (error || !results.length) {
                return res.status(200).json({ code: 500, usuario: null, error: `${this.tabela} não encontrada` })
            }

            return res.status(200).json({ code: 200, usuario: results[0], error: null })
        })
    }

    update(req, res, next) {

        var usuario = req.body.usuario
        if (!usuario) {
            return res.status(500).json({ code: 500, resultado: null, error: `${this.tabela} não fornecido` })
        }

        var query = `update ${this.tabela} set nome = ?, cep = ?, cpf = ?, email = ? where id = ?`
        this.mysql.query(query, [usuario.nome, usuario.id], function (error, results, fields) {

            if (error) {
                return res.status(200).json({ code: 500, resultado: null, error: `${this.tabela} não pode ser atualizado` })
            }

            return res.status(200).json({ code: 200, resultado: results.affectedRows, error: null })
        })
    }

    getAll(req, res, next) {

        this.mysql.query(`Select * from ${this.tabela}`, function (error, results, fields) {

            if (error) {
                return res.status(200).json({ code: 500, usuarios: null, error: `${this.tabela_plural} não encontrados` })
            }

            return res.status(200).json({ code: 200, usuarios: results, error: null })
        })
    }

    delete(req, res, next) {

        var id = req.params.id
        if (!id) {
            return res.status(500).json({ code: 500, resultado: null, error: `id da ${this.tabela} não fornecido` })
        }

        this.mysql.query(`Delete from ${this.tabela} where id = ${id}`, function (error, results, fields) {

            if (error) {
                return res.status(200).json({ code: 500, resultado: null, error: `${this.tabela} não encontrada` })
            }

            return res.status(200).json({ code: 200, resultado: results.affectedRows, error: null })
        })
    }

    login(req, res, next) {

        var login = req.body.login
        if (!login) {
            return res.status(500).json({ code: 500, resultado: null, error: `${this.tabela} não fornecido` })
        }

        if (login.isEmployee) {
            return this.loginEmployeer(res, login)
        }

        var query = `Select * from ${this.tabela} where email = ? and senha = ?`
        this.mysql.query(query, [login.email, login.senha], function (error, results, fields) {

            if (error || !results[0]) {
                return res.status(200).json({ code: 500, resultado: null, error: `${this.tabela} não pode ser encontrado` })
            }

            const user = { ...results[0], senha: null, isEmployeer: false }

            return res.status(200).json({ code: 200, resultado: user, error: null })
        })
    }

    loginEmployeer(res, login) {

        var query = `Select * from funcionario where email = ? and senha = ?`
        this.mysql.query(query, [login.email, login.senha], function (error, results, fields) {

            if (error || !results[0]) {
                return res.status(200).json({ code: 500, resultado: null, error: `Funcionário não encontrado` })
            }

            const user = { ...results[0], senha: null, isEmployeer: true }

            return res.status(200).json({ code: 200, resultado: user, error: null })
        })
    }

    alterPassword(req, res, next) {

        var login = req.body.login
        if (!login) {
            return res.status(500).json({ code: 500, resultado: null, error: `${this.tabela} não fornecido` })
        }

        var query = `Select * from ${this.tabela} where email = ? and senha = ?`

        this.mysql.query(query, [login.email, login.senha], function (error, results, fields) {

            if (error || login.senha === login.nova_senha) {
                return res.status(200).json({ code: 500, resultado: null, error: `${this.tabela} não pode ser atualizado` })
            }

            var second_query = `update ${this.tabela} set senha = ? where id = ?`
            this.mysql.query(second_query, [login.nova_senha, login.id], function (error, response, fields) {

                if (error) {
                    return res.status(200).json({ code: 500, resultado: null, error: `${this.tabela} não pode ser atualizado` })
                }

                return res.status(200).json({ code: 200, resultado: response, error: null })
            })
        })
    }
}

module.exports = new UsuarioController()
