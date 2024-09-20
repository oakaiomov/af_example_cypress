export {}

declare global {
  type SessionStorage = {
    name: string
    token?: string
    email?: string
    password?: string
  }

  // eslint-disable-next-line no-var
  var session: SessionStorage
}
