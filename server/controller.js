var Gpio = require('pigpio').Gpio, //include pigpio to interact with the GPIO
    ledRed = new Gpio(4, { mode: Gpio.OUTPUT }), //use GPIO pin 4 as output for RED
    ledGreen = new Gpio(17, { mode: Gpio.OUTPUT }), //use GPIO pin 17 as output for GREEN
    ledBlue = new Gpio(27, { mode: Gpio.OUTPUT }), //use GPIO pin 27 as output for BLUE
    redRGB = 255, //set starting value of RED variable to off (255 for common anode)
    greenRGB = 255, //set starting value of GREEN variable to off (255 for common anode)
    blueRGB = 255; //set starting value of BLUE variable to off (255 for common anode)

// RESET RGB LED
ledRed.digitalWrite(1); // Turn RED LED off
ledGreen.digitalWrite(1); // Turn GREEN LED off
ledBlue.digitalWrite(1); // Turn BLUE LED off

function getRandomArbitrary (min, max) {
    return Math.random() * (max - min) + min;
}

function random (req, res) {
    //for common anode RGB LED  255 is fully off, and 0 is fully on, so we have to change the value from the client
    redRGB = 255 - parseInt(getRandomArbitrary(0, 255));
    greenRGB = 255 - parseInt(getRandomArbitrary(0, 255));
    blueRGB = 255 - parseInt(getRandomArbitrary(0, 255));

    ledRed.pwmWrite(redRGB); //set RED LED to specified value
    ledGreen.pwmWrite(greenRGB); //set GREEN LED to specified value
    ledBlue.pwmWrite(blueRGB); //set BLUE LED to specified value

    const log = "rbg: " + redRGB + ", " + greenRGB + ", " + blueRGB;
    console.log(log); //output converted to console
    res.send(log)
}

module.exports = {
    random: random
}