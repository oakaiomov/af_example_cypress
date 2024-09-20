import EOM_Base from './_base.area'

export default class EOM_Tasks extends EOM_Base {
  listItems(qs?: Tasks.Payload.ListFilters, failOnStatusCode = true) {
    return cy.request<Array<Tasks.Item>>({
      method: 'GET',
      url: this.restUrl(),
      headers: this.restHeaders(),
      qs,
      failOnStatusCode
    })
  }

  createItem(body: Tasks.Payload.Create, failOnStatusCode = true) {
    return cy.request<Tasks.Item>({
      method: 'POST',
      url: this.restUrl(),
      headers: this.restHeaders(),
      failOnStatusCode,
      body
    })
  }

  getItem(id: string, failOnStatusCode = true) {
    return cy.request<Tasks.Item>({
      method: 'GET',
      url: this.restUrl(`/${id}`),
      headers: this.restHeaders(),
      failOnStatusCode
    })
  }

  updateItem(id: string, body: Tasks.Payload.Update, failOnStatusCode = true) {
    return cy.request<Tasks.Item>({
      method: 'POST',
      url: this.restUrl(`/${id}`),
      headers: this.restHeaders(),
      failOnStatusCode,
      body
    })
  }

  deleteItem(id: string, failOnStatusCode = true) {
    return cy.request<Tasks.Item>({
      method: 'DELETE',
      url: this.restUrl(`/${id}`),
      headers: this.restHeaders(),
      failOnStatusCode
    })
  }

  closeItem(id: string, failOnStatusCode = true) {
    return cy.request({
      method: 'POST',
      url: this.restUrl(`/${id}/close`),
      headers: this.restHeaders(),
      failOnStatusCode
    })
  }

  reopenItem(id: string, failOnStatusCode = true) {
    return cy.request({
      method: 'POST',
      url: this.restUrl(`/${id}/reopen`),
      headers: this.restHeaders(),
      failOnStatusCode
    })
  }
}
