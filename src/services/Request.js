import { api } from './api.js'

// Check https://api.testapp.nnauru.org/api/v1/ui/ for documentation
export default {
  actions() {
    return api('actions')
  },
  actionsTop(config) {
    return api('actions/top', config)
  },
  checkAuth(config) {
    return api('check_auth', config)
  }
}
