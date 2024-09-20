import EOM_Base from './_base.area'

export default class EOM_Projects extends EOM_Base {
  listItems(failOnStatusCode = true) {
    return cy.request<Array<Projects.Item>>({
      method: 'GET',
      url: this.restUrl(),
      headers: this.restHeaders(),
      failOnStatusCode
    })
  }

  createItem(body: Projects.Payload.Create, failOnStatusCode = true) {
    return cy.request<Projects.Item>({
      method: 'POST',
      url: this.restUrl(),
      headers: this.restHeaders(),
      failOnStatusCode,
      body
    })
  }

  getItem(id: string, failOnStatusCode = true) {
    return cy.request<Projects.Item>({
      method: 'GET',
      url: this.restUrl(`/${id}`),
      headers: this.restHeaders(),
      failOnStatusCode
    })
  }

  updateItem(id: string, body: Projects.Payload.Update, failOnStatusCode = true) {
    return cy.request<Projects.Item>({
      method: 'POST',
      url: this.restUrl(`/${id}`),
      headers: this.restHeaders(),
      failOnStatusCode,
      body
    })
  }

  deleteItem(id: string, failOnStatusCode = true) {
    return cy.request<Projects.Item>({
      method: 'DELETE',
      url: this.restUrl(`/${id}`),
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
