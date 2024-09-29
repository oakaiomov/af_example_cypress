/* eslint-disable @typescript-eslint/no-explicit-any */
import ObjectModel from '../object.model'

export default abstract class EOM_Base extends ObjectModel {
  private readonly REST_API_VERSION = 'v2'
  private readonly SYSTEM_API_VERSION = 'v9.101'

  private readonly basePath: string

  constructor(basePath) {
    super()
    this.basePath = basePath
  }

  protected restUrl(path: string = ''): string {
    return `https://api.todoist.com/rest/${this.REST_API_VERSION}/${this.basePath}${path}`
  }

  protected sysUrl(path: string = ''): string {
    return `/api/${this.SYSTEM_API_VERSION}/${this.basePath}${path}`
  }

  protected restHeaders(headers: Record<any, any> = {}) {
    if (globalThis.session && globalThis.session.token)
      headers['Authorization'] = `Bearer ${globalThis.session.token}`
    return headers
  }

  protected sysHeaders(headers: Record<any, any> = {}) {
    return this.restHeaders({
      'Doist-Platform': 'web',
      'Doist-Locale': 'en-US',
      ...headers
    })
  }
}
