export {}

declare global {
  namespace Tasks {
    type DueDateTime = {
      date: string
      is_recurring: boolean
      datetime: string
      string: string
      timezone: string
    }

    type DurationUnit = 'minute' | 'day'

    type Duration = {
      amount: number
      unit: DurationUnit
    }

    type Item = {
      id: string
      project_id: string
      section_id: string
      content: string
      description: string
      is_completed: boolean
      labels: string[]
      parent_id: string
      order: number
      priority: number
      due: DueDateTime
      url: string
      comment_count: number
      created_at: string
      creator_id: string
      assignee_id: string
      assigner_id: string
      duration: Duration
    }

    namespace Payload {
      type ListFilters = Partial<{
        project_id: string
        section_id: string
        label: string
        filter: string
        lang: string
        ids: number[]
      }>

      type Create = {
        content: string
        description?: string
        project_id?: string
        section_id?: string
        parent_id?: string
        order?: number
        labels?: string[]
        priority?: number
        due_string?: string
        due_date?: string
        due_datetime?: string
        due_lang?: string
        assignee_id?: string
        duration?: number
        duration_unit?: DurationUnit
      }

      type Update = {
        content?: string
        description?: string
        labels?: string[]
        priority?: number
        due_string?: string
        due_date?: string
        due_datetime?: string
        due_lang?: string
        assignee_id?: string
        duration?: number
        duration_unit?: DurationUnit
      }
    }
  }
}
