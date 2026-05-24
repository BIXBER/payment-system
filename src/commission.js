// Commission calculation module
function calculateCommission(amount, rate) {
    return amount * rate;
}

function calculateProgressiveCommission(amount, rate) {
    // TODO: implement progressive rates
    if (amount < 100) {
        return amount * rate;
    } else if (amount < 1000) {
        return amount * rate

module.exports = { calculateCommission };
