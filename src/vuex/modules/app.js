const state = {
  token: null,
  currentUser: null,
  chatList: [],
  loadingList: false,
  activeChat: null
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
  },
  SET_ACTIVE_CHAT(state, uid) {
    state.activeChat = uid
  },

  // UPDATE
  UPDATE_LOADING_LIST_STATE(state, loading) {
    state.loadingList = loading
  }
}

export default {
  state,
  mutations
}
