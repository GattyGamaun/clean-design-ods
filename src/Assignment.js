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
        let callback = null;
        this.zones.forEach(zone => callback = zone.getArea)
        const totalArea = summing(this.zones, callback);
        const bill = summing(this.zones, this.calculateZoneBillPrice.bind(this));
        const salaries = this.worker.calculateSalary(totalArea) + this.getAssignmentBonus();

        return bill - salaries;
    }
}
