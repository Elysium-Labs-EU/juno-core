import { defineConfig } from 'cypress'

import RoutesConstants from './src/constants/routesConstants'

const WIDTH = 1366

// Populate process.env with values from .env file
require('dotenv').config()

export default defineConfig({
  projectId: 'g45j5p',
  env: {
    login_url: RoutesConstants.LOGIN,
    todo_url: RoutesConstants.TODO,
    frontend_app_url: process.env.VITE_FRONTEND_APP_URL,
    googleRefreshToken: process.env.VITE_GOOGLE_TEST_REFRESH_TOKEN,
    googleClientId: process.env.VITE_GOOGLE_TEST_CLIENT_ID,
    googleClientSecret: process.env.VITE_GOOGLE_TEST_CLIENT_SECRECT,
  },

  e2e: {
    baseUrl: process.env.VITE_FRONTEND_APP_URL,
    viewportWidth: WIDTH,
    viewportHeight: (WIDTH / 16) * 9,
    // setupNodeEvents(on, config) {
    //   // implement node event listeners here
    // },
  },
})
