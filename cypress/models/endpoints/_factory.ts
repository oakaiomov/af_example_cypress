import EOM_Sync from './sync.area'
import EOM_User from './user.area'

export default function endpointsFactory() {
  Cypress.Commands.add('api', ($name: keyof Models.Endpoints) => {
    switch ($name) {
      case 'user':
        return new EOM_User('user')
      case 'sync':
        return new EOM_Sync('sync')
    }
  })

  EOM_Sync.cypressify()
  EOM_User.cypressify()
}
