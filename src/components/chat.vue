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
  }
</style>

<template>
  <div class="chat">
    <div class="bubble">Please select a chat to start messaging</div>
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
    data() {
      return {}
    },
    methods: {

    }
  }
</script>