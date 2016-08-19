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
  import {remote} from 'electron'
  import Gitter from 'node-gitter'
  import appChatlist from './chatlist'
  import appChat from './chat'

  const currentWindow = remote.getCurrentWindow()
  const config = currentWindow.$config

  export default {
    vuex: {
      getters: {
        token: state => state.app.token,
        currentUser: state => state.app.currentUser
      },
      actions: {

      }
    },
    ready() {
      this.$store.dispatch('SET_TOKEN', config.get('token'));
      this.gitter = new Gitter(this.token)
      this.gitter.currentUser().then(user => {
        this.$store.dispatch('SET_CURRENT_USER', user);
        this.updateDialogsList()
      });
    },
    methods: {
      async updateDialogsList() {
        this.currentUser.rooms().then(chats => {
          this.$store.dispatch('SET_CHAT_LIST', chats)
        })
      }
    },
    components: {
      appChatlist,
      appChat
    }
  }
</script>