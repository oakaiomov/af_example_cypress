import API_CRUD_TESTS from './_crud.dynamic'

describe('[API] Sections', () => {
  beforeEach('SESSION', () => cy.api('user').authSession())

  const project = data('entity').project()
  let projectID: string

  before('Create project', () =>
    cy
      .api('user')
      .authSession()

      .api('projects')
      .createItem<Projects.Item, Projects.Payload.Create>(project)
      .then($response => (projectID = $response.body.id))
  )

  after('Remove project', () => cy.api('projects').deleteItem(projectID))

  context('Get all sections', () => {
    let project2ID: string

    let section1: Sections.Payload.Create
    let section2: Sections.Payload.Create

    const sectionIDs: string[] = []

    before('Create Sections', () =>
      cy
        .api('user')
        .authSession()

        .api('projects')
        .createItem<Projects.Item, Projects.Payload.Create>(data('entity').project())
        .then($response => {
          project2ID = $response.body.id

          section1 = data('entity').section(projectID)
          section2 = data('entity').section(project2ID)

          return cy
            .api('sections')
            .createItem<Sections.Item, Sections.Payload.Create>(section1)
            .then($response => sectionIDs.push($response.body.id))

            .api('sections')
            .createItem<Sections.Item, Sections.Payload.Create>(section2)
            .then($response => sectionIDs.push($response.body.id))
        })
    )

    after('Remove sections', () => cy.api('sections').deleteList(sectionIDs))
    after('Remove project', () => cy.api('projects').deleteItem(project2ID))

    it('For all projects', () => {
      cy.api('sections')
        .listItems()
        .then($response => {
          expect($response.body).to.be.an('Array').with.length(2)
        })
    })
  })

  API_CRUD_TESTS<Sections.Item, Sections.Payload.Create, Sections.Payload.Update>({
    entity: 'section',
    createMin: () => {
      return { name: data('entity').dataGen().nameStr(), project_id: projectID }
    },
    createFull: () => data('entity').section(projectID),
    updateFull: () => data('entity').section(projectID),

    validateItem(payload: Partial<Sections.Payload.Create>, response) {
      if (payload.name) expect(response.body).to.have.property('name').that.eq(payload.name)
      if (payload.order) expect(response.body).to.have.property('order').that.eq(payload.order)
      if (payload.project_id)
        expect(response.body).to.have.property('project_id').that.eq(payload.project_id)
    },

    messages: {
      invalidID: {
        get: 'Invalid argument value',
        update: 'section_id is invalid',
        delete: 'Invalid argument value'
      }
    },

    additionalCreateTests() {
      it('With invalid project_id', () => {
        const payload = data('entity').section('invalid')

        return cy
          .api('sections')
          .createItem(payload, false)
          .then($response => expect($response).to.be.erroredResponse('project_id is invalid'))
      })

      it('Without project_id', () => {
        const payload = data('entity').section('invalid')
        delete payload.project_id

        return cy
          .api('sections')
          .createItem(payload, false)
          .then($response => expect($response).to.be.missingArgumentResponse('project_id'))
      })

      it('Without name', () => {
        const payload = data('entity').section(projectID)
        delete payload.name

        return cy
          .api('sections')
          .createItem(payload, false)
          .then($response => expect($response).to.be.missingArgumentResponse('name'))
      })
    }
  })
})
