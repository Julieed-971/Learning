function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

function fahrenheitToCelsius(farhenheit) {
    return(farhenheit - 32) * 5 / 9;
}

module.exports = {
    generateRandomNumber,
    fahrenheitToCelsius,
};