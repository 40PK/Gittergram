const state = {
  token: null,
  currentUser: null,
  chatList: [],
  loadingList: false,
  activeChat: null,
  messages: []
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
  },

  // PUSH
  PUSH_MESSAGES(state, msgs) {
    const messages = state.messages.slice(0)
    Array.prototype.unshift.apply(messages, msgs)
    state.messages = messages
  }
}

export default {
  state,
  mutations
}
