import { api } from './api.js'

// Read https://api.testapp.nnauru.org/api/v1/ui/ for documentation
export default {
  actions() {
    return api('actions')
  },
  actionsTop(config) {
    return api('actions/top', config)
  },
  actionsDone(actionId, config) {
    return api(`actions/${actionId}/actionsdone`, config)
  },
  categories() {
    return api('categories')
  },
  categoryActions(categoryId) {
    return api(`categories/${categoryId}/actions`)
  },
  categoryActionsDone(categoryId, config) {
    return api(`categories/${categoryId}/actionsdone`, config)
  },
  checkAuth(config) {
    return api('check_auth', config)
  },
  children() {
    return api('children')
  },
  childActionsDone(childId, config) {
    return api(`children/${childId}/actionsdone`, config)
  },
  childId(username) {
    return api(`children/${username}/pseudo`)
  },
  groups() {
    return api('groups')
  },
  groupActionsDone(groupId, config) {
    return api(`groups/${groupId}/actionsdone`, config)
  },
  groupChildren(groupId) {
    return api(`groups/${groupId}/children`)
  },
  teams() {
    return api('teams')
  },
  teamsTotal(config) {
    return api('teams/total', config)
  },
  teamActionsDone(teamId, config) {
    return api(`teams/${teamId}/actionsdone`, config)
  },
  teamChildren(teamId) {
    return api(`teams/${teamId}/children`)
  },
  teamGroups(teamId) {
    return api(`teams/${teamId}/groups`)
  },
  week() {
    return api('week')
  }
}
