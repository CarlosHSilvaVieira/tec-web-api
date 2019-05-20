var mysql = require('mysql')

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'q1w2e3r4',
    port: 3306,
    database: 'tec_web'
})

connection.connect((error) => {

    if (error) throw error

    console.log('Conexão com o banco de dados realizada com sucesso!')
})

module.exports = connection
