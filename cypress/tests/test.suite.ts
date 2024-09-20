describe('Example Suite', () => {
  it('Example test', () => {
    let projectID: string
    let sectionID: string
    let labelID: string
    let taskID: string
    let commentID: string
    const labelName = 'test_label'

    cy.api('projects')
      .createItem({
        name: 'test_proj'
      })
      .then($response => (projectID = $response.body.id))

      .then(() =>
        cy
          .api('projects')
          .updateItem(projectID, { name: 'updated_name' })
          .then($response => cy.log('Update project 1', $response.body))
      )

      .then(() =>
        cy
          .api('projects')
          .getItem(projectID)
          .then($response => cy.log('Get project 1', $response.body))
      )

      .then(() =>
        cy
          .api('projects')
          .createItem({
            name: 'test_proj_2'
          })
          .then($response => cy.log('Create project 2', $response.body))
      )

      .then(() =>
        cy
          .api('projects')
          .listItems()
          .then($response => cy.log('Get projects', $response.body))
      )

      .then(() =>
        cy
          .api('projects')
          .getCollaborators(projectID)
          .then($response => cy.log('Get collabs', $response.body))
      )

      .then(() =>
        cy
          .api('sections')
          .createItem({
            name: 'test_section',
            project_id: projectID
          })
          .then($response => (sectionID = $response.body.id))
      )

      .then(() =>
        cy
          .api('sections')
          .updateItem(sectionID, { name: 'updated_test_section' })
          .then($response => cy.log('Update section 1', $response.body))
      )

      .then(() =>
        cy
          .api('sections')
          .getItem(sectionID)
          .then($response => cy.log('Get section 1', $response.body))
      )

      .then(() =>
        cy
          .api('sections')
          .createItem({
            name: 'test_section_2',
            project_id: projectID
          })
          .then($response => cy.log('Create section 2', $response.body))
      )

      .then(() =>
        cy
          .api('sections')
          .listItems()
          .then($response => cy.log('Get sections', $response.body))
      )

      .then(() =>
        cy
          .api('labels')
          .createItem({
            name: 'testing_label'
          })
          .then($response => (labelID = $response.body.id))
      )

      .then(() =>
        cy
          .api('labels')
          .updateItem(labelID, { name: labelName })
          .then($response => cy.log('Update label 1', $response.body))
      )

      .then(() =>
        cy
          .api('labels')
          .getItem(labelID)
          .then($response => cy.log('Get label 1', $response.body))
      )

      .then(() =>
        cy
          .api('labels')
          .createItem({
            name: 'testing_label_2'
          })
          .then($response => cy.log('Create label 2', $response.body))
      )

      .then(() =>
        cy
          .api('labels')
          .listItems()
          .then($response => cy.log('get labels', $response.body))
      )

      .then(() =>
        cy
          .api('tasks')
          .createItem({
            content: 'testing task'
          })
          .then($response => (taskID = $response.body.id))
      )

      .then(() =>
        cy
          .api('tasks')
          .updateItem(taskID, {
            labels: [labelName]
          })
          .then($response => cy.log('Update task 1', $response.body))
      )

      .then(() =>
        cy
          .api('tasks')
          .getItem(taskID)
          .then($response => cy.log('Get task 1', $response.body))
      )

      .then(() =>
        cy
          .api('tasks')
          .createItem({
            content: 'testing task 2',
            project_id: projectID,
            section_id: sectionID
          })
          .then($response => cy.log('Create task 2', $response.body))
      )

      .then(() =>
        cy
          .api('tasks')
          .listItems()
          .then($response => cy.log('Get tasks', $response.body))
      )

      .then(() =>
        cy
          .api('tasks')
          .closeItem(taskID)
          .then($response => cy.log('Close task', $response.body))
      )

      .then(() =>
        cy
          .api('tasks')
          .reopenItem(taskID)
          .then($response => cy.log('Reopen task', $response.body))
      )

      .then(() =>
        cy
          .api('comments')
          .createItem({
            task_id: taskID,
            content: 'test comment'
          })
          .then($response => (commentID = $response.body.id))
      )

      .then(() =>
        cy
          .api('comments')
          .updateItem(commentID, {
            content: 'updated test comment'
          })
          .then($response => cy.log('Update comment 1', $response.body))
      )

      .then(() =>
        cy
          .api('comments')
          .getItem(commentID)
          .then($response => cy.log('Get comment 1', $response.body))
      )

      .then(() =>
        cy
          .api('comments')
          .createItem({
            task_id: taskID,
            content: 'test comment 2'
          })
          .then($response => cy.log('Create comment 2', $response.body))
      )

      .then(() =>
        cy
          .api('comments')
          .listItems({ task_id: taskID })
          .then($response => cy.log('Get comments', $response.body))
      )

      .then(() =>
        cy
          .api('comments')
          .deleteItem(commentID)
          .then($response => cy.log('Delete comment', $response.body))
      )

      .then(() =>
        cy
          .api('tasks')
          .deleteItem(taskID)
          .then($response => cy.log('Delete task', $response.body))
      )

      .then(() =>
        cy
          .api('labels')
          .deleteItem(labelID)
          .then($response => cy.log('Delete label', $response.body))
      )

      .then(() =>
        cy
          .api('sections')
          .deleteItem(sectionID)
          .then($response => cy.log('Delete section', $response.body))
      )

      .then(() =>
        cy
          .api('projects')
          .deleteItem(projectID)
          .then($response => cy.log('Delete project', $response.body))
      )
  })
})
