const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');

// RUTAS

    const users = require('./routes/userRoutes');

// 

const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended : true
}));
app.use(cors());
app.disabled('x-powered-by');
app.set('port',port);
// LLAMANDO A LAS RUTAS
users(app);
server.listen(3000,'192.168.0.2',function(){
    console.log('server delivery running');
});

// ERROR HANDLED
app.use((err, req, res) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});

module.exports = {
    app: app,
    server: server
};
