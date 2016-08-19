<style>
  .chatlistsearch {
    display: flex;
    padding: 10px;
    position: relative;
    .search {
      background: url('../assets/search.png') no-repeat 10px 7px;
      background-color: #f2f2f2;
      background-size: 15px;
      border-radius: 3px;
      border: 2px solid #f2f2f2;
      color: #000;
      flex: 1 100%;
      font-size: 13px;
      height: 30px;
      outline: none;
      padding: 0 35px 0 35px;
      transition: all .15s linear;
      width: 100%;
      &::placeholder {
        color: #999;
      }
      &:active, &:focus {
        background-color: #FFF;
        border-color: #54c3f3;
      }
    }
    .searchButton {
      background: url('../assets/pencil.png') no-repeat 9px 10px;
      background-size: 15px;
      cursor: pointer;
      height: 34px;
      position: absolute;
      right: 10px;
      width: 36px;
      &:active {
        margin-top: 1px;
      }
    }
  }
</style>

<template>
  <div class="chatlistsearch">
    <input type="text" class="search" placeholder="Search" />
    <div class="searchButton"></div>
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