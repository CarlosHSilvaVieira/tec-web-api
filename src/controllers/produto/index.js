var connection = require('../../models')

class ProdutosController {

    constructor() {
        this.mysql = connection

        this.create = this.create.bind(this)
        this.update = this.update.bind(this)
        this.get = this.get.bind(this)
        this.getAll = this.getAll.bind(this)
        this.getByLimit = this.getByLimit.bind(this)
        this.delete = this.delete.bind(this)
    }

    create(req, res, next) {

        var produto = req.body.produto

        if (!produto) {
            return res.status(500).json({ code: 500, id: null, error: 'produto não fornecido' })
        }

        var query = 'insert into produto set ?'
        this.mysql.query(query, { ...produto }, function (error, results, fields) {

            if (error) {
                return res.status(200).json({ code: 500, id: null, error: error })
            }

            return res.status(200).json({ code: 200, id: results.insertId, error: null })
        })
    }

    get(req, res, next) {

        var produto_id = req.params.id
        if (!produto_id) {
            return res.status(500).json({ code: 500, produto: null, error: 'id do produto não fornecido' })
        }

        this.mysql.query('Select * from produto where id = ' + produto_id, function (error, results, fields) {

            if (error || !results.length) {
                return res.status(200).json({ code: 500, produto: null, error: 'produto não encontrado' })
            }

            return res.status(200).json({ code: 200, produto: results[0], error: null })
        })
    }

    update(req, res, next) {

        var produto = req.body.produto
        if (!produto) {
            return res.status(500).json({ code: 500, resultado: null, error: 'produto não fornecido' })
        }

        var query = 'update produto set nome = ?, estoque = ?, valor_unitario = ?, categoria = ?, ano = ?, idioma = ?, autor_id = ?, editora_id = ? where id = ?'
        this.mysql.query(query, [produto.nome, produto.estoque, produto.valor_unitario, produto.categoria, produto.ano, produto.idioma, produto.autor_id, produto.editora_id, produto.id], function (error, results, fields) {

            if (error) {
                return res.status(200).json({ code: 500, resultado: null, error: 'produto não pode ser atualizado' })
            }

            return res.status(200).json({ code: 200, resultado: results.affectedRows, error: null })
        })
    }

    getAll(req, res, next) {

        this.mysql.query('Select * from produto', function (error, results, fields) {

            if (error) {
                return res.status(200).json({ code: 500, produtos: null, error: 'produtos não encontrados' })
            }

            return res.status(200).json({ code: 200, produtos: results, error: null })
        })
    }

    getByLimit(req, res, next) {

        var limit = req.params.limit
        if (!limit) {
            limit = 10
        }

        this.mysql.query('Select * from produto order by RAND() limit ?', Number(limit), function (error, results, fields) {

            if (error) {
                return res.status(200).json({ code: 500, produtos: null, error: error })
            }

            return res.status(200).json({ code: 200, produtos: results, error: null })
        })
    }

    delete(req, res, next) {

        var produto_id = req.params.id
        if (!produto_id) {
            return res.status(500).json({ code: 500, resultado: null, error: 'id do produto não fornecido' })
        }

        this.mysql.query('Delete * from produto where id = ' + produto_id, function (error, results, fields) {

            if (error) {
                return res.status(200).json({ code: 500, resultado: null, error: 'produto não encontrado' })
            }

            return res.status(200).json({ code: 200, resultado: results.affectedRows, error: null })
        })
    }

}

module.exports = new ProdutosController()
