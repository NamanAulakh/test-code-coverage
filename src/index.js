// @flow
/* eslint-disable */
require('babel-polyfill')

const app = require('./app').default

app.server.start((err) => {
  if (err) {
    throw err
  }
  console.log(`Server running at: ${app.server.info.uri}`)
})
