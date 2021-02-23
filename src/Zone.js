module.exports = class Zone {
    constructor(type, height, width, apertures = []) {
        this.height = height;
        this.width = width;
        this.type = type;
        this.apertures = apertures;
    }
}
