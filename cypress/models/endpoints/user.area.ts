import EOM_Base from './_base.area'

export default class EOM_User extends EOM_Base {
  register(body: User.Register.Payload) {
    return cy.request<User.Register.Response>({
      method: 'POST',
      url: this.sysUrl('/register'),
      body,
      headers: this.sysHeaders()
    })
  }

  delete(body: User.Delete.Payload) {
    return cy.request<User.Delete.Response>({
      method: 'POST',
      url: this.sysUrl('/delete'),
      body,
      headers: this.sysHeaders()
    })
  }
}
