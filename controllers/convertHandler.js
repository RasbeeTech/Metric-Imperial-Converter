function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
    let letters = /^[A-Za-z]+$/;

    // check input for spaces.
    if(input.includes(" ")) return "invalid number";

    // Gets number by splitting the input. and evaluating result.
    let index = input.split("").findIndex((s) => letters.test(s));
    result = input.slice(0, index);
    
    // if no input is given, default is 1.
    if(result.length == 0) {
      result = 1;
    } else {
      // check if input is valid.
      if(!/^[0-9./]+$/.test(result)){
        return 'invalid number';
      }
    }
    // If input is valid, evaluate.
    try {
      result = eval(result);
    } catch(e){
      return 'invalid number';
    }

    return result.toFixed(5);
  };
  
  this.getUnit = function(input) {
    let result;
    let letters = /^[A-Za-z]+$/;

    // Gets unit by splitting the input. and evaluating result.
    let index = input.split("").findIndex((s) => letters.test(s));
    result = input.slice(index);

    // Check unit is valid.
    if(!letters.test(result)){
      return 'invalid unit';
    }

    // Convert liter unit from 'l' to 'L'.
    result = result !== "l" ? result : "L";

    // Checks for invalid units.
    if(!['km', 'L', 'kg', 'mi', 'gal', 'lbs'].includes(result)){
      return "invalid unit";
    }

    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;

    if(initUnit.toLowerCase() == "gal") result = "L";
    else if(initUnit.toLowerCase() == "lbs") result = "kg";
    else if(initUnit.toLowerCase() == "mi") result = "km";
    else if(initUnit.toUpperCase() == "L") result = "gal";
    else if(initUnit.toLowerCase() == "kg") result = "lbs";
    else if(initUnit.toLowerCase() == "km") result = "mi";
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    if(unit.toLowerCase() == 'gal') result = "gallons";
    if(unit.toLowerCase() == 'lbs') result = "pounds";
    if(unit.toLowerCase() == 'mi') result = "miles";
    if(unit.toUpperCase() == 'L') result = "liters";
    if(unit.toLowerCase() == 'kg') result = "kilograms";
    if(unit.toLowerCase() == 'km') result = "kilometers";
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch(initUnit.toLowerCase()){
      case "gal":
        return (initNum * galToL).toFixed(5);
        break;
      case "lbs":
        return (initNum * lbsToKg).toFixed(5);
        break;
      case "mi":
        return (initNum * miToKm).toFixed(5);
        break;
      case "l":
        return (initNum / galToL).toFixed(5);
        break;
      case "kg":
        return (initNum / lbsToKg).toFixed(5);
        break;
      case "km":
        return (initNum / miToKm).toFixed(5);
        break;
    }

    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    let fromUnit = this.spellOutUnit(initUnit);
    let toUnit = this.spellOutUnit(returnUnit)
    result = [initNum, fromUnit, "converts to", returnNum, toUnit].join(" ");
    //result = String(initNum) + initUnit + " converts to " + String(returnNum) + returnUnit;
    return result;
  };
  
}

module.exports = ConvertHandler;
