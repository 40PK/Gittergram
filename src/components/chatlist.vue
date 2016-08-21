<style>
  .chatlist {
    border-right: 1px solid #eaeaea;
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
      :name="chat.name">
    </app-chatlist-item>
  </div>
</template>

<script>
  import appChatlistSearch from './chatlistsearch'
  import appChatlistItem from './chatlistitem'

  export default {
    vuex: {
      getters: {
        chatList: store => store.app.chatList,
        loadingList: store => store.app.loadingList
      },
      actions: {

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