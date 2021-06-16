'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();
  app.route('/api/convert?').get((req, res) => {
    let { input } = req.query;

    let num = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);

    if(num === 'invalid number' && initUnit === 'invalid unit'){
      res.send('invalid number and unit');
    } else if(num === 'invalid number') {
      res.send('invalid number');
    }else if(initUnit === 'invalid unit') {
      res.send('invalid unit');
    } else {
      let returnUnit = convertHandler.getReturnUnit(initUnit);
      let returnNum = convertHandler.convert(num, initUnit);
      let toString = convertHandler.getString(num, initUnit, returnNum, returnUnit);

      res.json({
        initNum: Number(num),
        initUnit: initUnit,
        returnNum: Number(returnNum),
        returnUnit: returnUnit,
        string: toString
      });
    }
  });

};
