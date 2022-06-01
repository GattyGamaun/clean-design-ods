const Worker = require('./Worker');

module.exports = class JuniorWorker extends Worker {
    calculateSalary(area) {
        const days = Math.ceil(area / this.amountPerDay);
        return this.dailyRate * days;
    }

    getAssignmentBonus(assignment) {
        return assignment.vendorBonus;
    }

    getSalary(area, assigment) {
        return this.calculateSalary(area) + this.getAssignmentBonus(assigment);
    }
}
