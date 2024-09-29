import API_CRUD_TESTS from './_crud.dynamic'

describe('[API] Comments', () => {
  beforeEach('SESSION', () => cy.api('user').authSession())

  let taskID, projectID

  before('Create task and project', () =>
    cy
      .api('user')
      .authSession()

      .api('tasks')
      .createItem<Tasks.Item, Tasks.Payload.Create>(data('entity').task())
      .then($response => (taskID = $response.body.id))

      .api('projects')
      .createItem<Projects.Item, Projects.Payload.Create>(data('entity').project())
      .then($response => (projectID = $response.body.id))
  )

  after('Remove task and project', () =>
    cy.api('tasks').deleteItem(taskID).api('projects').deleteItem(projectID)
  )

  context('Get all comments', () => {
    let projectCommentID, taskCommentID

    before('Create precondition comments', () =>
      cy
        .api('comments')
        .createItem<Comments.Item, Comments.Payload.Create>(
          data('entity').comment({ project: projectID })
        )
        .then($response => (projectCommentID = $response.body.id))

        .api('comments')
        .createItem<Comments.Item, Comments.Payload.Create>(
          data('entity').comment({ task: taskID })
        )
        .then($response => (taskCommentID = $response.body.id))
    )

    after('Cleanup created comments', () =>
      cy.api('comments').deleteList([projectCommentID, taskCommentID])
    )

    it('Without parameters', () =>
      cy
        .api('comments')
        // @ts-expect-error negative scenario
        .listItems({}, false)
        .then($response => {
          expect($response.status).to.eq(400)
          expect($response.body).to.eq('No id to filter notes provided')
        }))

    it('For project', () =>
      cy
        .api('comments')
        .listItems({ project_id: projectID })
        .then($response => {
          expect($response.body).to.be.an('Array').with.length(1)
          expect($response.body.map($item => $item.id)).to.include(projectCommentID)
        }))

    it('For task', () =>
      cy
        .api('comments')
        .listItems({ task_id: taskID })
        .then($response => {
          expect($response.body).to.be.an('Array').with.length(1)
          expect($response.body.map($item => $item.id)).to.include(taskCommentID)
        }))
  })

  API_CRUD_TESTS<Comments.Item, Comments.Payload.Create, Comments.Payload.Update>({
    entity: 'comment',
    createMin: () => {
      return { content: data('entity').dataGen().content(), task_id: taskID }
    },
    createFull: () => data('entity').comment({ project: projectID }),
    updateFull() {
      return { content: data('entity').dataGen().content() }
    },

    validateItem(payload: Partial<Comments.Payload.Create>, response) {
      if (payload.content)
        expect(response.body).to.have.property('content').that.eq(payload.content)
    },

    messages: {
      invalidID: {
        get: 'Invalid argument value',
        update: 'comment_id is invalid',
        delete: 'Invalid argument value'
      }
    },

    additionalCreateTests(entityIDs) {
      it('Without project_id and task_id', () => {
        const payload = data('entity').comment({})

        return cy
          .api('comments')
          .createItem(payload, false)
          .then($response =>
            expect($response).to.be.erroredResponse('Either task_id or project_id should be set')
          )
      })

      it('With both project_id and task_id', () => {
        const payload = data('entity').comment({ project: projectID, task: taskID })

        return cy
          .api('comments')
          .createItem<Comments.Item, Comments.Payload.Create>(payload, false)
          .then($response => {
            entityIDs.push($response.body.id)

            this.validateItem(payload, $response)
          })
      })

      it('Without content', () => {
        const payload = data('entity').comment({ task: taskID })
        delete payload.content

        return cy
          .api('comments')
          .createItem<Comments.Item, Comments.Payload.Create>(payload, false)
          .then($response => expect($response).to.be.missingArgumentResponse('content'))
      })
    }
  })
})
