export default function API_CRUD_TESTS<
  ITEM extends { id: string },
  CREATE extends Cypress.RequestBody,
  UPDATE extends Cypress.RequestBody
>(config: {
  entity: API_CRUD.Entities
  createMin: () => CREATE
  createFull: () => CREATE
  updateFull: () => UPDATE
  validateItem: (payload: CREATE | UPDATE, response: Cypress.Response<ITEM>) => void
  additionalCreateTests?: (entityIDs: string[]) => void
  additionalGetTests?: (payload: CREATE, entityID: string) => void
  additionalUpdateTests?: (fromPayload: CREATE, entityID: string) => void
  messages: {
    invalidID: {
      get: string
      update: string
      delete: string
    }
  }
}) {
  const pluralEntity: API_CRUD.Endpoints = `${config.entity}s`

  context(`Create new ${config.entity}`, () => {
    const entityIDs: string[] = []

    after(`Remove ${config.entity}s`, () => cy.api(pluralEntity).deleteList(entityIDs))

    it(`With minimal input`, () => {
      const payload = config.createMin()

      return cy
        .api(pluralEntity)
        .createItem<ITEM, CREATE>(payload)
        .then($response => {
          entityIDs.push($response.body.id)
          config.validateItem(payload, $response)
        })
    })

    it(`With full input`, () => {
      const payload = config.createFull()

      return cy
        .api(pluralEntity)
        .createItem<ITEM, CREATE>(payload)
        .then($response => {
          entityIDs.push($response.body.id)
          config.validateItem(payload, $response)
        })
    })

    if (config.additionalCreateTests) config.additionalCreateTests(entityIDs)
  })

  context(`Get ${config.entity}`, () => {
    let payload: CREATE
    let entityID: string

    before(`Create ${config.entity}`, () => {
      payload = config.createFull()
      return cy
        .api(`user`)
        .authSession()

        .api(pluralEntity)
        .createItem<ITEM, CREATE>(payload)
        .then($response => (entityID = $response.body.id))
    })

    after(`Remove ${config.entity}`, () => cy.api(pluralEntity).deleteItem(entityID))

    it(`With valid ID`, () => {
      return cy
        .api(pluralEntity)
        .getItem<ITEM>(entityID)
        .then($response => config.validateItem(payload, $response))
    })

    it(`With invalid ID`, () => {
      return cy
        .api(pluralEntity)
        .getItem(`invalid`, false)
        .then($response => {
          expect($response.status).to.be.oneOf([400, 404])
          expect($response.body).to.eq(config.messages.invalidID.get)
        })
    })

    if (config.additionalGetTests) config.additionalGetTests(payload, entityID)
  })

  context(`Update ${config.entity}`, () => {
    let fromPayload: CREATE
    let entityID: string

    before(`Create ${config.entity}`, () => {
      fromPayload = config.createFull()
      return cy
        .api(`user`)
        .authSession()

        .api(pluralEntity)
        .createItem<ITEM, CREATE>(fromPayload)
        .then($response => (entityID = $response.body.id))
    })

    after(`Remove ${config.entity}`, () => cy.api(pluralEntity).deleteItem(entityID))

    it(`With all parameters`, () => {
      const payload = config.updateFull()

      return cy
        .api(pluralEntity)
        .updateItem<ITEM, UPDATE>(entityID, payload)
        .then($response => config.validateItem(payload, $response))
    })

    it(`With invalid id`, () => {
      const payload = config.updateFull()

      return cy
        .api(pluralEntity)
        .updateItem<ITEM, UPDATE>(`invalid`, payload, false)
        .then($response => {
          expect($response.status).to.be.oneOf([400, 404])
          expect($response.body).to.eq(config.messages.invalidID.update)
        })
    })

    if (config.additionalUpdateTests) config.additionalUpdateTests(fromPayload, entityID)
  })

  context(`Delete ${config.entity}`, () => {
    let payload: CREATE
    let entityID: string

    before(`Create ${config.entity}`, () => {
      payload = config.createFull()
      return cy
        .api(`user`)
        .authSession()

        .api(pluralEntity)
        .createItem<ITEM, CREATE>(payload)
        .then($response => (entityID = $response.body.id))
    })

    after(`Remove ${config.entity}`, () => cy.api(pluralEntity).deleteItem(entityID))

    it(`With valid ID`, () => {
      return cy
        .api(pluralEntity)
        .deleteItem(entityID)
        .then($response => {
          expect($response.status).to.eq(204)
          expect($response.body).to.be.empty
        })
    })

    it(`With invalid ID`, () => {
      return cy
        .api(pluralEntity)
        .getItem(`invalid`, false)
        .then($response => {
          expect($response.status).to.be.oneOf([400, 404])
          expect($response.body).to.eq(config.messages.invalidID.delete)
        })
    })
  })
}
