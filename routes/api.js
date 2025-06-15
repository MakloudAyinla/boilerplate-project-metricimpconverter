"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  let convertHandler = new ConvertHandler();
  app.get("/api/convert", function (req, res) {
    const input = req.query.input;
    if (!input) {
      return res.status(400).send("invalid input");
    }

    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);

    if (initNum === undefined && initUnit === undefined) {
      return res.status(400).json("invalid number and unit");
    }
    if (initNum === undefined) {
      return res.status(400).json("invalid number");
    }
    if (initUnit === undefined) {
      return res.status(400).json("invalid unit");
    }

    const returnUnit = convertHandler.getReturnUnit(initUnit);
    if (returnUnit === undefined) {
      return res.status(400).send("invalid input");
    }

    const returnNum = convertHandler.convert(initNum, initUnit);
    const string = convertHandler.getString(
      initNum,
      initUnit,
      returnNum,
      returnUnit
    );

    res.json({
      initNum: initNum,
      initUnit: initUnit,
      returnNum: returnNum,
      returnUnit: returnUnit,
      string: string,
    });
  });
};
