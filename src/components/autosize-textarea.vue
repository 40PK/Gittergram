<template>
  <textarea :placeholder="placeholder">{{value}}</textarea>
</template>

<script>
  import autosize from 'autosize'

  export default {
    props: {
      placeholder: {
        type: String || Number,
        default: ''
      },
      value: {
        type: String || Number,
        default: ''
      }
    },
    ready() {
      autosize(this.$el)
    }
  }
</script>