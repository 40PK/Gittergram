<style>
  .chat {
    background-image: url('../assets/bg.jpg');
    background-size: cover;
    display: flex;
    flex: 65;
    height: 100%;
    .bubble {
      align-self: center;
      background-color: #89a0b4;
      border-radius: 27px;
      color: #fff;
      font-size: 13px;
      font-weight: 600;
      margin: 0 auto;
      padding: 3px 12px 4px 12px;
    }
    .chatcontainer {
      display: flex;
      flex-direction: column;
      width: 100%;
      .chatheader {
        background-color: #fff;
        border-bottom: 1px solid rgba(0, 0, 0, .1);
        display: flex;
        height: 53px;
        padding-left: 17px;
        .left {
          align-self: center;
          display: flex;
          flex-direction: column;
          font-size: 13px;
          .top {
            flex: 1;
            font-weight: 700;
            padding: 2px 0;
          }
          .bottom {
            color: #979797;
            flex: 1;
            font-weight: 400;
            padding: 2px 0;
          }
        }
        .right {

        }
      }
      .chatbody {
        align-items: flex-start;
        display: flex;
        flex: 1;
        height: 100%;
        overflow: auto;
        padding-bottom: 8px;
        .box {
          min-height: -webkit-min-content;
          display: flex;
          flex-direction: column;
          flex: 1;
          .message {
            width: 100%;
            display: flex;
            flex-direction: column;
            .flexcontainer {
              display: flex;
              flex: 1;
            }
            .messagebody {
              background-color: #fff;
              border-radius: 16px;
              float: left;
              font-size: 13px;
              margin: 10px 36px 2px 53px;
              max-width: 404px;
              min-width: 115px;
              padding: 7px 13px 8px 13px;
              word-wrap: break-word;
              &.attached {
                margin-top: 3px;
              }
              .sender {
                color: #000;
                font-weight: 600;
              }
            }
            .messageavatar {
              border-radius: 33px;
              float: left;
              height: 33px;
              margin-left: 13px;
              margin-top: 8px;
              width: 33px;
            }
            .messageavatar + .messagebody {
              margin-left: 7px;
            }
            .unread {
              background-color: #fcfbfa;
              border-bottom: 1px solid rgba(0, 0, 0, .1);
              color: #538bb4;
              font-size: 14px;
              font-weight: 600;
              margin-top: 8px;
              padding: 6px 0;
              text-align: center;
            }
          }
        }
      }
      .chatfooter {
        background-color: #fff;
        border-top: 1px solid rgba(0, 0, 0, .1);
        display: flex;
        .editText {
          border: none;
          flex: 1;
          font-size: 13px;
          line-height: 18px;
          margin: 12px 0px 12px 7px;
          max-height: 256px;
          min-height: 18px;
          outline: none;
          padding-left: 5px;
          resize: none;
        }
        .sendbutton {
          -webkit-user-select: none;
          align-self: flex-end;
          background-color: white;
          color: #0080c0;
          cursor: pointer;
          font-size: 16px;
          padding: 12px 16px;
          transition: all .2s linear;
          &:hover {
            background-color: #f5f5f5;
            color: #0073ad;
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
        <div class="box">
        <div v-for="message in messages"
          class="message">
          <div class="unread"
            id="unread" 
            v-if="message.unread && (messages[$index - 1]?!messages[$index - 1].unread:true)">{{activeChat.unreadItems}} unread messages</div>
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