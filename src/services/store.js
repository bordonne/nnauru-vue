// Welcome to the store how can I help you ? :)

const state = {
  loggedIn: false,
  username: "",
  credentials: "",
  childId: 0,
  team: {},
  week: {}, // Current week
  weeks: [], // all weeks
  categories: [],
  actions: [],
  actionsByCategory: [],
  impactMetadata: {}
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
