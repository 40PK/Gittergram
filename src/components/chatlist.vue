<style>
  .chatlist {
    border-right: 1px solid rgba(0, 0, 0, .1);
    flex: 35;
    height: 100%;
    min-width: 260px;
    .loading {
      color: #767676;
      font-size: 14px;
      margin-top: 45px;
      text-align: center;
    }
  }
</style>

<template>
  <div class="chatlist">
    <app-chatlist-search></app-chatlist-search>
    <div v-if="loadingList" class="loading">Loading...</div>
    <app-chatlist-item
      v-if="chatList.length > 0 && !loadingList"
      v-for="chat in chats"
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
    computed: {
      chats() {
       return this.chatList.sort((a, b) => {
        const aTime = (a.lastMsg[0] && a.lastMsg[0].sent) || a.lastAccessTime 
        const bTime = (b.lastMsg[0] && b.lastMsg[0].sent) || b.lastAccessTime 
        return new Date(bTime).getTime() - new Date(aTime).getTime()
      })}
    },
    methods: {

    },
    components: {
      appChatlistSearch,
      appChatlistItem
    }
  }
</script>