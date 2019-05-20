var connection = require('../../models')

class EditoraController {

    constructor() {
        this.mysql = connection
        this.tabela = 'editora'
        this.tabela_plural = 'editoras'

        this.create = this.create.bind(this)
        this.update = this.update.bind(this)
        this.get = this.get.bind(this)
        this.getAll = this.getAll.bind(this)
        this.delete = this.delete.bind(this)
    }

    create(req, res, next) {

        var editora = req.body.editora
    
        if (!editora) {
            return res.status(500).json({ code: 500, id: null, error: `${this.tabela} não fornecido` })
        }

        var query = `insert into ${this.tabela} set ?`
        this.mysql.query(query, { ...editora }, function (error, results, fields) {
            
            if (error) {
                return res.status(200).json({ code: 500, id: null, error: error })
            }
    
            return res.status(200).json({ code: 200, id: results.insertId, error: null })
        })
    }
    
    get(req, res, next) {

        var id = req.params.id
        if (!id) {
            return res.status(500).json({ code: 500, editora: null, error: `id da ${this.tabela} não fornecido` })
        }
    
        this.mysql.query(`Select * from ${this.tabela} where id = ?`, id, function (error, results, fields) {
    
            if (error || !results.length) {
                return res.status(200).json({ code: 500, editora: null, error: `${this.tabela} não encontrado` })
            }
    
            return res.status(200).json({ code: 200, editora: results[0], error: null })
        })
    }

    update(req, res, next) {

        var editora = req.body.editora
        if (!editora) {
            return res.status(500).json({ code: 500, resultado: null, error: `${this.tabela} não fornecida` })
        }
    
        var query = `update ${this.tabela} set nome = ? where id = ?`
        this.mysql.query(query, [editora.nome, editora.id ],  function (error, results, fields) {
    
            if (error) {
                return res.status(200).json({ code: 500, resultado: null, error: `${this.tabela} não pode ser atualizado` })
            }
    
            return res.status(200).json({ code: 200, resultado: results.affectedRows, error: null })
        })
    }

    getAll(req, res, next) {

        this.mysql.query(`Select * from ${this.tabela}`, function (error, results, fields) {
    
            if (error) {
                return res.status(200).json({ code: 500, editoras: null, error: `${this.tabela_plural} não encontradas` })
            }
    
            return res.status(200).json({ code: 200, editoras: results, error: null })
        })
    }

    delete (req, res, next) {

        var id = req.params.id
        if (!id) {
            return res.status(500).json({ code: 500, resultado: null, error: `id da ${this.tabela} não fornecido` })
        }

        this.mysql.query(`Delete * from ${this.tabela} where id = ${id}`, function (error, results, fields) {
    
            if (error) {
                return res.status(200).json({ code: 500, resultado: null, error: `${this.tabela} não encontrada` })
            }
    
            return res.status(200).json({ code: 200, resultado: results.affectedRows, error: null })
        })
    }
}

module.exports = new EditoraController()
