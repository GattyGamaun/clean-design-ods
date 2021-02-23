const { getArea } = require('./AreaUtil');
const WrongZoneTypeException = require('./WrongZoneTypeException');

class BillCalculator {
    calculateZoneBillPrice(zone) {
        this.validateZone(zone);
        return this.getZoneBillPrice(zone);
    }

    getZoneBillPrice(zone) {
        const area = getArea(zone);
        return this.getMaterialPrice(area) + this.getWorkPrice(area, zone.type);
    }

    validateZone(zone) {
        if (this.isNotContainsKey(zone, BillCalculator.zoneTypeWorkPrice))
            throw new WrongZoneTypeException();
    }

    isNotContainsKey(zone, zoneTypeWorkPrice) {
        return !zoneTypeWorkPrice.has(zone.type);
    }

    getMaterialPrice(area) {
        return area * BillCalculator.MATERIAL_AREA_FACTOR;
    }

    getWorkPrice(area, type) {
        const price = area * BillCalculator.zoneTypeWorkPrice.get(type);
        return area < BillCalculator.ONE_DAY_MAX_AREA ? price : price * BillCalculator.MULTI_DAY_PRICE_FACTOR;
    }

}

BillCalculator.zoneTypeWorkPrice = new Map();
BillCalculator.MATERIAL_AREA_FACTOR = 10;
BillCalculator.ONE_DAY_MAX_AREA = 50;
BillCalculator.MULTI_DAY_PRICE_FACTOR = 1.1;

module.exports = BillCalculator;
