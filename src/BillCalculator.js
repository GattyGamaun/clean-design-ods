const { getArea } = require('./AreaUtil');
const { summing } = require('./CalculationUtil');

class BillCalculator {
    calculateZoneBillPrice(zone) {
        zone.validateZone(BillCalculator.zoneTypeWorkPrice);
        return zone.getZoneBillPrice(BillCalculator.zoneTypeWorkPrice);
    }

    getBillBalance(assignments){
        let salaries = 0;
        let bill = 0;
        assignments.forEach(assignment => {
            const totalArea = summing(assignment.zones, getArea)
            salaries += assignment.worker.getSalary(totalArea, assignment);
            bill += summing(assignment.zones, this.calculateZoneBillPrice.bind(this));
        });

        return bill - salaries;
    }
}

BillCalculator.zoneTypeWorkPrice = new Map();

module.exports = BillCalculator;
