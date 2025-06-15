const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  test("convertHandler should correctly read a whole number input.", function (done) {
    let input = "32L";
    assert.equal(convertHandler.getNum(input), 32);
    done();
  });

  test("convertHandler should correctly read a decimal number input.", function (done) {
    let input = "3.5L";
    assert.equal(convertHandler.getNum(input), 3.5);
    done();
  });
  test("convertHandler should correctly read a fractional input.", function (done) {
    let input = "1/2L";
    assert.equal(convertHandler.getNum(input), 0.5);
    done();
  });
  test("convertHandler should correctly read a fractional input with a decimal.", function (done) {
    let input = "1.5/2L";
    assert.equal(convertHandler.getNum(input), 0.75);
    done();
  });
  test("convertHandler should correctly return an error on a double-fraction input.", function (done) {
    let input = "1/2/3L";
    assert.equal(convertHandler.getNum(input), undefined);
    done();
  });
  test("convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.", function (done) {
    let input = "L";
    assert.equal(convertHandler.getNum(input), 1);
    done();
  });

  test("convertHandler should correctly read each valid input unit.", function (done) {
    let input = "32l";
    assert.equal(convertHandler.getUnit(input), "L");
    input = "3.5gal";
    assert.equal(convertHandler.getUnit(input), "gal");
    input = "1/2lbs";
    assert.equal(convertHandler.getUnit(input), "lbs");
    input = "1.5/2mi";
    assert.equal(convertHandler.getUnit(input), "mi");
    input = "KM";
    assert.equal(convertHandler.getUnit(input), "km");
    input = "kg";
    assert.equal(convertHandler.getUnit(input), "kg");
    done();
  });

  test("convertHandler should correctly return an error for an invalid input unit.", function (done) {
    let input = "32";
    assert.equal(convertHandler.getUnit(input), undefined);
    done();
  });

  test("convertHandler should return the correct return unit for each valid input unit.", function (done) {
    assert.equal(convertHandler.getReturnUnit("l"), "gal");
    assert.equal(convertHandler.getReturnUnit("L"), "gal");
    assert.equal(convertHandler.getReturnUnit("gal"), "L");
    assert.equal(convertHandler.getReturnUnit("mi"), "km");
    assert.equal(convertHandler.getReturnUnit("km"), "mi");
    assert.equal(convertHandler.getReturnUnit("lbs"), "kg");
    assert.equal(convertHandler.getReturnUnit("kg"), "lbs");
    done();
  });

  test("convertHandler should correctly return the spelled-out string unit for each valid input unit.", function (done) {
    assert.equal(convertHandler.spellOutUnit("L"), "liters");
    assert.equal(convertHandler.spellOutUnit("gal"), "gallons");
    assert.equal(convertHandler.spellOutUnit("mi"), "miles");
    assert.equal(convertHandler.spellOutUnit("km"), "kilometers");
    assert.equal(convertHandler.spellOutUnit("lbs"), "pounds");
    assert.equal(convertHandler.spellOutUnit("kg"), "kilograms");
    done();
  });

  test("convertHandler should correctly convert gal to L.", function (done) {
    assert.approximately(convertHandler.convert(1, "gal"), 3.78541, 0.00001);
    done();
  });
  test("convertHandler should correctly convert L to gal.", function (done) {
    assert.approximately(convertHandler.convert(1, "l"), 0.264172, 0.00001);
    assert.approximately(convertHandler.convert(1, "L"), 0.264172, 0.00001);
    done();
  });
  test("convertHandler should correctly convert mi to km.", function (done) {
    assert.approximately(convertHandler.convert(1, "mi"), 1.60934, 0.00001);
    done();
  });
  test("convertHandler should correctly convert km to mi.", function (done) {
    assert.approximately(convertHandler.convert(1, "km"), 0.621371, 0.00001);
    done();
  });
  test("convertHandler should correctly convert lbs to kg.", function (done) {
    assert.approximately(convertHandler.convert(1, "lbs"), 0.453592, 0.00001);
    done();
  });
  test("convertHandler should correctly convert kg to lbs.", function (done) {
    assert.approximately(convertHandler.convert(1, "kg"), 2.20462, 0.00001);
    done();
  });
});
