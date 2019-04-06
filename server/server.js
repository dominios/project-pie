require('dotenv').config();
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const io = require('socket.io')(http);

const router = require('./router');

const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', express.static(__dirname + '/../client/build'));
app.use(router);

// curl http://localhost:9000/api/v1/set -X POST -d "r=50&g=0&b=150"

server.listen(process.env.PORT, () => {
    console.log(`HTTP server started on port ${process.env.PORT}`);
});

io.on('connection', (socket) => {
    console.log('socket.io connection initiated');

    socket.on('disconnect', function () {
        console.log('socket.io connection disconnected');
    });
});

module.exports = app;
