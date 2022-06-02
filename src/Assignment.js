const {summing} = require("./CalculationUtil");

module.exports = class Assignment {
    constructor(worker, zones, vendorBonus) {
        this.worker = worker;
        this.zones = zones;
        this.vendorBonus = vendorBonus;
    }

    calculateZoneBillPrice(zone) {
        zone.validateZone(Assignment.zoneTypeWorkPrice);
        return zone.getZoneBillPrice(Assignment.zoneTypeWorkPrice);
    }

    getAssignmentBonus() {
        return this.vendorBonus * this.worker.getBonusFactor();
    }

    getSummary() {
        const totalArea = summing(this.zones, this.zones[0].getArea)
        const salaries = this.worker.calculateSalary(totalArea) + this.getAssignmentBonus();
        const bill = summing(this.zones, this.calculateZoneBillPrice.bind(this));

        return bill - salaries;
    }
}
