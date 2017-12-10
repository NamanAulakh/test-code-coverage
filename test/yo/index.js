/* eslint-disable */
const { chai, expect, should, chaiHttp, api } = require('../config.js')

describe('Yo', () => {
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
})
