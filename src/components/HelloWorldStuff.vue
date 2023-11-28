<template>
  <div style="color: red;"><button @click="$emit('heythere', $event)">Hey there {{ msg }}</button></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    msg: {
      type: String,
      default: 'Hello World!',
    },
  }
})
</script>
