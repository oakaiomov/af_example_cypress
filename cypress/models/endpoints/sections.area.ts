import EOM_CRUD_Base from './_crud.base.area'

export default class EOM_Sections extends EOM_CRUD_Base {
  listItems(project_id?: string, failOnStatusCode = true) {
    return cy.request<Array<Sections.Item>>({
      method: 'GET',
      url: this.restUrl(),
      headers: this.restHeaders(),
      qs: { project_id },
      failOnStatusCode
    })
  }
}
