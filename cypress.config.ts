import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    specPattern: 'cypress/tests/**/*.suite.ts',
    supportFile: 'cypress/support/entrypoint.ts',
  },
})
