import FOM_Entity from './entity.format'
import FOM_User from './user.format'

export default function dataFactory<FOM extends keyof Models.Data>(name: FOM): Models.Data[FOM] {
  switch (name) {
    case 'user':
      return new FOM_User() as Models.Data[FOM]
    case 'entity':
      return new FOM_Entity() as Models.Data[FOM]
  }
}
