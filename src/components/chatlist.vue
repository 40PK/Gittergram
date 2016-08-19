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
      :unread-count="0"
      name="test1">
    </app-chatlist-item>
  </div>
</template>

<script>
  import appChatlistSearch from './chatlistsearch'
  import appChatlistItem from './chatlistitem'

  export default {
    vuex: {
      getters: {

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