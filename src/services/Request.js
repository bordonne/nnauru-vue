import { api } from './api.js'

// Read https://api.testapp.nnauru.org/api/v1/ui/ for documentation
export default {
  async actions() {
    let response = await api('actions')
    return response.data
  },
  async actionsTop(config) {
    let response = await api('actions/top', config)
    return response.data
  },
  async actionsDone(actionId, config) {
    let response = await api(`actions/${actionId}/actionsdone`, config)
    return response.data
  },
  async categories() {
    let response = await api('categories')
    return response.data
  },
  async categoryActions(categoryId) {
    let response = await api(`categories/${categoryId}/actions`)
    return response.data
  },
  async categoryActionsDone(categoryId, config) {
    let response = await api(`categories/${categoryId}/actionsdone`, config)
    return response.data
  },
  async checkAuth(config) {
    return await api('check_auth', config)
  },
  async children() {
    let response = await api('children')
    return response.data
  },
  async childActionsDone(childId, config) {
    let response = await api(`children/${childId}/actionsdone`, config)
    return response.data
  },
  async childId(username) {
    let response = await api(`children/${username}/pseudo`)
    return response.data.id
  },
  async groups() {
    let response = await api('groups')
    return response.data
  },
  async groupActionsDone(groupId, config) {
    let response = await api(`groups/${groupId}/actionsdone`, config)
    return response.data
  },
  async groupChildren(groupId) {
    let response = await api(`groups/${groupId}/children`)
    return response.data
  },
  async teams() {
    let response = await api('teams')
    return response.data
  },
  async teamsTotal(config) {
    let response = await api('teams/total', config)
    return response.data
  },
  async teamActionsDone(teamId, config) {
    let response = await api(`teams/${teamId}/actionsdone`, config)
    return response.data
  },
  async teamChildren(teamId) {
    let response = await api(`teams/${teamId}/children`)
    return response.data
  },
  async teamGroups(teamId) {
    let response = await api(`teams/${teamId}/groups`)
    return response.data
  },
  async week() {
    let response = await api('week')
    return response.data
  },
  async newActionDone(childId, config) {
    config.method = "POST"
    let response = await api(`actiondone/${childId}`, config)
    return response.data
  },
  async deleteActionDone(actionDoneId) {
    let config = {method: "DELETE"}
    let response = await api(`actiondone/${actionDoneId}`, config)
    return response.data
  },

}
