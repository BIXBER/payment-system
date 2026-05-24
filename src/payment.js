// Payment processing module
const rates = require('../config/rates.json');
function processPayment(amount, currency) {
    const commission = rates[currency] || 0.02;
    const total = amount + (amount * commission); // Изменили порядок операций
    return {
        amount: amount,
        commission: commission, // БАГ: теперь возвращаем rate, а не сумму
        total: total,
        currency: currency
    };
}

module.exports = { processPayment };
