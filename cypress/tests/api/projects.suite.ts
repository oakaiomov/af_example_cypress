import API_CRUD_TESTS from './_crud.dynamic'

describe('[API] Projects', () => {
  beforeEach('SESSION', () => cy.api('user').authSession())

  context('Get all projects', () => {
    const project1 = data('entity').project()
    const project2 = data('entity').project()
    const projectIDs: string[] = []

    before('Create projects', () =>
      cy
        .api('user')
        .authSession()

        .api('projects')
        .createItem<Projects.Item, Projects.Payload.Create>(project1)
        .then($response => projectIDs.push($response.body.id))

        .api('projects')
        .createItem<Projects.Item, Projects.Payload.Create>(project2)
        .then($response => projectIDs.push($response.body.id))
    )

    after('Remove projects', () => cy.api('projects').deleteList(projectIDs))

    it('Returns projects properly', () =>
      cy
        .api('projects')
        .listItems()
        .then($response => {
          ;[project1, project2].forEach($proj => {
            const proj = $response.body.find($p => $p.name == $proj.name)

            expect(proj).to.not.eq(undefined)
            expect(proj.color).to.eq($proj.color)
            expect(proj.is_favorite).to.eq($proj.is_favorite)
            expect(proj.view_style).to.eq($proj.view_style)
          })
        }))
  })

  API_CRUD_TESTS<Projects.Item, Projects.Payload.Create, Projects.Payload.Update>({
    entity: 'project',
    createMin: () => {
      return { name: data('entity').dataGen().nameStr() }
    },
    createFull: () => data('entity').project(),
    updateFull: () => data('entity').project(),

    validateItem(payload, response) {
      if (payload.name) expect(response.body).to.have.property('name').that.eq(payload.name)
      if (payload.color) expect(response.body).to.have.property('color').that.eq(payload.color)
      if (payload.is_favorite)
        expect(response.body).to.have.property('is_favorite').that.eq(payload.is_favorite)
      if (payload.view_style)
        expect(response.body).to.have.property('view_style').that.eq(payload.view_style)

      expect(response.body).to.have.property('comment_count').that.eq(0)
      expect(response.body).to.have.property('is_inbox_project').that.eq(false)
      expect(response.body).to.have.property('is_shared').that.eq(false)
      expect(response.body).to.have.property('is_team_inbox').that.eq(false)
      expect(response.body)
        .to.have.property('url')
        .that.eq(`https://todoist.com/showProject?id=${response.body.id}`)
    },

    messages: {
      invalidID: {
        update: 'Invalid argument value',
        delete: 'Invalid argument value',
        get: 'Invalid argument value'
      }
    },

    additionalCreateTests(entityIDs) {
      let parentID: string
      before('Create parent project', () =>
        cy
          .api('user')
          .authSession()
          .api('projects')
          .createItem<Projects.Item, Projects.Payload.Create>(data('entity').project())
          .then($response => (parentID = $response.body.id))
          .then(() => entityIDs.push(parentID))
      )
      it('As subproject', () => {
        const payload = data('entity').project(parentID)
        cy.api('projects')
          .createItem<Projects.Item, Projects.Payload.Create>(payload)
          .then($response => {
            entityIDs.push($response.body.id)
            this.validateItem(payload, $response)
          })
      })
      it('Without required fields', () => {
        cy.api('projects')
          .createItem({}, false)
          .then($response =>
            expect($response).to.be.erroredResponse(
              'Name must be provided for the project creation'
            )
          )
      })
      it('As subproject for invalid project', () => {
        const payload = data('entity').project('invalid')
        cy.api('projects')
          .createItem(payload, false)
          .then($response => expect($response).to.be.erroredResponse('Invalid argument value'))
      })
      it('With invalid color', () => {
        const payload = data('entity').project(undefined, false, 'invalid')
        cy.api('projects')
          .createItem(payload, false)
          .then($response => expect($response).to.be.erroredResponse('Invalid argument value'))
      })
    },

    additionalUpdateTests(_fromPayload, entityID) {
      it('With invalid color', () => {
        const payload = data('entity').project()
        payload.color = 'invalid'

        cy.api('projects')
          .updateItem(entityID, payload, false)
          .then($response => expect($response).to.be.erroredResponse('Invalid argument value'))
      })
    }
  })

  context('Get all collaborators', () => {
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

    it('With valid ID', () => {
      cy.api('projects')
        .getCollaborators(projectID)
        .then($response => {
          expect($response.body).is.an('Array').with.length(1)

          expect($response.body[0].email).to.eq(session.email)
        })
    })

    it('With invalid ID', () => {
      cy.api('projects')
        .getItem('invalid', false)
        .then($response => expect($response).to.be.erroredResponse('Invalid argument value'))
    })
  })
})
