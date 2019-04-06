const Gpio = require('pigpio').Gpio; //include pigpio to interact with the GPIO

const ledRed = new Gpio(4, { mode: Gpio.OUTPUT }); //use GPIO pin 4 as output for RED
const ledGreen = new Gpio(17, { mode: Gpio.OUTPUT }); //use GPIO pin 17 as output for GREEN
const ledBlue = new Gpio(27, { mode: Gpio.OUTPUT }); //use GPIO pin 27 as output for BLUE

function getRandomArbitrary (min, max) {
    return Math.random() * (max - min) + min;
}

function reset () {
    // RESET RGB LED
    ledRed.digitalWrite(0); // Turn RED LED off
    ledGreen.digitalWrite(0); // Turn GREEN LED off
    ledBlue.digitalWrite(0); // Turn BLUE LED off
}

function setRGB (req, res) {
    
    const r = req.body.r;
    const g = req.body.g;
    const b = req.body.b;
    
    ledRed.pwmWrite(r);
    ledGreen.pwmWrite(g);
    ledBlue.pwmWrite(b);
    
    const log = `Setting colors to RGB (${r}, ${g}, ${b});`;
    console.log(log);
    res.send(log);
}

function randomRGB (req, res) {

    const r = parseInt(getRandomArbitrary(0, 255));
    const g = parseInt(getRandomArbitrary(0, 255));
    const b = parseInt(getRandomArbitrary(0, 255));

    ledRed.pwmWrite(r);
    ledGreen.pwmWrite(g);
    ledBlue.pwmWrite(b);

    const log = "rbg: " + r + ", " + g + ", " + b;
    console.log(log);
    res.send(log)
}

function turnOff (req, res) {
    
    reset();
        
    const log = "turned off";
    console.log(log);
    res.send(log);
}

reset();

module.exports = {
    randomRGB: randomRGB,
    setRGB: setRGB,
    turnOff: turnOff
}
