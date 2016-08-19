const state = {
  token: null,
  currentUser: null,
  chatList: []
}

const mutations = {
  // SET
  SET_TOKEN(state, token) {
    state.token = token
  },
  SET_CURRENT_USER(state, user) {
    state.currentUser = user
  },
  SET_CHAT_LIST(state, list) {
    state.chatList = list
  }
}

export default {
  state,
  mutations
}
