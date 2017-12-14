/* eslint-disable */
const { chai, expect, should, chaiHttp, api } = require('../config.js')

describe('Yo', () => {
  let app = require('../../build/app').default;

  before(() => {
    app.server.start(function (err) {
      if (err) {
        throw err;
      }
    });
  })

  it('#should return a 200 response', (done) => {
    api.get('/health-check').end((err, res) => {
      expect(err).to.be.null
      expect(res).to.have.status(200)
      done()
    })
  })

  it('#should return Yo', (done) => {
    api.get('/health-check').end((err, res) => {
      expect(err).to.be.null
      expect(res.text).to.equal('Yo')
      done()
    })
  })

  after(() => {
    app.server.stop()
  })
})
