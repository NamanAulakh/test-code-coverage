// @flow
import Hapi from 'hapi'

import routes from './routes'

const port: mixed = process.env.PORT || 3000
const host: string = process.env.HOST || '0.0.0.0'

class App {
  server: any

  constructor() {
    this.setupServer()
  }

  setupServer() {
    this.server = new Hapi.Server()
    this.server.connection({ port, host })
    this.server.route(routes)
  }
}

export default new App()
