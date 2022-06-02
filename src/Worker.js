module.exports = class Worker {
    constructor(dailyRate, amountPerDay) {
        this.dailyRate = dailyRate;
        this.amountPerDay = amountPerDay;
    }

    getSalaryFactor() {
        throw new Error('The method must be implemented');
    }

    getBonusFactor() {
        throw new Error('The method must be implemented');
    }

    calculateSalary(area) {
        const days = Math.ceil(area / this.amountPerDay);
        return this.dailyRate * days * this.getSalaryFactor();
    }
}
