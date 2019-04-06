const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');

const controller = require('./controller');

const PORT = 9000;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', express.static(__dirname + '/../client/build'));

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`HTTP server started on port ${PORT}`)
});
    
function health (req, res) {
    res.send('ONLINE');
}

app.get('/api/health', health); 
app.get('/api/random', controller.randomRGB);
app.get('/api/off', controller.turnOff);
app.post('/api/set', controller.setRGB);
    
module.exports = app;


// curl http://localhost:9000/api/set -X POST -d "r=50&g=0&b=150"

