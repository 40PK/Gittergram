<style>
  .chatlistitem {
    height: 62px;
    background-color: #ffffff;
    padding-right: 10px;
    &:hover {
      background-color: #f5f5f5;
    }
    img {
      float: left;
      height: 46px;
      width: 46px;
      padding: 8px 10px;
      border-radius: 50px;
    }
    .info {
      display: flex;
      flex-direction: column;
      height: 100%;
      font-size: 13px;
      .top {
        flex: 1;
        display: flex;
        .chatname {
          color: #000;
          align-self: center;
          font-weight: 600;
          flex: 1 100%;
        }
        .time {
          color: #a8a8a8;
          align-self: center;
        }
      }
      .bottom {
        flex: 1;
        display: flex;
        .message {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: #888888;
          .sender {
            color: #538bb4;
            display: inline-block;
          }
        }
        .unread {
          color: #fff;
          .counter {
            background-color: #bbbbbb;
            font-size: 12px;
            font-weight: 700;
            padding: 1px 5px;
            border-radius: 19px;
          }
        }
      }
    }
  }
</style>

<template>
  <div class="chatlistitem">
    <img :src="avatar" />
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