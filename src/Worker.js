class Worker {
    constructor(dailyRate, amountPerDay, isJunior = false) {
        this.dailyRate = dailyRate;
        this.amountPerDay = amountPerDay;
        this.isJunior = isJunior;
    }

    calculateSalary(area) {
        const days = Math.ceil(area / this.amountPerDay);
        const baseSalary = this.dailyRate * days;
        return this.isJunior ? baseSalary : baseSalary * Worker.SENIOR_SALARY_FACTOR;
    }

    getAssignmentBonus(assignment) {
        return this.isJunior ? assignment.vendorBonus : assignment.vendorBonus * Worker.SENIOR_BONUS_FACTOR;
    }

    getSalary(area, assigment) {
        return this.calculateSalary(area) + this.getAssignmentBonus(assigment);
    }
}

Worker.SENIOR_SALARY_FACTOR = 1.2;
Worker.SENIOR_BONUS_FACTOR = 1.5;

module.exports = Worker;
