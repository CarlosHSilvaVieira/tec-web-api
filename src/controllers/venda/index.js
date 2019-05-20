var connection = require('../../models')

class VendaController {

    constructor() {
        this.mysql = connection
        this.tabela = 'venda'
        this.tabela_plural = 'vendas'

        this.create = this.create.bind(this)
        this.update = this.update.bind(this)
        this.get = this.get.bind(this)
        this.getAll = this.getAll.bind(this)
        this.delete = this.delete.bind(this)
    }

    create(req, res, next) {

        var venda = req.body.venda
    
        if (!venda) {
            return res.status(500).json({ code: 500, id: null, error: `${this.tabela} não fornecido` })
        }

        var query = `insert into ${this.tabela} set ?`
        this.mysql.query(query, { ...venda }, function (error, results, fields) {
            
            if (error) {
                return res.status(200).json({ code: 500, id: null, error: error })
            }
    
            return res.status(200).json({ code: 200, id: results.insertId, error: null })
        })
    }
    
    get(req, res, next) {

        var id = req.params.id
        if (!id) {
            return res.status(500).json({ code: 500, venda: null, error: `id da ${this.tabela} não fornecido` })
        }
    
        this.mysql.query(`Select * from ${this.tabela} where id = ?`, id, function (error, results, fields) {
    
            if (error || !results.length) {
                return res.status(200).json({ code: 500, venda: null, error: `${this.tabela} não encontrada` })
            }
    
            return res.status(200).json({ code: 200, venda: results[0], error: null })
        })
    }

    update(req, res, next) {

        var venda = req.body.venda
        if (!venda) {
            return res.status(500).json({ code: 500, resultado: null, error: `${this.tabela} não fornecida` })
        }
    
        var query = `update ${this.tabela} set nome = ? where id = ?`
        this.mysql.query(query, [venda.nome, venda.id ],  function (error, results, fields) {
    
            if (error) {
                return res.status(200).json({ code: 500, resultado: null, error: `${this.tabela} não pode ser atualizado` })
            }
    
            return res.status(200).json({ code: 200, resultado: results.affectedRows, error: null })
        })
    }

    getAll(req, res, next) {

        this.mysql.query(`Select * from ${this.tabela}`, function (error, results, fields) {
    
            if (error) {
                return res.status(200).json({ code: 500, vendas: null, error: `${this.tabela_plural} não encontradas` })
            }
    
            return res.status(200).json({ code: 200, vendas: results, error: null })
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

module.exports = new VendaController()
