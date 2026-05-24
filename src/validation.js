// Validation utilities
function validateAmount(amount) {
    return amount > 0 && amount < 10000;
}

function validateCurrency(currency) {
    return ['USD', 'EUR', 'GBP'].includes(currency);
}

function validateTransaction(transaction) {
    return validateAmount(transaction.amount) && 
           validateCurrency(transaction.currency);
}

module.exports = { validateAmount, validateCurrency };
