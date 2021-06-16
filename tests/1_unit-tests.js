const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    suite('convertHandler()', () => {
        suite('Input', () => {
            test('Should correctly read a whole number input', () => {
                assert.equal(4, convertHandler.getNum('4gal'));
                assert.equal(10, convertHandler.getNum('10km'));
                assert.equal(100, convertHandler.getNum('100lbs'));
            });
            test('Should correctly read a decimal number input', () => {
                assert.equal(0.5, convertHandler.getNum('0.5gal'));
                assert.equal(11.11, convertHandler.getNum('11.11km'));
                assert.equal(100.1, convertHandler.getNum('100.100lbs'));
            });
            test('Should correctly read a fractional input', () => {
                assert.equal(0.5, convertHandler.getNum('1/2gal'));
                assert.equal(4, convertHandler.getNum('12/3km'));
                assert.approximately(8.33333, 0.00001, convertHandler.getNum('100/12lbs'));
            });
            test('should correctly read a fractional input with a decimal', () => {
                assert.approximately(0.04166, 0.00001, convertHandler.getNum('0.5/12gal'));
                assert.equal(5.555, convertHandler.getNum('11.11/2km'));
                assert.equal(200.2, convertHandler.getNum('100.100/0.5lbs'));
            });
            test('should correctly return an error on a double-fraction', () => {
                assert.approximately(0.08333, 0.00001, convertHandler.getNum('0.5/12/0.5gal'));
                assert.equal(2.75, convertHandler.getNum('11/2/2km'));
                assert.equal(1.8, convertHandler.getNum('90/0.5/100lbs'));
            });
            test('should default to a input of 1 when no numerical input is provided', () => {
                assert.equal(1, convertHandler.getNum('km'));
                assert.equal(1, convertHandler.getNum('l'));
                assert.equal(1, convertHandler.getNum('mi'));
            });


            test('should correctly read each valid input unit', () => {
                assert.isString(convertHandler.getUnit('10km'));
                assert.equal('mi', convertHandler.getUnit('22mi'));
            });
        });
    });
});