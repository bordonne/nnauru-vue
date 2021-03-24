// Welcome to the store how can I help you ? :)

const state = {
  loggedIn: false,
  username: "",
  credentials: "",
  childId: 0,
  team: {},
  currentWeek: {},
  previousWeek: {},
  activeWeek: {},
  categories: [],
  actions: [],
  actionsByCategory: [],
  impact: {}
}

export default {
  get(prop){
    if (process.env.NODE_ENV == "development") console.log("[store] get", prop)
    return state[prop]
  },

  set(prop, value){
    if (process.env.NODE_ENV == "development") console.log("[store] set", prop)
    state[prop] = value
  }
}
