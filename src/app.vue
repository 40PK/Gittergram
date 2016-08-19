<style src="css/OpenSans.css"></style>
<style>
  html, body, #app {
    height: 100%;
    width: 100%;
  }

  body {
    margin: 0 auto;
    overflow: hidden;
    font-family: "Open Sans";
  }

  #app {
    display: flex;
    flex-direction: column;
  }
</style>

<template>
  <div id="app">
    <app-header></app-header>
    <app-main></app-main>
  </div>
</template>

<script>
  import appHeader from './components/header'
  import appMain from './components/main'

  export default {
    components: {
      appHeader,
      appMain
    }
  }
</script>