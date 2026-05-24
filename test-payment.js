const { processPayment } = require('./src/payment.js');
const result = processPayment(100, 'USD');
// Ожидаем commission = 2, но после бага возвращается 0.02
if (Math.abs(result.commission - 2) < 0.01) {
    process.exit(0); // good
} else {
    process.exit(1); // bad
}
