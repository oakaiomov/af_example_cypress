import EOM_Base from './_base.area'

export default class EOM_User extends EOM_Base {
  register(body: User.Register.Payload) {
    return cy.request<User.Register.Response>({
      method: 'POST',
      url: this.url('/register'),
      body,
      headers: this.headers()
    })
  }

  delete(body: User.Delete.Payload) {
    return cy.request<User.Delete.Response>({
      method: 'POST',
      url: this.url('/delete'),
      body,
      headers: this.headers()
    })
  }
}
