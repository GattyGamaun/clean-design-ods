module.exports = class Aperture {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }

    getApertureArea() {
        return this.width * this.height;
    }
}
