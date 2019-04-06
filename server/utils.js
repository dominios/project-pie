function getRandomFromInterval (min, max) {
    return Math.random() * (max - min) + min;
}

function validateColor (color) {
    return !(typeof color !== 'number' || (color < 0 && color > 255));
}

module.exports = {
    getRandomFromInterval: getRandomFromInterval,
    validateColor: validateColor
};
