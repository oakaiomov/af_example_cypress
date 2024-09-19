/* eslint-disable @typescript-eslint/no-explicit-any */
import ObjectModel from '../object.model'

export default abstract class EOM_Base extends ObjectModel {
  private readonly API_VERSION = 'v9.101'
  private readonly basePath: string

  constructor(basePath) {
    super()
    this.basePath = basePath
  }

  protected url(path: string): string {
    return `/api/${this.API_VERSION}/${this.basePath}${path}`
  }

  protected headers(additional: Record<any, any> = {}) {
    const headers: Record<string, any> = {
      'Doist-Platform': 'web',
      'Doist-Locale': 'en-US',
      ...additional
    }

    if (globalThis.session && globalThis.session.token)
      headers['Authorization'] = `Bearer ${globalThis.session.token}`

    return headers
  }
}
