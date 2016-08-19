<style>
  $header-height: 39px;
  .header {
    background-color: #6389a8;
    flex: 1;
    height: $header-height;
    width: 100%;
    .headerIcon {
      float: left;
      height: 26px;
      margin: 7px;
      width: 26px;
    }
    .headerButton {
      -webkit-user-select: none;
      color: #d4e3ef;
      cursor: default;
      float: left;
      font-size: 13px;
      font-weight: 400;
      height: $header-height;
      line-height: $header-height;
      padding: 0 7px;
      transition: all .15s linear;
      &:hover {
        color: #fff;
      }
      &:active {
        margin-top: 1px;
      }
    }
  }
</style>

<template>
  <header class="header">
    <img class="headerIcon" src="../assets/titleLogo.png" />
    <div class="headerButton">Settings</div>
    <div class="headerButton">Contacts</div>
    <div class="headerButton">About</div>
  </header>
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