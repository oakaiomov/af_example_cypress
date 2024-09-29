import API_CRUD_TESTS from './_crud.dynamic'

describe('[API] Personal Labels', () => {
  beforeEach('SESSION', () => cy.api('user').authSession())

  it('Get all personal labels', () => {
    let labelID

    cy.api('labels')
      .createItem<Labels.Item, Labels.Payload.Create>(data('entity').label())
      .then($response => (labelID = $response.body.id))

      .api('labels')
      .listItems()
      .then($response => {
        expect($response.body).to.be.an('Array')

        expect($response.body.map($label => $label.id)).to.include(labelID)

        return cy.api('labels').deleteItem(labelID)
      })
  })

  API_CRUD_TESTS<Labels.Item, Labels.Payload.Create, Labels.Payload.Update>({
    entity: 'label',
    createMin: () => {
      return { name: data('entity').dataGen().nameStr() }
    },
    createFull: () => data('entity').label(),
    updateFull: () => data('entity').label(),

    validateItem(payload: Partial<Labels.Payload.Create>, response) {
      if (payload.name) expect(response.body).to.have.property('name').that.eq(payload.name)
      if (payload.order) expect(response.body).to.have.property('order').that.eq(payload.order)
      if (payload.color) expect(response.body).to.have.property('color').that.eq(payload.color)
      if (payload.is_favorite)
        expect(response.body).to.have.property('is_favorite').that.eq(payload.is_favorite)
    },

    messages: {
      invalidID: {
        get: 'Label not found',
        update: 'label_id is invalid',
        delete: 'Label not found'
      }
    },

    additionalCreateTests() {
      it('Without required name', () => {
        const payload = data('entity').label()
        delete payload.name

        return cy
          .api('labels')
          .createItem(payload, false)
          .then($response => expect($response).to.be.missingArgumentResponse('name'))
      })
    }
  })
})
