import EOM_Base from './_base.area'

export default class EOM_Sync extends EOM_Base {
  sync() {
    return cy.request({
      method: 'GET',
      url: this.url(''),
      headers: this.headers()
    })
  }
}
