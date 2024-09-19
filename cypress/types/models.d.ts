import type FOM_User from '../models/data/user.format'
import type EOM_Sync from '../models/endpoints/sync.area'
import type EOM_User from '../models/endpoints/user.area'

export {}

declare global {
  namespace Models {
    interface Data {
      user: FOM_User
    }

    interface Endpoints {
      sync: EOM_Sync
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
