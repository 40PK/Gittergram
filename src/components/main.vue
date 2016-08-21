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
        currentUser: state => state.app.currentUser,
        chatList: state => state.app.chatList
      },
      actions: {

      }
    },
    ready() {
      this.$store.dispatch('SET_TOKEN', config.get('token'))
      this.gitter = new Gitter(this.token)
      this.$store.dispatch('UPDATE_LOADING_LIST', true)
      this.gitter.currentUser().then(user => {
        this.$store.dispatch('SET_CURRENT_USER', user)
        this.updateDialogsList()
      })
    },
    methods: {
      async updateDialogsList() {
        this.$store.dispatch('UPDATE_LOADING_LIST', true)

        const getChatsLastMessage = chat => {
          return new Promise(resolve => {
            this.gitter.rooms.find(chat.id).then(chat => {
              chat.chatMessages({limit: 1}).then(msg => {
                chat.lastMsg = msg
                resolve(chat)
              })
            })
          })
        }

        this.currentUser.rooms().then(chats => {
          let i = 0
          const chatsMessage = []
          while (chats[i]) {
            chatsMessage.push(getChatsLastMessage(chats[i]))
            i++
          }

          return Promise.all(chatsMessage)
        }).then(chats => {
          this.$store.dispatch('UPDATE_LOADING_LIST', false)
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