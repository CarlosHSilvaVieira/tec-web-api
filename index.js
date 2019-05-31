var express = require ('express');
var bodyParse = require('body-parser');
var cors = require('cors');

// criando app
var app = express();
var port = process.env.PORT || 3005;

app.use(bodyParse.json());
app.use(cors());

var routes = require('./src/routes')
app.use('/api', routes)

app.listen(port, function () {
    console.log(`App rodando na porta ${port}`);
});
