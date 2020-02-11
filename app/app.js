//////GLOBAL PATCH
global.basedir = __dirname;


const { Connection, Request } = require("tedious");



const express = require('express');
const http = require('http');
const mssql = require('mssql');

const patch = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = normalizePort(process.env.PORT || 3000);
app.set('port', port);

var server = http.createServer(app);
const routes = require('./router/ClientRoute');
app.use('/', routes);

app.disable('etag');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(patch.join(basedir, 'app')));


var dbConfig = {
    server: 'localhost',
    port: 1433,
    user: 'sa',
    password: 'teckins',
    database: 'dbClient',
    connectionTimeout: 150000,
    driver: 'alcateia',
    stream: false,

    options: {
        appName: 'client',
        encrypt: false
    },

    pool: {
        max: 20,
        min: 0,
        idleTimeoutMillis: 30000
    }
}

mssql.connect(dbConfig).then(pool => {
    if (pool.connecting) {
        console.log("Conectando com a base de dados..");
    }
    if (pool.connected) {
        server.listen(port, () => {
            console.log('Servidor conectado com a base de dados pela porta %d', port);
        });
    }
    return pool;
}).catch(function(err) {
    console.log('falha ao se conectar a base dados');
    console.log(err);
});

function normalizePort (val) {

    const port = parseInt(val, 10); // converte val para int em decimal

    if(isNaN(val)) {
        return port;
    }
    if (port >= 0) {
        return port;
    }
    return false;
} 