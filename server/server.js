const express = require('express');
const http = require('http');

const PORT = 9000;

const app = express();
let server;

app.use('/', express.static(__dirname + '/../client/build'));

server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`HTTP server started on port ${PORT}`)
});

try {
    const controller = require('./controller');
    app.get('/api/toggle', controller.random);
} catch (err) {
    console.warn('controller could not be loaded');
    app.get('/api/toggle', (req, res) => {
        res.send('Controller cound not be loaded');
    })
}

module.exports = app;
