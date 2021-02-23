module.exports = class WrongZoneTypeException extends Error {
    constructor(message) {
        super(message);
        this.name = 'WrongZoneType';
    }
}
