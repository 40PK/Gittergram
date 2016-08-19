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
    <app-chatlistsearch></app-chatlistsearch>
  </div>
</template>

<script>
  import appChatlistsearch from './chatlistsearch'

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
      appChatlistsearch
    }
  }
</script>