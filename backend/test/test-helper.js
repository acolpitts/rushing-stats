process.env.NODE_ENV = "test";

const chai = require("chai");
const should = chai.should();
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

const server = require("../server");

module.exports = function () {
  this.chai = chai;
  this.should = should;
  this.chaiHttp = chaiHttp;
  this.server = server;
};
