import EOM_CRUD_Base from './_crud.base.area'

export default class EOM_Tasks extends EOM_CRUD_Base {
  listItems(qs?: Tasks.Payload.ListFilters, failOnStatusCode = true) {
    return cy.request<Array<Tasks.Item>>({
      method: 'GET',
      url: this.restUrl(),
      headers: this.restHeaders(),
      qs,
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
