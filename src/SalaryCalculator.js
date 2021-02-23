class SalaryCalculator {
    calculateSalary(worker, area) {
        const days = Math.ceil(area / worker.amountPerDay);
        const baseSalary = worker.dailyRate * days;
        return worker.isJunior ? baseSalary : baseSalary * SalaryCalculator.SENIOR_SALARY_FACTOR;
    }
}

SalaryCalculator.SENIOR_SALARY_FACTOR = 1.2;

module.exports = SalaryCalculator;
