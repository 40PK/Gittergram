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
  import event from 'utils/event'
  import appChatlist from './chatlist'
  import appChat from './chat'
  import realtimeClient from 'gitter-realtime-client'

  const currentWindow = remote.getCurrentWindow()
  const config = currentWindow.$config
  const client = new realtimeClient.RealtimeClient({token: config.get('token')})
  let roomClient;

  export default {
    vuex: {
      getters: {
        token: state => state.app.token,
        currentUser: state => state.app.currentUser,
        chatList: state => state.app.chatList,
        activeChat: state => state.app.activeChat
      },
      actions: {

      }
    },
    ready() {
      this.listenEvents()
      this.$store.dispatch('SET_TOKEN', config.get('token'))
      this.gitter = new Gitter(this.token)
      this.$store.dispatch('UPDATE_LOADING_LIST_STATE', true)
      this.gitter.currentUser().then(user => {
        this.$store.dispatch('SET_CURRENT_USER', user)
        this.updateDialogsList().then(() => {
          roomClient = new realtimeClient.RoomCollection([], {client, listen: true})
          this.listenLive()
        })
      })
    },
    methods: {
      async updateDialogsList() {
        this.$store.dispatch('UPDATE_LOADING_LIST_STATE', true)

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

        return this.currentUser.rooms().then(chats => {
          let i = 0
          const chatsMessage = []
          while (chats[i]) {
            chatsMessage.push(getChatsLastMessage(chats[i]))
            i++
          }

          return Promise.all(chatsMessage)
        }).then(chats => {
          this.$store.dispatch('UPDATE_LOADING_LIST_STATE', false)
          this.$store.dispatch('SET_CHAT_LIST', chats)
        })
      },
      listenEvents() {
        event.on('open-current-chat', () => {
          this.gitter.rooms.find(this.activeChat).then(room => {
            return room.chatMessages({limit: 50})
          }).then(msgs => {
            this.$store.dispatch('PUSH_MESSAGES', msgs)
          })
        })
      },
      listenLive() {
        client.subscribe('/v1/user/' + this.currentUser.id, msg => {
          if (msg.notification !== "user_notification" ) return

          console.log(msg)
          
          const chats = this.chatList
          let i = 0
          while (chats[i]) {
            if (chats[i].id === msg.troupeId) {
              chats[i].lastMsg = [{
                sent: (new Date()).getTime(),
                text: msg.text,
                fromUser: {
                  displayName: msg.title.split('@')[0].slice(0, -1)
                }
              }]
              chats[i].unreadItems++
              this.$store.dispatch('SET_CHAT_LIST', chats)
              break
            }
            ++i
          }
        }) 
      }
    },
    components: {
      appChatlist,
      appChat
    }
  }
</script>