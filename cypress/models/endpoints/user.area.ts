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

  authSession() {
    return cy.session(
      globalThis.session.name,
      () => {
        const user = data('user').register(globalThis.session.email)
        globalThis.session.password = user.password

        return cy
          .api('user')
          .register(user)
          .then($response => {
            expect($response.body).to.have.property('email').that.eq(globalThis.session.email)
            expect($response.body).to.have.property('token')

            globalThis.session.token = $response.body.token
          })
      },
      {
        validate: () => {
          cy.api('sync').sync()
        }
      }
    )
  }
}
