const SalaryCalculator = require('./SalaryCalculator');
const BillCalculator = require('./BillCalculator');
const { summing } = require('./CalculationUtil');
const { getArea } = require('./AreaUtil');

class FundCalculator {
    constructor() {
        this.salaryCalculator = new SalaryCalculator();
        this.billCalculator = new BillCalculator();
    }

    getFundBalance(assignments){
        let salaries = 0;
        let bill = 0;

        assignments.forEach(assignment => {
            const totalArea = summing(assignment.zones, getArea)
            salaries += this.salaryCalculator.calculateSalary(assignment.worker, totalArea) + this.getAssignmentBonus(assignment);
            bill += summing(assignment.zones, this.billCalculator.calculateZoneBillPrice.bind(this.billCalculator));
        });

        return bill - salaries;
    }

    getAssignmentBonus(assignment) {
        return assignment.worker.isJunior ?
            assignment.vendorBonus :
            assignment.vendorBonus * FundCalculator.SENIOR_BONUS_FACTOR;
    }
}

FundCalculator.SENIOR_BONUS_FACTOR = 1.5;

module.exports = FundCalculator;
