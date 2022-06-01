module.exports = class Worker {
    constructor(dailyRate, amountPerDay) {
        this.dailyRate = dailyRate;
        this.amountPerDay = amountPerDay;
    }

    calculateSalary() {
        throw new Error('The method must be implemented');
    }

    getSalaryFactor() {
        throw new Error('The method must be implemented');
    }

    getBonusFactor() {
        throw new Error('The method must be implemented');
    }

    getAssignmentBonus() {
        throw new Error('The method must be implemented');
    }

    getSalary() {
        throw new Error('The method must be implemented');
    }
}
