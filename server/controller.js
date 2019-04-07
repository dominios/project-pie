const Gpio = require('pigpio').Gpio;

const validateColor = require('./utils').validateColor;

console.log(`[controller] GPIO R LED BRANCH 1: ${process.env.BRANCH_1_GPIO_RED}`);
console.log(`[controller] GPIO G LED BRANCH 1: ${process.env.BRANCH_1_GPIO_GREEN}`);
console.log(`[controller] GPIO B LED BRANCH 1: ${process.env.BRANCH_1_GPIO_BLUE}`);

const ledRed = new Gpio(process.env.BRANCH_1_GPIO_RED, { mode: Gpio.OUTPUT });
const ledGreen = new Gpio(process.env.BRANCH_1_GPIO_GREEN, { mode: Gpio.OUTPUT });
const ledBlue = new Gpio(process.env.BRANCH_1_GPIO_BLUE, { mode: Gpio.OUTPUT });

let interval;

function stopPrevious () {
    if (interval) {
        clearInterval(interval);
    }
}

function setRGB (r, g, b) {
    if (!validateColor(r) || !validateColor(g) || !validateColor(b)) {
        throw new Error('Invalid color range!');
    }
    ledRed.pwmWrite(r);
    ledGreen.pwmWrite(g);
    ledBlue.pwmWrite(b);
}

function reset () {
    stopPrevious();
    ledRed.digitalWrite(0);
    ledGreen.digitalWrite(0);
    ledBlue.digitalWrite(0);
}

function flicker (rgb1, rgb2, speed) {
    stopPrevious();
    
    let isEven = false;
    interval = setInterval(() => {
        try {
            if (isEven) {
                setRGB(rgb1[0], rgb1[1], rgb1[2]);
                isEven = false;
            } else {
                setRGB(rgb2[0], rgb2[1], rgb2[2]);
                isEven = true;
            }
        } catch (e) {
            console.error(e);
        }
    }, speed);
}

module.exports = {
    setRGB: setRGB,
    flicker: flicker,
    reset: reset,
    stop: stopPrevious
};
