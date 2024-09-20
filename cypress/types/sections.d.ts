export {}

declare global {
  namespace Sections {
    type Item = {
      id: string
      project_id: string
      order: number
      name: string
    }

    namespace Payload {
      type Create = {
        name: string
        project_id: string
        order?: number
      }

      type Update = {
        name: string
      }
    }
  }
}
