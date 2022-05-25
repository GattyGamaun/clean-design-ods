const Aperture = require('./Aperture')
const WrongZoneTypeException = require("./WrongZoneTypeException");
const { summing } = require('./CalculationUtil');

class Zone {
    constructor(type, height, width, apertures = []) {
        this.height = height;
        this.width = width;
        this.type = type;
        this.apertures = apertures;
    }

    getArea() {
        return this.height * this.width - summing(this.apertures, new Aperture(this.height, this.width).getApertureArea);
    }

    getZoneBillPrice(zoneTypeWorkPrice) {
        return this.getMaterialPrice() + this.getWorkPrice(zoneTypeWorkPrice);
    }

    validateZone(zoneTypeWorkPrice) {
        if (this.isNotContainsKey(zoneTypeWorkPrice))
            throw new WrongZoneTypeException();
    }

    isNotContainsKey(zoneTypeWorkPrice) {
        return !zoneTypeWorkPrice.has(this.type);
    }

    getMaterialPrice() {
        return this.getArea() * Zone.MATERIAL_AREA_FACTOR;
    }

    getWorkPrice(zoneTypeWorkPrice) {
        const price = this.getArea() * zoneTypeWorkPrice.get(this.type);
        return this.getArea() < Zone.ONE_DAY_MAX_AREA ? price : price * Zone.MULTI_DAY_PRICE_FACTOR;
    }
}

Zone.MATERIAL_AREA_FACTOR = 10;
Zone.ONE_DAY_MAX_AREA = 50;
Zone.MULTI_DAY_PRICE_FACTOR = 1.1;

module.exports = Zone;
