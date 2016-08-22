<style>
  .chatlistitem {
    background-color: #ffffff;
    height: 62px;
    padding-right: 10px;
    &:hover {
      background-color: #f5f5f5;
    }
    &.active {
      background-color: #6a91b1;
      margin-right: -1px;
      .chatname, .time, .message, .sender {
        color: #fff !important;
      }
      .unread {
        color: #5b94bf !important;
      }
      .counter {
        background-color: #d3e2ee !important;
      }
    }
    img {
      border-radius: 50px;
      float: left;
      height: 46px;
      padding: 8px 10px;
      width: 46px;
    }
    .info {
      display: flex;
      flex-direction: column;
      font-size: 13px;
      height: 100%;
      .top {
        display: flex;
        flex: 1;
        .chatname {
          align-self: center;
          color: #000;
          flex: 1 100%;
          font-weight: 600;
        }
        .time {
          align-self: center;
          color: #a8a8a8;
        }
      }
      .bottom {
        display: flex;
        flex: 1;
        .message {
          color: #888888;
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          .sender {
            color: #538bb4;
            display: inline-block;
          }
        }
        .unread {
          color: #fff;
          .counter {
            background-color: #bbbbbb;
            border-radius: 19px;
            font-size: 12px;
            font-weight: 700;
            min-width: 9px;
            padding: 1px 5px;
            text-align: center;
          }
        }
      }
    }
  }
</style>

<template>
  <div 
    class="chatlistitem"
    :class="{'active': active}">
    <img :src="avatar"/>
    <div class="info">
      <div class="top">
        <div class="chatname">{{name}}</div>
        <div class="time">{{dateParse(lastMsg[0].sent)}}</div>
      </div>
      <div class="bottom">
        <div class="message">
          <div class="sender">{{lastMsg[0].fromUser.displayName.split(' ')[0] + ':'}}</div>
          {{lastMsg[0].text || ''}}
        </div>
        <div v-if="unreadCount > 0"
          class="unread">
          <div class="counter">{{unreadCount}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import dateParse from 'utils/date-parse'

  export default {
    vuex: {
      getters: {

      },
      actions: {

      }
    },
    props: {
      name: {
        type: String,
        required: true
      },
      avatar: {
        type: String,
        default: './dist/static/usercolor1.png'
      },
      lastMsg: {
        type: Array,
        default: () => [{}]
      },
      unreadCount: {
        type: Number,
        required: true
      },
      active: {
        type: Boolean,
        required: true
      }
    },
    data() {
      return {}
    },
    methods: {
      dateParse(e) {
        return dateParse(e)
      }
    }
  }
</script>