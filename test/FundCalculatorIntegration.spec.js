const assert = require('assert');
const BillCalculator = require('../src/BillCalculator');
const JuniorWorker = require('../src/JuniorWorker');
const SeniorWorker = require('../src/SeniorWorker');
const Assignment = require('../src/Assignment');
const Zone = require('../src/Zone')
const Aperture = require('../src/Aperture')
const WrongZoneTypeException = require('../src/WrongZoneTypeException');

describe('FundCalculator integration', () => {
    let assignments = [];
    const billCalculator = new BillCalculator();

    const assertBalance = expected => {
        assert.strictEqual(billCalculator.getBillBalance(assignments), expected);
    }

    const assign = (worker, zones) => {
        const assignment = new Assignment(worker, zones, 50);
        assignments.push(assignment);
    }

    const setBigVendorBonusToFirstAssignment = () => assignments[0].vendorBonus = 100;
    const getWallWithApertures = () => new Zone('Wall', 10, 10, [new Aperture(9, 5), new Aperture(9, 4)]);

    before(() => {
        Assignment.zoneTypeWorkPrice = new Map([
            ['Wall', 15], ['Floor', 10], ['Ceiling', 12]
        ]);
    });

    beforeEach(() => {
        assignments = [];
    });

    it('should calculate zero balance when no assignments', () => {
        assertBalance(0);
    });

    it('should throw exception when zone with wrong type', () => {
        assign(new SeniorWorker(250, 30), [new Zone('Other', 5, 6)])
        assert.throws(() => billCalculator.getBillBalance(assignments), WrongZoneTypeException);
    });

    it('should calculate balance when one worker with one wall assignment', () => {
        assign(new SeniorWorker(250, 30), [new Zone('Wall', 5, 5)]);
        assertBalance(250);
    });

    it('should calculate balance when one worker with one wall assignment with big vendor bonus', () => {
        assign(new SeniorWorker(250, 30), [new Zone('Wall', 5, 5)]);
        setBigVendorBonusToFirstAssignment();
        assertBalance(175);
    });

    it('should calculate balance when one worker with one big wall with aperture assignment', () => {
        assign(new SeniorWorker(250, 30), [getWallWithApertures()]);
        assertBalance(100);
    });

    it('should calculate balance when one worker with one floor assignment', () => {
        assign(new SeniorWorker(180, 30), [new Zone('Floor', 5, 5)]);
        assertBalance(209);
    });

    it('should calculate balance when one worker with one ceiling assignment', () => {
        assign(new SeniorWorker(200, 30), [new Zone('Ceiling', 5, 5)]);
        assertBalance(235);
    });

    it('should calculate balance when one worker with one small ceiling assignment', () => {
        assign(new SeniorWorker(200, 30), [new Zone('Ceiling', 3, 5)]);
        assertBalance(15);
    });

    it('should calculate balance when one worker with two ceiling assignment', () => {
        assign(new SeniorWorker(200, 30), [new Zone('Ceiling', 2, 5), new Zone('Ceiling', 3, 5)]);
        assertBalance(235);
    });

    it('should calculate balance when one junior worker with one ceiling assignment', () => {
        assign(new JuniorWorker(200, 30), [new Zone('Ceiling', 5, 5)]);
        assertBalance(300);
    });

    it('should calculate balance when one junior worker with one ceiling assignment with big vendor bonus', () => {
        assign(new JuniorWorker(200, 30), [new Zone('Ceiling', 5, 5)]);
        setBigVendorBonusToFirstAssignment();
        assertBalance(250);
    });

    it('should calculate balance when one junior cheap worker with one ceiling assignment', () => {
        assign(new JuniorWorker(100, 30), [new Zone('Ceiling', 5, 5)]);
        assertBalance(400);
    });

    it('should calculate balance when one senior cheap worker with one ceiling assignment', () => {
        assign(new SeniorWorker(180, 30), [new Zone('Ceiling', 5, 5)]);
        assertBalance(259);
    });

    it('should calculate balance when one worker with one wall assignment works two days but less amount than max per day', () => {
        assign(new SeniorWorker(250, 30), [new Zone('Wall', 9, 5)]);
        assertBalance(450);
    });

    it('should calculate balance when one worker with one wall assignment works two days but more amount than max per day', () => {
        assign(new SeniorWorker(250, 30), [new Zone('Wall', 11, 5)]);
        assertBalance(782.5);
    });

    it('should calculate balance when one worker with one wall assignment works one day but more amount than max per day', () => {
        assign(new SeniorWorker(250, 60), [new Zone('Wall', 11, 5)]);
        assertBalance(1082.5);
    });

    it('should calculate balance when two workers with one wall assignment', () => {
        assign(new SeniorWorker(250, 30), [new Zone('Wall', 5, 5)]);
        assign(new SeniorWorker(250, 30), [new Zone('Wall', 5, 5)]);
        assertBalance(500);
    });

    it('should calculate balance for complex testcase', () => {
        assign(new SeniorWorker(250, 40), [new Zone('Floor', 5, 3), new Zone('Wall', 10, 10)]);
        setBigVendorBonusToFirstAssignment();
        const worker =  new JuniorWorker(200, 30, true);
        assign(worker, [new Zone('Ceiling', 5, 5), getWallWithApertures()]);
        assign(worker, [new Zone('Ceiling', 5, 5), getWallWithApertures()]);
        assign(new SeniorWorker(280, 60), [new Zone('Wall', 1, 5), new Zone('Wall', 11, 5)]);
        assertBalance(4221.5);
    });
});
