import FOM_User from './user.format'

export default function dataFactory(name: keyof Models.Data) {
  switch (name) {
    case 'user':
      return new FOM_User()
  }
}
