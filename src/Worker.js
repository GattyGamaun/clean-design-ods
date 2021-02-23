module.exports = class Worker {
    constructor(dailyRate, amountPerDay, isJunior = false) {
        this.dailyRate = dailyRate;
        this.amountPerDay = amountPerDay;
        this.isJunior = isJunior;
    }
}
