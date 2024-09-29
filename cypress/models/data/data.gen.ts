import { faker } from '@faker-js/faker'

export default class DataGen {
  static content(): string {
    return faker.lorem.paragraph()
  }

  static description(): string {
    return faker.lorem.sentence()
  }

  static color(): string {
    return faker.helpers.arrayElement([
      'berry_red',
      'red',
      'orange',
      'yellow',
      'olive_green',
      'lime_green',
      'green',
      'mint_green',
      'teal',
      'sky_blue',
      'light_blue',
      'blue',
      'grape',
      'violet',
      'lavender',
      'magenta',
      'salmon',
      'charcoal',
      'grey',
      'taupe'
    ])
  }

  static order(): number {
    return faker.number.int({ min: 1, max: 10 })
  }

  static nameStr(): string {
    return faker.animal.horse()
  }

  static viewStyle(): Projects.ViewStyle {
    return faker.helpers.arrayElement(['list', 'board'])
  }
}
