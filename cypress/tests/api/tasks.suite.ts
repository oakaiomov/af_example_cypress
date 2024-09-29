import API_CRUD_TESTS from './_crud.dynamic'

describe('[API] Tasks', () => {
  beforeEach('SESSION', () => cy.api('user').authSession())

  context('Get active tasks', () => {
    let project1ID, project2ID, sectionID
    let taskProjectID, taskSectionID, taskLabelID
    const label = 'test'
    before('Create depended entities', () =>
      cy
        .api('user')
        .authSession()

        .api('projects')
        .createItem<Projects.Item, Projects.Payload.Create>(data('entity').project())
        .then($response => (project1ID = $response.body.id))

        .api('projects')
        .createItem<Projects.Item, Projects.Payload.Create>(data('entity').project())
        .then($response => (project2ID = $response.body.id))

        .then(() =>
          cy
            .api('sections')
            .createItem<Sections.Item, Sections.Payload.Create>(data('entity').section(project2ID))
            .then($response => (sectionID = $response.body.id))
        )

        .then(() =>
          cy
            .api('tasks')
            .createItem<Tasks.Item, Tasks.Payload.Create>(
              data('entity').task({ project: project1ID })
            )
            .then($response => (taskProjectID = $response.body.id))
        )

        .then(() =>
          cy
            .api('tasks')
            .createItem<Tasks.Item, Tasks.Payload.Create>(
              data('entity').task({ section: sectionID })
            )
            .then($response => (taskSectionID = $response.body.id))
        )

        .then(() =>
          cy
            .api('tasks')
            .createItem<Tasks.Item, Tasks.Payload.Create>(data('entity').task(undefined, [label]))
            .then($response => (taskLabelID = $response.body.id))
        )
    )

    after('Remove depended entities', () =>
      cy
        .api('tasks')
        .deleteList([taskLabelID, taskProjectID, taskSectionID])

        .api('sections')
        .deleteItem(sectionID)

        .api('projects')
        .deleteList([project1ID, project2ID])
    )

    it('Without filters', () =>
      cy
        .api('tasks')
        .listItems()
        .then($response => {
          expect($response.body).to.be.an('Array').with.length(3)
          const ids = $response.body.map($item => $item.id)
          expect(ids).to.include(taskLabelID)
          expect(ids).to.include(taskProjectID)
          expect(ids).to.include(taskSectionID)
        }))

    it('For specific project', () =>
      cy
        .api('tasks')
        .listItems({ project_id: project1ID })
        .then($response => {
          expect($response.body).to.be.an('Array').with.length(1)
          expect($response.body[0].id).to.eq(taskProjectID)
        }))

    it('For specific section', () =>
      cy
        .api('tasks')
        .listItems({ section_id: sectionID })
        .then($response => {
          expect($response.body).to.be.an('Array').with.length(1)
          expect($response.body[0].id).to.eq(taskSectionID)
        }))

    it('With specific label', () =>
      cy
        .api('tasks')
        .listItems({ label })
        .then($response => {
          expect($response.body).to.be.an('Array').with.length(1)
          expect($response.body[0].id).to.eq(taskLabelID)
        }))
  })

  API_CRUD_TESTS<Tasks.Item, Tasks.Payload.Create, Tasks.Payload.Update>({
    entity: 'task',
    createMin: () => {
      return { content: data('entity').dataGen().content() }
    },
    createFull: () => data('entity').task(),
    updateFull: () => data('entity').task(),

    validateItem: function (payload: Partial<Tasks.Payload.Create>, response) {
      if (payload.content)
        expect(response.body).to.have.property('content').that.eq(payload.content)
      if (payload.description)
        expect(response.body).to.have.property('description').that.eq(payload.description)
      if (payload.order) expect(response.body).to.have.property('order').that.eq(payload.order)
      if (payload.priority)
        expect(response.body).to.have.property('priority').that.eq(payload.priority)
      if (payload.duration && payload.duration_unit) {
        expect(response.body).to.have.property('duration').that.deep.eq({
          amount: payload.duration,
          unit: payload.duration_unit
        })
      }
      if (payload.parent_id)
        expect(response.body).to.have.property('parent_id').that.eq(payload.parent_id)
      if (payload.project_id)
        expect(response.body).to.have.property('project_id').that.eq(payload.project_id)
      if (payload.section_id)
        expect(response.body).to.have.property('section_id').that.eq(payload.section_id)
    },

    messages: {
      invalidID: {
        get: 'Invalid argument value',
        update: 'task_id is invalid',
        delete: 'Invalid argument value'
      }
    },

    additionalCreateTests(entityIDs) {
      let project1ID, project2ID, sectionID, parentID
      before('Create depended entities', () =>
        cy
          .api('user')
          .authSession()

          .api('projects')
          .createItem<Projects.Item, Projects.Payload.Create>(data('entity').project())
          .then($response => (project1ID = $response.body.id))

          .api('projects')
          .createItem<Projects.Item, Projects.Payload.Create>(data('entity').project())
          .then($response => (project2ID = $response.body.id))

          .then(() =>
            cy
              .api('sections')
              .createItem<Sections.Item, Sections.Payload.Create>(
                data('entity').section(project1ID)
              )
              .then($response => (sectionID = $response.body.id))
          )

          .then(() =>
            cy
              .api('tasks')
              .createItem<Tasks.Item, Tasks.Payload.Create>(
                data('entity').task({ project: project1ID, section: sectionID })
              )
              .then($response => (parentID = $response.body.id))
              .then(() => entityIDs.push(parentID))
          )
      )

      after('Remove depended entities', () =>
        cy
          .api('sections')
          .deleteItem(sectionID)

          .api('projects')
          .deleteList([project1ID, project2ID])
      )

      it('As subtask', () => {
        const payload = data('entity').task({ parent: parentID })

        return cy
          .api('tasks')
          .createItem(payload)
          .then($response => this.validateItem(payload, $response))
      })

      it('In project', () => {
        const payload = data('entity').task({ project: project1ID })

        return cy
          .api('tasks')
          .createItem(payload)
          .then($response => this.validateItem(payload, $response))
      })

      it('In section', () => {
        const payload = data('entity').task({ section: sectionID })

        return cy
          .api('tasks')
          .createItem(payload)
          .then($response => this.validateItem(payload, $response))
      })

      it('Without required arguments', () => {
        const payload = {
          description: 'content missing'
        }

        return cy
          .api('tasks')
          .createItem(payload, false)
          .then($response => {
            expect($response.status).to.eq(400)

            expect($response.body).to.have.property('error').that.eq('Required argument is missing')
            expect($response.body).to.have.property('error_code').that.eq(19)
            expect($response.body).to.have.property('error_tag').that.eq('ARGUMENT_MISSING')
            expect($response.body)
              .to.have.property('error_extra')
              .that.has.property('argument')
              .that.eq('content')
          })
      })

      it('Without duration unit', () => {
        const payload = data('entity').task({ section: sectionID })
        payload.duration_unit = undefined

        return cy
          .api('tasks')
          .createItem(payload, false)
          .then($response => {
            expect($response.status).to.eq(400)
            expect($response.body).to.eq('Item duration unit is missing')
          })
      })

      // DEFECT: Task being attached to wrong project instead of error
      // it('In section not related to project', () => {
      //   const payload = data('task').task({ project: project2ID, section: sectionID })

      //   return cy
      //     .api('tasks')
      //     .createItem(payload)
      //     .then($response => this.validateItem(payload, $response))
      // })

      // DEFECT: Priority set to 1 instead of error
      // it('With invalid priority', () => {
      //   const payload = data('task').task({ section: sectionID })
      //   payload.priority = 100

      //   return cy
      //     .api('tasks')
      //     .createItem(payload)
      //     .then($response => this.validateItem(payload, $response))
      // })

      // DEFECT: Datetime due being set instead of error
      // it('With multiple due parameters', () => {
      //   const payload = data('task').task({ section: sectionID })
      //   payload.due_date = '2050-01-01'
      //   payload.due_string = 'Tomorrow'

      //   return cy
      //     .api('tasks')
      //     .createItem(payload)
      //     .then($response => this.validateItem(payload, $response))
      // })
    }
  })
})
