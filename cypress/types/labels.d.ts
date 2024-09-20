export {}

declare global {
  namespace Labels {
    type Item = {
      id: string
      name: string
      color: string
      order: number
      is_favorite: boolean
    }

    namespace Payload {
      type Create = {
        name: string
        color?: string
        order?: number
        is_favorite?: boolean
      }

      type Update = {
        name?: string
        color?: string
        order?: number
        is_favorite?: boolean
      }

      type RenameShared = {
        name: string
        new_name: string
      }
    }
  }
}
