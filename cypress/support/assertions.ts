// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function assertions(chai: Chai.ChaiStatic, utils: Chai.ChaiUtils) {
  chai.Assertion.addMethod('erroredResponse', function (message: string) {
    expect(this._obj.status).to.be.oneOf([400, 404])

    expect(this._obj.body).to.eq(message)
  })

  chai.Assertion.addMethod('missingArgumentResponse', function (argument: string) {
    expect(this._obj.status).to.eq(400)

    expect(this._obj.body).to.have.property('error').that.eq('Required argument is missing')
    expect(this._obj.body).to.have.property('error_code').that.eq(19)
    expect(this._obj.body).to.have.property('error_tag').that.eq('ARGUMENT_MISSING')
    expect(this._obj.body)
      .to.have.property('error_extra')
      .that.has.property('argument')
      .that.eq(argument)
  })
}
