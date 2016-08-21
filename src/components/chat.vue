<style>
  .chat {
    flex: 65;
    height: 100%;
    background-image: url('../assets/bg.jpg');
    background-size: cover;
    display: flex;
    .bubble {
      background-color: #89a0b4;
      margin: 0 auto;
      align-self: center;
      color: #fff;
      font-weight: 600;
      font-size: 13px;
      padding: 3px 12px 4px 12px;
      border-radius: 27px;
    }
    .chatcontainer {
      display: flex;
      width: 100%;
      .chatheader {
        height: 54px;
        background-color: #fff;
        box-shadow: 0 1px 0 0 #eaeaea;
        padding-left: 17px;
        display: flex;
        width: 100%;
        .left {
          align-self: center;
          display: flex;
          flex-direction: column;
          font-size: 13px;
          .top {
            font-weight: 700;
            flex: 1;
            padding: 2px 0;
          }
          .bottom {
            color: #979797;
            font-weight: 400;
            flex: 1;
            padding: 2px 0;
          }
        }
        .right {

        }
      }
    }
  }
</style>

<template>
  <div class="chat">
    <div class="bubble" v-if="!activeChat">Please select a chat to start messaging</div>
    <div class="chatcontainer" v-else>
      <div class="chatheader">
        <div class="left">
          <div class="top">{{activeChat.name}}</div>
          <div class="bottom">{{activeChat.userCount}} members</div>
        </div>
        <div class="right">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
        activeChat: store => {
          const chatId = store.app.activeChat
          if (!chatId) {
            return null
          }

          let i = 0;
          const chatList = store.app.chatList;
          while (chatList[i]) {
            if (chatList[i].id === chatId) {
              return chatList[i]
            }
            ++i
          }
        }
      },
      actions: {

      }
    },
    data() {
      return {}
    },
    methods: {

    }
  }
</script>