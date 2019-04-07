const Gpio = require('pigpio').Gpio;

const validateColor = require('./utils').validateColor;
const randomColor = require('./utils').randomColor;

console.log(`[controller] GPIO R LED BRANCH 1: ${process.env.BRANCH_1_GPIO_RED}`);
console.log(`[controller] GPIO G LED BRANCH 1: ${process.env.BRANCH_1_GPIO_GREEN}`);
console.log(`[controller] GPIO B LED BRANCH 1: ${process.env.BRANCH_1_GPIO_BLUE}`);

const ledRed = new Gpio(process.env.BRANCH_1_GPIO_RED, { mode: Gpio.OUTPUT });
const ledGreen = new Gpio(process.env.BRANCH_1_GPIO_GREEN, { mode: Gpio.OUTPUT });
const ledBlue = new Gpio(process.env.BRANCH_1_GPIO_BLUE, { mode: Gpio.OUTPUT });

let interval;
let smoothingInterval;
let currentColor = [0, 0, 0];

function stopPrevious () {
    if (interval) {
        clearInterval(interval);
    }
    if (smoothingInterval) {
        clearInterval(smoothingInterval);
    }
}

function setRGB (r, g, b, options) {
    if (!validateColor(r)) {
        throw new Error(`Invalid color range for color RED: ${r}!`);
    }
    if (!validateColor(g)) {
        throw new Error(`Invalid color range for color BLUE: ${g}!`);
    }
    if (!validateColor(b)) {
        throw new Error(`Invalid color range for color GREEN: ${b}!`);
    }
   
    ledRed.pwmWrite(r);
    ledGreen.pwmWrite(g);
    ledBlue.pwmWrite(b);
   
    if (options !== undefined && typeof options === 'object') {
        if (options.silent !== true) {
            currentColor = [r, g, b];
        }
    }
}

function transition (to, duration) {
    const from = currentColor;
    smooth(from, to, duration || 400);
}

function reset () {
    stopPrevious();
    currentColor = [0, 0, 0];
    ledRed.digitalWrite(0);
    ledGreen.digitalWrite(0);
    ledBlue.digitalWrite(0);
}

function smooth (from, to, time) {
    const fps = 30;
    const cycleTime = 1000 / fps; // one frame duration; 0.0333 for 30fps
    const iterationsCount = fps / (1 / time * 1000);
    
    let r = from[0];
    let rDiff = to[0] - r;
    let rAdd = rDiff / iterationsCount;
    
    let g = from[1];
    let gDiff = to[1] - g;
    let gAdd = gDiff / iterationsCount;
    
    let b = from[2];
    let bDiff = to[2] - b;
    let bAdd = bDiff / iterationsCount;
    
    function inc (current, addition) {
        return Math.min(255, Math.max(0, Math.round(current + addition)));
    }
    
    if (smoothingInterval) {
        clearInterval(smoothingInterval);
    }
    
    let i = 0;
    smoothingInterval = setInterval(() => {
        
        r = inc(r, rAdd);
        g = inc(g, gAdd);
        b = inc(b, bAdd);
        setRGB(r, g, b, { silent: true });
        
        // end once finished
        if (++i === iterationsCount) {
            clearInterval(smoothingInterval);
            currentColor = to;
        }
    }, cycleTime);
}

function flicker (rgb1, rgb2, speed, random) {
    stopPrevious();
    
    let isEven = false;
    let current = currentColor;
    
    interval = setInterval(() => {
        try {
            
            if (random === true) {
                const target = randomColor();
                smooth(current, target, speed);
                current = target;
                return;
            }
            
            if (isEven) {
                smooth(rgb1, rgb2, speed);
                isEven = false;
            } else {
                smooth(rgb2, rgb1, speed);
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
    stop: stopPrevious,
    transition: transition
};
