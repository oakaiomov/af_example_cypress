import dataFactory from '../models/data/_factory'
import endpointsFactory from '../models/endpoints/_factory'
import assertions from './assertions'

import sessionUtil from './session'

globalThis.data = dataFactory
endpointsFactory()
chai.use(assertions)

beforeEach('REQUESTS: Bypass', () => {
  cy.intercept('POST', 'https://region1.google-analytics.com/**', { log: false })
  cy.intercept('GET', 'https://todoist.b-cdn.net/*', { log: false })
})

sessionUtil()
