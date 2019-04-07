const express = require('express');
const chalk = require('chalk');

const utils = require('./utils');

const router = express.Router();
const API_PREFIX = '/api/v1';

const error = chalk.red;
const warning = chalk.keyword('orange');
const success = chalk.green;
const LOG_PREFIX = '[controller]';

let controller;

try {
    controller = require('./controller');
    console.info(`${LOG_PREFIX} reset`);
    controller.reset();
    console.log(success(`${LOG_PREFIX} RGB LED controller loaded successfully`));
} catch (e) {
    console.log(error(`${LOG_PREFIX} RGB LED controller could not be loaded!`));
}

router.get(`${API_PREFIX}/health`, (req, res) => {
    res.send(`${LOG_PREFIX} online`);
});

router.get(`${API_PREFIX}/random`, (req, res) => {
    const r = parseInt(utils.getRandomFromInterval(0, 255));
    const g = parseInt(utils.getRandomFromInterval(0, 255));
    const b = parseInt(utils.getRandomFromInterval(0, 255));
    handle(res, r, g, b);
});

router.get(`${API_PREFIX}/off`, (req, res) => {
    handle(res, 0, 0, 0);
});

router.get(`${API_PREFIX}/flicker`, (req, res) => {
    try {
        const rgb1 = [255, 0, 0];
        const rgb2 = [0, 0, 255];
        const speed = 200;
        controller.flicker(rgb1, rgb2, speed);
        console.log(`${LOG_PREFIX} flickering between ${rgb1}, ${rgb2} at speed ${speed}ms`);
        res.status(200);
        res.send(`Flickering job started`);
    } catch (e) {
        console.log(error(e));
        res.status(503);
        res.send(e);
    }
});

router.post(`${API_PREFIX}/set`, (req, res) => {
    const r = req.body.r;
    const g = req.body.g;
    const b = req.body.b;
    handle(res, r, g, b);
});

function handle (res, r, g, b) {
    let message;
    try {
        controller.stop();
        message = setAndLog(r, g, b);
        res.status(200);
    } catch (e) {
        message = e;
        res.status(503);
    } finally {
        res.send(message);
    }
}

function setAndLog (r, g, b) {
    const message = `setting leds to RGB (${r}, ${g}, ${b})`;
    try {
        controller.setRGB(r, g, b);
        console.log(message);
        return message;
    } catch (e) {
        console.log(error(`${LOG_PREFIX} ${e}`));
        throw e;
    }
}

module.exports = router;
