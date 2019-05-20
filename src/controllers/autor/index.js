var connection = require('../../models')

class AutorController {

    constructor() {
        this.mysql = connection
        this.tabela = 'autor'
        this.tabela_plural = 'autores'

        this.create = this.create.bind(this)
        this.update = this.update.bind(this)
        this.get = this.get.bind(this)
        this.getAll = this.getAll.bind(this)
        this.delete = this.delete.bind(this)
    }

    create(req, res, next) {

        var autor = req.body.autor
    
        if (!autor) {
            return res.status(500).json({ code: 500, id: null, error: `${this.tabela} não fornecido` })
        }

        var query = `insert into ${this.tabela} set ?`
        this.mysql.query(query, { ...autor }, function (error, results, fields) {
            
            if (error) {
                return res.status(200).json({ code: 500, id: null, error: error })
            }
    
            return res.status(200).json({ code: 200, id: results.insertId, error: null })
        })
    }
    
    get(req, res, next) {

        var autor_id = req.params.id
        if (!autor_id) {
            return res.status(500).json({ code: 500, autor: null, error: `id do ${this.tabela} não fornecido` })
        }
    
        this.mysql.query(`Select * from ${this.tabela} where id = ?`, autor_id, function (error, results, fields) {
    
            if (error || !results.length) {
                return res.status(200).json({ code: 500, autor: null, error: `${this.tabela} não encontrado` })
            }

            return res.status(200).json({ code: 200, autor: results[0], error: null })
        })
    }

    update(req, res, next) {

        var autor = req.body.autor
        if (!autor) {
            return res.status(500).json({ code: 500, resultado: null, error: `${this.tabela} não fornecido` })
        }
    
        var query = `update ${this.tabela} set nome = ? where id = ?`
        this.mysql.query(query, [autor.nome, autor.id ],  function (error, results, fields) {
    
            if (error) {
                return res.status(200).json({ code: 500, resultado: null, error: `${this.tabela} não pode ser atualizado` })
            }
    
            return res.status(200).json({ code: 200, resultado: results.affectedRows, error: null })
        })
    }

    getAll(req, res, next) {

        this.mysql.query(`Select * from ${this.tabela}`, function (error, results, fields) {
    
            if (error) {
                return res.status(200).json({ code: 500, autores: null, error: `${this.tabela_plural} não encontrados` })
            }
    
            return res.status(200).json({ code: 200, autores: results, error: null })
        })
    }

    delete (req, res, next) {

        var produto_id = req.params.id
        if (!produto_id) {
            return res.status(500).json({ code: 500, resultado: null, error: `id do ${this.tabela} não fornecido` })
        }

        this.mysql.query(`Delete * from ${this.tabela} where id = ${produto_id}`, function (error, results, fields) {
    
            if (error) {
                return res.status(200).json({ code: 500, resultado: null, error: `${this.tabela} não encontrado` })
            }
    
            return res.status(200).json({ code: 200, resultado: results.affectedRows, error: null })
        })
    }
}

module.exports = AutorController
