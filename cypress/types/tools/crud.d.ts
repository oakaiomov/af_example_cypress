export {}

declare global {
  namespace API_CRUD {
    type Plural<T extends string> = `${T}s`
    type Entities = 'comment' | 'label' | 'project' | 'section' | 'task'
    type Endpoints = Plural<Entities>

    type Item = Comments.Item & Labels.Item & Projects.Item & Sections.Item & Tasks.Item

    namespace Payload {
      type Create = Comments.Payload.Create &
        Labels.Payload.Create &
        Projects.Payload.Create &
        Sections.Payload.Create &
        Tasks.Payload.Create

      type Update = Comments.Payload.Update &
        Labels.Payload.Update &
        Projects.Payload.Update &
        Sections.Payload.Update &
        Tasks.Payload.Update
    }
  }
}
