<style>
  .main {
    background-color: #FFF;
    width: 100%;
    flex: 1 100%;
    display: flex;
  }
</style>

<template>
  <div class="main">
    <app-chatlist></app-chatlist>
    <app-chat></app-chat>
  </div>
</template>

<script>
  import appChatlist from './chatlist'
  import appChat from './chat'

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
      appChatlist,
      appChat
    }
  }
</script>