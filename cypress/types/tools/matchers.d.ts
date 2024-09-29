export {}

declare global {
  namespace Chai {
    interface Assertion {
      erroredResponse(message: string)
      missingArgumentResponse(argument: string)
    }
  }
}
