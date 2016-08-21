<style>
  .chatlistitem {
    height: 62px;
    background-color: #ffffff;
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
      .top {
        flex: 1;
        display: flex;
        .chatname {
          color: #000;
          align-self: center;
          font-size: 14px;
          font-weight: 600;
        }
      }
      .bottom {
        flex: 1;
        display: flex;
        .message {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 14px;
          .sender {
            color: #6482b2;
            display: inline-block;
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
      </div>
      <div class="bottom">
        <div class="message">
          <div class="sender">{{lastMsg[0].fromUser.displayName.split(' ')[0] + ':'}}</div>
          {{lastMsg[0].text || ''}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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

    }
  }
</script>