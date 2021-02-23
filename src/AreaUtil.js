const { summing } = require('./CalculationUtil');

module.exports = class AreaUtil {
    static getArea(zone) {
        return zone.height * zone.width - summing(zone.apertures, AreaUtil.getApertureArea);
    }

    static getApertureArea(a) {
        return a.width * a.height;
    }
}
