const Gpio = require('pigpio').Gpio;

const validateColor = require('./utils').validateColor;

const ledRed = new Gpio(process.env.BRANCH_1_GPIO_RED, { mode: Gpio.OUTPUT });
const ledGreen = new Gpio(process.env.BRANCH_1_GPIO_GREEN, { mode: Gpio.OUTPUT });
const ledBlue = new Gpio(process.env.BRANCH_1_GPIO_BLUE, { mode: Gpio.OUTPUT });

console.log(`[controller] GPIO RED LED BRANCH 1: ${process.env.BRANCH_1_GPIO_RED}`);
console.log(`[controller] GPIO GREEN LED BRANCH 1: ${process.env.BRANCH_1_GPIO_GREEN}`);
console.log(`[controller] GPIO BKUE LED BRANCH 1: ${process.env.BRANCH_1_GPIO_BLUE}`);

function setRGB (r, g, b) {
    if (!validateColor(r) || !validateColor(g) || !validateColor(b)) {
        throw new Error('Invalid color range!');
    }
    ledRed.pwmWrite(r);
    ledGreen.pwmWrite(g);
    ledBlue.pwmWrite(g);
}

function reset () {
    ledRed.digitalWrite(0);
    ledGreen.digitalWrite(0);
    ledBlue.digitalWrite(0);
}

module.exports = {
    setRGB: setRGB,
    reset: reset
};
