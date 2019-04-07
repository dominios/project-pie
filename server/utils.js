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

module.exports = {
    getRandomFromInterval: getRandomFromInterval,
    randomColor: randomColor,
    validateColor: validateColor
};
