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
          align-self: flex-end;
        }
      }
      .bottom {
        flex: 1;
        display: flex;
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
      <div class="bottom"></div>
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
        type: String,
        default: ''
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