const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    suite('convertHandler()', () => {
        suite('Input: Number', () => {
            test('1. should correctly read a whole number input', () => {
                assert.equal(4, convertHandler.getNum('4gal'));
                assert.equal(10, convertHandler.getNum('10km'));
                assert.equal(100, convertHandler.getNum('100lbs'));
            });
            test('2. should correctly read a decimal number input', () => {
                assert.equal(0.5, convertHandler.getNum('0.5gal'));
                assert.equal(11.11, convertHandler.getNum('11.11km'));
                assert.equal(100.1, convertHandler.getNum('100.100lbs'));
            });
            test('3. should correctly read a fractional input', () => {
                assert.equal(0.5, convertHandler.getNum('1/2gal'));
                assert.equal(4, convertHandler.getNum('12/3km'));
                assert.approximately(8.33333, 0.00001, convertHandler.getNum('100/12lbs'));
            });
            test('4. should correctly read a fractional input with a decimal', () => {
                assert.approximately(0.04166, 0.00001, convertHandler.getNum('0.5/12gal'));
                assert.equal(5.555, convertHandler.getNum('11.11/2km'));
                assert.equal(200.2, convertHandler.getNum('100.100/0.5lbs'));
            });
            test('5. should correctly return an error on a double-fraction', () => {
                assert.equal('invalid number', convertHandler.getNum('0.5/12/0.5gal'));
                assert.equal('invalid number', convertHandler.getNum('11/2/2km'));
                assert.equal('invalid number', convertHandler.getNum('90/0.5/100lbs'));
            });
            test('6. should default to a input of 1 when no numerical input is provided', () => {
                assert.equal(1, convertHandler.getNum('km'));
                assert.equal(1, convertHandler.getNum('l'));
                assert.equal(1, convertHandler.getNum('mi'));
            });
        });
        suite('Input: Unit', () => {
            test('7. should correctly read each valid input unit', () => {
                assert.isString(convertHandler.getUnit('10km'));
                assert.equal('mi', convertHandler.getUnit('22mI'));
                assert.equal('L', convertHandler.getUnit("100l"));
            });
            test('8. should correctly return an error for an invalid input unit', () => {
                assert.equal('invalid unit', convertHandler.getUnit('10kmm'));
                assert.equal('invalid unit', convertHandler.getUnit('10mi '));
                assert.equal('invalid unit', convertHandler.getUnit('10miles'));
            })
            test('9. should return the correct return unit for each valid input unit', () => {
                [['gal','L'],['lbs','kg'],['mi','km']].forEach((units) => {
                    assert.equal(units[0], convertHandler.getReturnUnit(units[1]));
                    assert.equal(units[1], convertHandler.getReturnUnit(units[0]));
                });
            });
            test('10. should correctly return the spelled-out string unit for each valid input unit', () => {
                [
                    ['gal','gallons'],
                    ['L','liters'],
                    ['lbs','pounds'],
                    ['kg','kilograms'],
                    ['mi','miles'],
                    ['km','kilometers'],
                ].forEach((units) => {
                    assert.equal(units[1], convertHandler.spellOutUnit(units[0]))
                });
            });
        });
        suite('Conversion:', () => {
            test('11. should correctly convert gal to L', () => {
                assert.equal(46.18200, convertHandler.convert(12.2, 'gal'));
                assert.equal(378.54100, convertHandler.convert(100, 'gal'));
                assert.equal(1.89271, convertHandler.convert(0.5, 'gal'));
            });
            test('12. should correctly convert L to gal', () => {
                assert.equal(3.22290, convertHandler.convert(12.2, 'L'));
                assert.equal(26.41722, convertHandler.convert(100, 'L'));
                assert.equal(0.13209, convertHandler.convert(0.5, 'L'));
            });
            test('13. should correctly convert mi to km', () => {
                assert.equal(19.63395, convertHandler.convert(12.2, 'mi'));
                assert.equal(160.93400, convertHandler.convert(100, 'mi'));
                assert.equal(0.80467, convertHandler.convert(0.5, 'mi'));
            });
            test('14. should correctly convert km to mi', () => {
                assert.equal(7.58075, convertHandler.convert(12.2, 'km'));
                assert.equal(62.13727, convertHandler.convert(100, 'km'));
                assert.equal(0.31069, convertHandler.convert(0.5, 'km'));
            });
            test('15. should correctly convert lbs to kg', () => {
                assert.equal(5.53382, convertHandler.convert(12.2, 'lbs'));
                assert.equal(45.35920, convertHandler.convert(100, 'lbs'));
                assert.equal(0.22680, convertHandler.convert(0.5, 'lbs'));
            });
            test('16. should correctly convert kg to lbs', () => {
                assert.equal(26.89642, convertHandler.convert(12.2, 'kg'));
                assert.equal(220.46244, convertHandler.convert(100, 'kg'));
                assert.equal(1.10231, convertHandler.convert(0.5, 'kg'));
            });
        });
    });
});