import EOM_CRUD_Base from './_crud.base.area'

export default class EOM_Projects extends EOM_CRUD_Base {
  listItems(failOnStatusCode = true) {
    return cy.request<Array<Projects.Item>>({
      method: 'GET',
      url: this.restUrl(),
      headers: this.restHeaders(),
      failOnStatusCode
    })
  }

  getCollaborators(id: string, failOnStatusCode = true) {
    return cy.request<Array<Projects.Collaborator>>({
      method: 'GET',
      url: this.restUrl(`/${id}/collaborators`),
      headers: this.restHeaders(),
      failOnStatusCode
    })
  }
}
