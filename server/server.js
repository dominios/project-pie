require('dotenv').config();

const express = require('express');
const http = require('http');
const io = require('socket.io');
const bodyParser = require('body-parser');

const router = require('./router');

// if (process.env.HTTPS === 'true') {
//     app.use((req, res, next) => {
//         if (req.headers['x-forwarded-proto'] !== 'https') {
//             return res.redirect(['https://', req.get('Host'), req.url].join(''));
//         }
//         return next();
//     });
// }

const app = express();
const server = http.Server(app);

const SocketHub = require('./hub');
const hub = new SocketHub(io(server));

server.listen(process.env.PORT, () => {
    console.log(`HTTP server started on port ${process.env.PORT}`);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', express.static(__dirname + '/../client/build'));
app.use(router);

module.exports = app;
