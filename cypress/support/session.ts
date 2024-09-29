export default function sessionUtil() {
  before('SESSION: Initialize', () => {
    if (!globalThis.session || !globalThis.session.email) {
      globalThis.session = { name: data('user').suffix() }
      globalThis.session.email = data('user').email(globalThis.session.name)
    }
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
