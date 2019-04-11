const chalk = require('chalk');

const utils = require('./utils');
const defaultState = require('./defaultState');

const error = chalk.red;
const warning = chalk.keyword('orange');
const success = chalk.green;
const LOG_PREFIX = '[sockethub]';

class SocketHub {

    constructor(io) {

        this.io = io;
        this.connections = [];
        this.state = defaultState;

        io.on('connection', this.onConnect.bind(this));
    }

    onConnect (socket) {
        console.log(success(`${LOG_PREFIX} connection initiated (${socket.id})`));

        socket.on('disconnect', this.onDisconnect.bind(this, socket));
        socket.on('set', this.onSet.bind(this));

        this.connections.push(socket);
        this.emitCurrentStateToOne(socket);
    }

    onDisconnect (socket) {
        console.log(`${LOG_PREFIX} connection disconnected (${socket.id})`);
    }

    onSet (data) {
        this.state.currentMode = {
            id: null,
            name: `Custom color: ${utils.rgbToHex(data.r, data.g, data.b)}`,
            configuration: {
                branch1: [data.r, data.g, data.b],
                branch2: [],
            }
        }
        this.emitCurrentStateToAll();
    }

    emitCurrentStateToOne (socket) {
        if (!socket.disconnected) {
            console.log(`${LOG_PREFIX} emitting current state to (${socket.id})`);
            socket.emit('state', this.state);
        }
    }

    emitCurrentStateToAll () {
        this.connections.forEach((socket) => {
            this.emitCurrentStateToOne(socket);
        });
    }

}

module.exports = SocketHub;
