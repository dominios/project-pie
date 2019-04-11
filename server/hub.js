const chalk = require('chalk');
const { Subject } = require('rxjs');

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

        this.colors$ = new Subject();
        this.colors$.subscribe(this.__set.bind(this));

        this.controller = null;

        try {
            this.controller = require('./controller');
            console.info(`${LOG_PREFIX} reset`);
            this.controller.reset();
            console.log(success(`${LOG_PREFIX} RGB LED controller loaded successfully`));
        } catch (e) {
            console.log(error(`${LOG_PREFIX} RGB LED controller could not be loaded!`));
        }

        io.on('connection', this.onConnect.bind(this));
    }

    onConnect (socket) {
        console.log(success(`${LOG_PREFIX} connection initiated (${socket.id})`));

        socket.on('disconnect', this.onDisconnect.bind(this, socket));
        socket.on('set', this.onSet.bind(this));
        socket.on('power', this.onPower.bind(this));
        socket.on('next', this.onNext.bind(this));
        socket.on('previous', this.onPrevious.bind(this));
        socket.on('reset', this.onReset.bind(this));

        this.connections.push(socket);
        this.__emitCurrentStateToOne(socket);
    }

    onDisconnect (socket) {
        console.log(`${LOG_PREFIX} connection disconnected (${socket.id})`);
    }

    onSet (data) {
        const color = [data.r, data.g, data.b];
        this.state.currentMode = {
            id: null,
            name: `Custom color: ${utils.rgbToHex(color[0], color[1], [color[2]])}`,
            off: false,
            configuration: {
                branch1: color,
                branch2: [],
            }
        }

        this.colors$.next(true);
        this.__emitCurrentStateToAll();
    }

    onPower (powerSetting) {
        let newModeIndex;
        if (powerSetting === false) {
            newModeIndex = 0;
        } else {
            newModeIndex = 1;
        }

        this.state.currentMode = this.state.availableModes.slice(newModeIndex, newModeIndex + 1)[0]
        this.colors$.next(true);
        this.__emitCurrentStateToAll();
    }

    onNext () {

        let newModeIndex;

        if (this.state.currentMode.id > 0) {
            const current = this.state.availableModes.find((m) => m.id === this.state.currentMode.id);
            const currentIndex = this.state.availableModes.indexOf(current);
            newModeIndex = currentIndex + 1;
            if (newModeIndex > (this.state.availableModes.length - 1)) {
                newModeIndex = 1;
            }
        } else {
            newModeIndex = 1;
        }

        this.state.currentMode = this.state.availableModes.slice(newModeIndex, newModeIndex + 1)[0];
        this.colors$.next(true);
        this.__emitCurrentStateToAll();
    }

    onPrevious () {

        let newModeIndex;

        if (this.state.currentMode.id > 0) {
            const current = this.state.availableModes.find((m) => m.id === this.state.currentMode.id);
            const currentIndex = this.state.availableModes.indexOf(current);
            newModeIndex = currentIndex - 1;
            if (newModeIndex === 0) {
                newModeIndex = this.state.availableModes.length - 1;
            }
        } else {
            newModeIndex = this.state.availableModes.length - 1;
        }

        this.state.currentMode = this.state.availableModes.slice(newModeIndex, newModeIndex + 1)[0];
        this.colors$.next(true);
        this.__emitCurrentStateToAll();
    }

    onReset () {
        this.colors$.next(true);
        this.state.currentMode = this.state.availableModes.slice(1, 2)[0];
        this.__emitCurrentStateToAll();
    }

    __set () {
        const color = this.state.currentMode.configuration.branch1;
        const message = `${LOG_PREFIX} triggering LED change to RGB (${color})`;
        try {
            this.controller.transition(color);
            console.log(message);
            return message;
        } catch (e) {
            console.log(error(`${LOG_PREFIX} LED update failed!`));
        }
    }

    __emitCurrentStateToOne (socket) {
        if (!socket.disconnected) {
            console.log(`${LOG_PREFIX} emitting current state to (${socket.id})`);
            socket.emit('state', this.state);
        }
    }

    __emitCurrentStateToAll () {
        this.connections.forEach((socket) => {
            this.__emitCurrentStateToOne(socket);
        });
    }

}

module.exports = SocketHub;
