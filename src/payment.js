// Payment processing module
function processPayment(amount, currency) {
    const commission = 0.02; // 2% commission
    const total = amount * (1 + commission);
    return {
        amount: amount,
        commission: amount * commission,
        total: total,
        currency: currency
    };
}

module.exports = { processPayment };
