import EOM_CRUD_Base from './_crud.base.area'
import EOM_Comments from './comments.area'
import EOM_Labels from './labels.area'
import EOM_Projects from './projects.area'
import EOM_Sections from './sections.area'
import EOM_Sync from './sync.area'
import EOM_Tasks from './tasks.area'
import EOM_User from './user.area'

export default function endpointsFactory() {
  Cypress.Commands.add('api', ($name: keyof Models.Endpoints) => {
    switch ($name) {
      case 'comments':
        return new EOM_Comments('comments')
      case 'labels':
        return new EOM_Labels('labels')
      case 'projects':
        return new EOM_Projects('projects')
      case 'sections':
        return new EOM_Sections('sections')
      case 'user':
        return new EOM_User('user')
      case 'tasks':
        return new EOM_Tasks('tasks')
      case 'sync':
        return new EOM_Sync('sync')
    }
  })

  EOM_CRUD_Base.cypressify()
  EOM_Comments.cypressify()
  EOM_Labels.cypressify()
  EOM_Projects.cypressify()
  EOM_Sections.cypressify()
  EOM_Sync.cypressify()
  EOM_Tasks.cypressify()
  EOM_User.cypressify()
}
