<style>
  .chatlist {
    border-right: 1px solid rgba(0, 0, 0, .1);
    flex: 35;
    height: 100%;
    min-width: 260px;
    .loading {
      margin-top: 45px;
      text-align: center;
      color: #767676;
      font-size: 14px;
    }
  }
</style>

<template>
  <div class="chatlist">
    <app-chatlist-search></app-chatlist-search>
    <div v-if="loadingList" class="loading">Loading...</div>
    <app-chatlist-item
      v-if="chatList.length > 0 && !loadingList"
      v-for="chat in chatList"
      :unread-count="chat.unreadItems"
      :avatar="chat.avatarUrl"
      :last-msg="chat.lastMsg"
      :name="chat.name"
      :active="chat.id === activeChat"
      @click="setActiveChat(chat.id)">
    </app-chatlist-item>
  </div>
</template>

<script>
  import appChatlistSearch from './chatlistsearch'
  import appChatlistItem from './chatlistitem'
  import event from 'utils/event'

  export default {
    vuex: {
      getters: {
        chatList: store => store.app.chatList.map(chat => {
          return {
            unreadItems: chat.unreadItems,
            avatarUrl: chat.avatarUrl,
            lastMsg: chat.lastMsg,
            name: chat.name,
            id: chat.id
          }
        }),
        loadingList: store => store.app.loadingList,
        activeChat: store => store.app.activeChat
      },
      actions: {
        setActiveChat({dispatch}, uid) {
          if (this.activeChat !== uid) {
            dispatch('SET_ACTIVE_CHAT', uid)
            event.emit('open-current-chat')
          }
        } 
      }
    },
    data() {
      return {}
    },
    methods: {

    },
    components: {
      appChatlistSearch,
      appChatlistItem
    }
  }
</script>