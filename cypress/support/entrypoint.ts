import dataFactory from '../models/data/_factory'
import endpointsFactory from '../models/endpoints/_factory'

import sessionUtil from './session'

globalThis.data = dataFactory
endpointsFactory()

beforeEach('REQUESTS: Bypass', () => {
  cy.intercept('POST', 'https://region1.google-analytics.com/**', { log: false })
  cy.intercept('GET', 'https://todoist.b-cdn.net/*', { log: false })
})

sessionUtil()
