/* eslint-disable */
var chai = require('chai')
var expect = require('chai').expect
var should = require('chai').should()
var chaiHttp = require('chai-http')
chai.use(chaiHttp)

var api = chai.request('http://0.0.0.0:3000')

module.exports = {
  chai,
  expect,
  should,
  chaiHttp,
  api,
}
