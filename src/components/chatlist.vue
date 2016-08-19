<style>
  .chatlist {
    border-right: 1px solid #eaeaea;
    flex: 35;
    height: 100%;
    min-width: 260px;
  }
</style>

<template>
  <div class="chatlist">
    <app-chatlist-search></app-chatlist-search>
    <app-chatlist-item
      v-if="chatList.length > 0"
      v-for="chat in chatList"
      :unread-count="chat.unreadItems"
      :avatar="chat.avatarUrl"
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
        chatList: store => store.app.chatList
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