class BillCalculator {
    getBillBalance(assignments) {
        let sum = 0;
        assignments.forEach(assignment => {
            sum += assignment.getSummary()
        });
        return sum;
    }
}

module.exports = BillCalculator;
