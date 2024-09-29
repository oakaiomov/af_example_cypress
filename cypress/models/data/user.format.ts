import { faker } from '@faker-js/faker'

export default class FOM_User {
  suffix(): string {
    return String(faker.number.int({ min: 100000, max: 999999 }))
  }

  email(suffix: string): string {
    return `oakaiomov+_implement_automation_cypress_example_${suffix}@gmail.com`
  }

  register(
    email: string,
    password: string = '!Q2w3e4r',
    timezone: string = 'Europe/Bratislava',
    lang: string = 'en'
  ): User.Register.Payload {
    return {
      accept_terms: true,
      email,
      lang,
      password,
      permanent_login: true,
      pkce_oauth: null,
      sample_projects: 'auto',
      timezone,
      web_session: true
    }
  }

  delete(current_password: string): User.Delete.Payload {
    return { current_password, reason: '' }
  }
}
