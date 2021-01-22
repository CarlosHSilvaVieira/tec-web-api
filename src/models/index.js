var mysql = require('mysql')

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
});

connection.connect((error) => {
  if (error) throw error;

  console.log("Conexão com o banco de dados realizada com sucesso!");
});

module.exports = connection
