module.exports = class CalculationUtil {
    static summing(collection, modifier) {
        return collection.reduce((a, b) => a + modifier.call(b, b), 0);
    }
}
