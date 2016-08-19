<style>
  $header-height: 39px;
  .header {
    background-color: #6389a8;
    width: 100%;
    height: $header-height;
    flex: 1;
    .headerIcon {
      width: 26px;
      height: 26px;
      margin: 7px;
    }
  }
</style>

<template>
  <header class="header">
    <img class="headerIcon" src="../assets/titleLogo.png" />
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