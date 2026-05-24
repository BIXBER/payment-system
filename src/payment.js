// Payment processing module
const rates = require('../config/rates.json');

function processPayment(amount, currency) {
    const commission = rates[currency] || 0.02;
    const total = amount + (amount * commission);
    return {
        amount: amount,
        commission: amount * commission,
        total: total,
        currency: currency
    };
}

module.exports = { processPayment };
