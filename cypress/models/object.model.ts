export default abstract class ObjectModel {
  static cypressify() {
    const command =
      $key =>
      (...$args) =>
        $args.shift()[$key](...$args)

    Object.getOwnPropertyNames(this.prototype).forEach($key => {
      if (
        Object.getOwnPropertyDescriptor(this.prototype, $key)['get'] == undefined &&
        typeof this.prototype[$key] == 'function' &&
        $key !== 'constructor'
      ) {
        // @ts-expect-error dynamic commands definition
        Cypress.Commands.add($key, { prevSubject: true }, command($key))
      }
    })
  }
}
