import type FOM_User from '../../models/data/user.format'
import EOM_Comments from '../../models/endpoints/comments.area'
import EOM_Labels from '../../models/endpoints/labels.area'
import EOM_Projects from '../../models/endpoints/projects.area'
import EOM_Sections from '../../models/endpoints/sections.area'
import type EOM_Sync from '../../models/endpoints/sync.area'
import EOM_Tasks from '../../models/endpoints/tasks.area'
import type EOM_User from '../../models/endpoints/user.area'

export {}

declare global {
  namespace Models {
    interface Data {
      user: FOM_User
    }

    interface Endpoints {
      comments: EOM_Comments
      labels: EOM_Labels
      projects: EOM_Projects
      sections: EOM_Sections
      sync: EOM_Sync
      tasks: EOM_Tasks
      user: EOM_User
    }
  }

  // eslint-disable-next-line no-var
  var data: <FOM extends keyof Models.Data>(name: FOM) => Models.Data[FOM]

  namespace Cypress {
    interface Chainable {
      api: <EOM extends keyof Models.Endpoints>(name: EOM) => Models.Endpoints[EOM]
    }
  }
}
