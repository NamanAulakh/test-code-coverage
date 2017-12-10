const routes = [].concat([
  {
    method: 'GET',
    path: '/health-check',
    handler: (request, reply) => reply('Yo'),
  },
])

export default routes
