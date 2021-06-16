const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    suite("Integration tests with chai-http", function () {
        test('1. Convert a valid input such as 10L:',() => {
            chai.request(server)
                .get('/api/convert?input=10L')
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.type, 'application/json');
                    assert.equal(10, res.body.initNum);
                    assert.equal('L', res.body.initUnit);
                    assert.equal(2.64172, res.body.returnNum);
                    assert.equal('gal', res.body.returnUnit);
                    assert.equal('10 liters converts to 2.64172 gallons', res.body.string);
                });
        });
        test('2. Convert an invalid input such as 32g', () => {
            chai.request(server)
                .get('/api/convert?input=32g')
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.type, 'text/html');
                    assert.equal(res.text, 'invalid unit');
                });
        });
        test('3. Convert an invalid number such as 3/7.2/4kg', () => {
            chai.request(server)
                .get('/api/convert?input=3/7.2/4kg')
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.type, 'text/html');
                    assert.equal(res.text, 'invalid number');
                });
        });
        test('4. Convert an invalid number AND unit such as 3/7.2/4kilomegagram', () => {
            chai.request(server)
                .get('/api/convert?input=3/7.2/4kilomegagram')
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.type, 'text/html');
                    assert.equal(res.text, 'invalid number and unit');
                });
        });
        test('5. Convert with no number such as kg', () => {
            chai.request(server)
                .get('/api/convert?input=kg')
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.type, 'application/json');
                    assert.equal(res.body.initNum, 1);
                });
        });
    });
});
