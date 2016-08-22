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
      flex-direction: column;
      .chatheader {
        height: 53px;
        background-color: #fff;
        border-bottom: 1px solid rgba(0, 0, 0, .1);
        padding-left: 17px;
        display: flex;
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
      .chatbody {
        height: 100%;
        flex: 1;
        overflow: auto;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding-bottom: 8px;
        .message {
          width: 100%;
          .flexcontainer {
            display: flex;
          }
          .messagebody {
            word-wrap: break-word;
            float: left;
            background-color: #fff;
            max-width: 430px;
            min-width: 115px;
            font-size: 13px;
            padding: 7px 13px 8px 13px;
            margin: 10px 36px 2px 53px;
            border-radius: 16px;
            &.attached {
              margin-top: 3px;
            }
            .sender {
              color: #000;
              font-weight: 600;
            }
          }
          .messageavatar {
            float: left;
            width: 33px;
            height: 33px;
            border-radius: 33px;
            margin-top: 8px;
            margin-left: 13px;
          }
          .messageavatar + .messagebody {
            margin-left: 7px;
          }
          .unread {
            color: #538bb4;
            background-color: #fcfbfa;
            text-align: center;
            font-size: 14px;
            font-weight: 600;
            margin-top: 8px;
            padding: 6px 0;
            border-bottom: 1px solid rgba(0, 0, 0, .1);
          }
        }
      }
      .chatfooter {
        background-color: #fff;
        border-top: 1px solid rgba(0, 0, 0, .1);
        display: flex;
        .editText {
          border: none;
          padding-left: 5px;
          margin: 12px 0px 12px 7px;
          min-height: 18px;
          max-height: 256px;
          font-size: 13px;
          resize: none;
          outline: none;
          flex: 1;
          line-height: 18px;
        }
        .sendbutton {
          color: #0080c0;
          background-color: white;
          font-size: 16px;
          padding: 12px 16px;
          transition: all .2s linear;
          cursor: pointer;
          align-self: flex-end;
          -webkit-user-select: none;
          &:hover {
            color: #0073ad;
            background-color: #f5f5f5;
          }
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
      <div class="chatbody">
        <div v-for="message in messages"
          class="message">
          <div class="unread"
            id="unread" 
            v-if="message.unread && (messages[$index - 1]?!messages[$index - 1].unread:true)">Unread</div>
          <div class="flexcontainer">
            <img class="messageavatar"
              :src="message.fromUser.avatarUrlSmall"
              v-if="!isPrevMessageAuthor(message.fromUser.id, $index)" />
            <div class="messagebody"
              :class="{'attached': isPrevMessageAuthor(message.fromUser.id, $index)}">
              <div class="sender"
                v-if="!isPrevMessageAuthor(message.fromUser.id, $index)"
                :style="{color: getUserColor(message.fromUser.id)}">{{message.fromUser.displayName}}</div>
              {{message.text}}
            </div>
          </div>
        </div>
      </div>
      <div class="chatfooter">
        <autosize-textarea class="editText" rows="1" placeholder="  Write a message"></autosize-textarea>
        <div class="sendbutton">Send</div>
      </div>
    </div>
  </div>
</template>

<script>
  import color from 'utils/color'
  import event from 'utils/event'
  import {$} from 'utils/dom'
  import autosizeTextarea from './autosize-textarea'

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
        },
        messages: store => store.app.messages
      },
      actions: {

      }
    },
    data() {
      return {}
    },
    watch: {
      messages() {
        const unreadCounter = $('#unread')
        if (unreadCounter) {
          unreadCounter.scrollIntoView()
        } else {
          const body = $('.chatbody');
          body.scrollTop = body.scrollHeight;
        }
      }
    },
    methods: {
      getUserColor(id) {
        return color.getHexColor(id)
      },
      isPrevMessageAuthor(id, index) {
        const msg = this.messages[index - 1]
        return id === (msg && msg.fromUser.id)
      }
    },
    components: {
      autosizeTextarea
    }
  }
</script>