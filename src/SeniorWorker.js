const Worker = require('./Worker');

module.exports = class SeniorWorker extends Worker {
    getSalaryFactor() {
        return 1.2;
    }

    getBonusFactor() {
        return 1.5;
    }
}
