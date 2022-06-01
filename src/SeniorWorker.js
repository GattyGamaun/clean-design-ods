const Worker = require('./Worker');

module.exports = class SeniorWorker extends Worker {
    static get salaryFactor() {
        return 1.2;
    }

    static get bonusFactor() {
        return 1.5;
    }

    getAssignmentBonus(assignment) {
        return assignment.vendorBonus * SeniorWorker.bonusFactor;
    }

    getSalary(area, assigment) {
        return this.calculateSalary(area) + this.getAssignmentBonus(assigment);
    }

    calculateSalary(area) {
        const days = Math.ceil(area / this.amountPerDay);
        return this.dailyRate * days * SeniorWorker.salaryFactor;
    }
}
