import EOM_Base from './_base.area'

export default abstract class EOM_CRUD_Base extends EOM_Base {
  createItem<ITEM, CREATE extends Cypress.RequestBody>(body: CREATE, failOnStatusCode = true) {
    return cy.request<ITEM>({
      method: 'POST',
      url: this.restUrl(),
      headers: this.restHeaders(),
      failOnStatusCode,
      body
    })
  }

  getItem<ITEM>(id: string, failOnStatusCode = true) {
    return cy.request<ITEM>({
      method: 'GET',
      url: this.restUrl(`/${id}`),
      headers: this.restHeaders(),
      failOnStatusCode
    })
  }

  updateItem<ITEM, UPDATE extends Cypress.RequestBody>(
    id: string,
    body: UPDATE,
    failOnStatusCode = true
  ) {
    return cy.request<ITEM>({
      method: 'POST',
      url: this.restUrl(`/${id}`),
      headers: this.restHeaders(),
      failOnStatusCode,
      body
    })
  }

  deleteItem(id: string, failOnStatusCode = true) {
    return cy.request<''>({
      method: 'DELETE',
      url: this.restUrl(`/${id}`),
      headers: this.restHeaders(),
      failOnStatusCode
    })
  }

  deleteList(ids: string[]) {
    if (ids.length) return this.deleteItem(ids.shift()).then(() => this.deleteList(ids))
  }
}
