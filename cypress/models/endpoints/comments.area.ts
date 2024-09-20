import EOM_Base from './_base.area'

export default class EOM_Comments extends EOM_Base {
  listItems(qs: Comments.Payload.ListFilter, failOnStatusCode = true) {
    return cy.request<Array<Comments.Item>>({
      method: 'GET',
      url: this.restUrl(),
      headers: this.restHeaders(),
      qs,
      failOnStatusCode
    })
  }

  createItem(body: Comments.Payload.Create, failOnStatusCode = true) {
    return cy.request<Comments.Item>({
      method: 'POST',
      url: this.restUrl(),
      headers: this.restHeaders(),
      failOnStatusCode,
      body
    })
  }

  getItem(id: string, failOnStatusCode = true) {
    return cy.request<Comments.Item>({
      method: 'GET',
      url: this.restUrl(`/${id}`),
      headers: this.restHeaders(),
      failOnStatusCode
    })
  }

  updateItem(id: string, body: Comments.Payload.Update, failOnStatusCode = true) {
    return cy.request<Comments.Item>({
      method: 'POST',
      url: this.restUrl(`/${id}`),
      headers: this.restHeaders(),
      failOnStatusCode,
      body
    })
  }

  deleteItem(id: string, failOnStatusCode = true) {
    return cy.request<Comments.Item>({
      method: 'DELETE',
      url: this.restUrl(`/${id}`),
      headers: this.restHeaders(),
      failOnStatusCode
    })
  }
}
