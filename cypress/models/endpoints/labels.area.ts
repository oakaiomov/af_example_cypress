import EOM_Base from './_base.area'

export default class EOM_Labels extends EOM_Base {
  listItems(failOnStatusCode = true) {
    return cy.request<Array<Labels.Item>>({
      method: 'GET',
      url: this.restUrl(),
      headers: this.restHeaders(),
      failOnStatusCode
    })
  }

  createItem(body: Labels.Payload.Create, failOnStatusCode = true) {
    return cy.request<Labels.Item>({
      method: 'POST',
      url: this.restUrl(),
      headers: this.restHeaders(),
      failOnStatusCode,
      body
    })
  }

  getItem(id: string, failOnStatusCode = true) {
    return cy.request<Labels.Item>({
      method: 'GET',
      url: this.restUrl(`/${id}`),
      headers: this.restHeaders(),
      failOnStatusCode
    })
  }

  updateItem(id: string, body: Labels.Payload.Update, failOnStatusCode = true) {
    return cy.request<Labels.Item>({
      method: 'POST',
      url: this.restUrl(`/${id}`),
      headers: this.restHeaders(),
      failOnStatusCode,
      body
    })
  }

  deleteItem(id: string, failOnStatusCode = true) {
    return cy.request<Labels.Item>({
      method: 'DELETE',
      url: this.restUrl(`/${id}`),
      headers: this.restHeaders(),
      failOnStatusCode
    })
  }

  listShared(omit_personal?: boolean, failOnStatusCode = true) {
    return cy.request<Array<Labels.Item>>({
      method: 'GET',
      url: this.restUrl('/shared'),
      headers: this.restHeaders(),
      qs: { omit_personal },
      failOnStatusCode
    })
  }

  renameShared(body: Labels.Payload.RenameShared, failOnStatusCode = true) {
    return cy.request({
      method: 'POST',
      url: this.restUrl(`/shared/rename`),
      headers: this.restHeaders(),
      failOnStatusCode,
      body
    })
  }

  removeShared(name: string, failOnStatusCode = true) {
    return cy.request({
      method: 'POST',
      url: this.restUrl(`/shared/remove`),
      headers: this.restHeaders(),
      failOnStatusCode,
      body: { name }
    })
  }
}
