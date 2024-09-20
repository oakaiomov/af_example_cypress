export {}

declare global {
  namespace Comments {
    type Attachment = {
      file_name: string
      file_type: string
      file_url: string
      resource_type: 'file'
    }

    type Item = {
      id: string
      task_id: string
      project_id: string
      posted_at: string
      content: string
      attachment: Attachment
    }

    namespace Payload {
      type ListFilter = { project_id: string } | { task_id: string }

      type Create = ListFilter & {
        content: string
        attachment?: Attachment
      }

      type Update = {
        content: string
      }
    }
  }
}
