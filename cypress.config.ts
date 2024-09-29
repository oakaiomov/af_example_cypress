import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'https://app.todoist.com/',
    specPattern: 'cypress/tests/**/*.suite.ts',
    supportFile: 'cypress/support/entrypoint.ts',
  },
})
