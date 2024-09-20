import EOM_Base from './_base.area'

export default class EOM_Sections extends EOM_Base {
  listItems(project_id?: string, failOnStatusCode = true) {
    return cy.request<Array<Sections.Item>>({
      method: 'GET',
      url: this.restUrl(),
      headers: this.restHeaders(),
      qs: { project_id },
      failOnStatusCode
    })
  }

  createItem(body: Sections.Payload.Create, failOnStatusCode = true) {
    return cy.request<Sections.Item>({
      method: 'POST',
      url: this.restUrl(),
      headers: this.restHeaders(),
      failOnStatusCode,
      body
    })
  }

  getItem(id: string, failOnStatusCode = true) {
    return cy.request<Sections.Item>({
      method: 'GET',
      url: this.restUrl(`/${id}`),
      headers: this.restHeaders(),
      failOnStatusCode
    })
  }

  updateItem(id: string, body: Sections.Payload.Update, failOnStatusCode = true) {
    return cy.request<Sections.Item>({
      method: 'POST',
      url: this.restUrl(`/${id}`),
      headers: this.restHeaders(),
      failOnStatusCode,
      body
    })
  }

  deleteItem(id: string, failOnStatusCode = true) {
    return cy.request<Sections.Item>({
      method: 'DELETE',
      url: this.restUrl(`/${id}`),
      headers: this.restHeaders(),
      failOnStatusCode
    })
  }
}
