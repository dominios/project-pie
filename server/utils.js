function getRandomFromInterval (min, max) {
    return Math.random() * (max - min) + min;
}

function randomColor () {
    return [
        parseInt(getRandomFromInterval(0, 255)),
        parseInt(getRandomFromInterval(0, 255)),
        parseInt(getRandomFromInterval(0, 255)),
    ];
}

function validateColor (color) {
    return typeof color === 'number' && color >= 0 && color <= 255;
}

function componentToHex (c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex (r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

module.exports = {
    getRandomFromInterval: getRandomFromInterval,
    randomColor: randomColor,
    validateColor: validateColor,
    componentToHex,
    rgbToHex
};
