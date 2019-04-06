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
    console.info(`${LOG_PREFIX} resetting`);
    controller.reset();
} catch (e) {
    console.log(warning(`${LOG_PREFIX} RGB LED controller could not be loaded!`));
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
    const speed = 300;
    let isEven = false;
    setInterval(() => {
        try {
            if (isEven) {
                setAndLog(res, 255, 0, 0);
                isEven = false;
            } else {
                setAndLog(res, 0, 0, 255);
            }
        } catch (e) {

        }
    }, speed);
    res.send(`Flickering job started at speed ${speed}ms`);
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
