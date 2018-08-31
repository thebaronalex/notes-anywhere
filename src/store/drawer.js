import drawer from '@/api/drawer'

const state = {
  all: [],
  isLoggedIn: false
}

const actions = {
  login ({commit}) {
    commit('set_logged_in', true)
    drawer.getLoggedInDrawerItems(items => {
      commit('get_drawer_items', items)
    })
  },
  logout ({commit}) {
    commit('set_logged_in', false)
    drawer.getLoggedOutDrawerItems(items => {
      commit('get_drawer_items', items)
    })
  }
}

const mutations = {
  get_drawer_items (state, drawerItems) {
    state.all = drawerItems
  },
  set_logged_in (state, loggedIn) {
    state.isLoggedIn = loggedIn
  }
}

const getters = {
  allItems (state) {
    return state.all
  },
  userLoggedIn (state) {
    return state.isLoggedIn
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
