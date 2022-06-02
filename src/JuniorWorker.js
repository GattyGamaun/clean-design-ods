const Worker = require('./Worker');

module.exports = class JuniorWorker extends Worker {
     getSalaryFactor() {
        return 1;
    }

    getBonusFactor() {
        return 1;
    }
}
