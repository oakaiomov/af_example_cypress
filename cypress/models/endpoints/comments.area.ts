import EOM_CRUD_Base from './_crud.base.area'

export default class EOM_Comments extends EOM_CRUD_Base {
  listItems(qs: Comments.Payload.ListFilter, failOnStatusCode = true) {
    return cy.request<Array<Comments.Item>>({
      method: 'GET',
      url: this.restUrl(),
      headers: this.restHeaders(),
      qs,
      failOnStatusCode
    })
  }
}
