import EOM_CRUD_Base from './_crud.base.area'

export default class EOM_Labels extends EOM_CRUD_Base {
  listItems(failOnStatusCode = true) {
    return cy.request<Array<Labels.Item>>({
      method: 'GET',
      url: this.restUrl(),
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
