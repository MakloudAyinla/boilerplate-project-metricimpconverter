function ConvertHandler() {
  this.getNum = function (input) {
    let result;
    // return undefined if double fraction is found
    if (input.match(/\/.*\//)) {
      return undefined;
    }

    // if no number is found, default to 1
    if (!input.match(/\d/)) {
      return 1;
    }

    const numMatch = input.match(/\d*\.?\d*(\/[1-9]\d*\.?\d*)?/);

    if (numMatch) {
      const val = numMatch[0];
      if (val.includes("/")) {
        const [numerator, denominator] = val.split("/");
        result = parseFloat(numerator) / parseFloat(denominator);
      } else {
        result = parseFloat(val);
      }
    }
    return result;
  };

  this.getUnit = function (input) {
    let result;
    const validUnits = ["gal", "l", "mi", "km", "lbs", "kg"];

    const unitMatch = input.match(/([a-z]+)$/i);
    if (unitMatch) {
      const unit = unitMatch[0].toLowerCase();
      if (validUnits.includes(unit)) {
        result = unit === "l" ? "L" : unit;
      } else {
        result = undefined;
      }
    }
    return result;
  };

  this.getReturnUnit = function (initUnit) {
    let result;

    const unitMap = {
      gal: "L",
      L: "gal",
      l: "gal",
      mi: "km",
      km: "mi",
      lbs: "kg",
      kg: "lbs",
    };
    if (unitMap[initUnit]) {
      result = unitMap[initUnit];
    } else {
      result = undefined;
    }

    return result;
  };

  this.spellOutUnit = function (unit) {
    let result;

    const unitMap = {
      gal: "gallons",
      L: "liters",
      l: "liters",
      mi: "miles",
      km: "kilometers",
      lbs: "pounds",
      kg: "kilograms",
    };
    if (unitMap[unit]) {
      result = unitMap[unit];
    } else {
      result = undefined;
    }

    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    const unit = initUnit.toLowerCase() === "l" ? "L" : initUnit;

    switch (unit) {
      case "gal":
        result = initNum * galToL;
        break;
      case "L":
        result = initNum / galToL;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "km":
        result = initNum / miToKm;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      default:
        result = undefined;
    }

    return Number(result.toFixed(5));
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result;

    const initUnitSpelled = this.spellOutUnit(initUnit);
    const returnUnitSpelled = this.spellOutUnit(returnUnit);
    if (
      initNum === undefined ||
      initUnit === undefined ||
      returnNum === undefined ||
      returnUnit === undefined
    ) {
      result = "Invalid input";
    } else {
      result = `${initNum} ${initUnitSpelled} converts to ${returnNum} ${returnUnitSpelled}`;
    }
    return result;
  };
}

module.exports = ConvertHandler;
