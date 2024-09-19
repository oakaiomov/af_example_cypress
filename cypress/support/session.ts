export default function sessionUtil() {
  beforeEach('SESSION: Initialize', () => {
    if (!globalThis.session || !globalThis.session.email) {
      globalThis.session = { name: data('user').suffix() }
      globalThis.session.email = data('user').email(globalThis.session.name)
    }

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
  })

  after('SESSION: Remove account', () => {
    if (globalThis.session && globalThis.session.password) {
      return cy
        .api('user')
        .delete(data('user').delete(globalThis.session.password))
        .then($response => {
          expect($response.body).to.have.property('success').that.eq('user deleted')
        })
    }
  })
}
