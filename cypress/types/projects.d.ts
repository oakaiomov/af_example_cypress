export {}

declare global {
  namespace Projects {
    type ViewStyle = 'list' | 'board'

    type Item = {
      id: string
      name: string
      color: string
      parent_id?: string
      order: number
      comment_count: number
      is_shared: boolean
      is_favorite: boolean
      is_inbox_project: boolean
      is_team_inbox: boolean
      view_style: ViewStyle
      url: string
    }

    namespace Payload {
      type Create = {
        name: string
        parent_id?: string
        color?: string
        is_favorite?: boolean
        view_style?: ViewStyle
      }

      type Update = {
        name?: string
        color?: string
        is_favorite?: boolean
        view_style?: ViewStyle
      }
    }

    type Collaborator = {
      id: string
      name: string
      email: string
    }
  }
}
