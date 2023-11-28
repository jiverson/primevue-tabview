<script setup lang="ts">
import { ref, onUnmounted, getCurrentInstance } from 'vue'
import renderComponent from './bwtabview/renderComponent'
import HelloWorldStuff from './HelloWorldStuff.vue';

const { appContext } = getCurrentInstance()!
const container = ref()
let counter = 1
let destroyComp = null as any

onUnmounted(() => destroyComp?.())

const insert = () => {
  destroyComp?.()
  destroyComp = renderComponent({
    el: container.value,
    component: HelloWorldStuff,
    props: {
      key: counter,
      msg: 'Message ' + counter++,

      onHeythere: (e: any) => {
        console.log('Hey there!', e)
      },
    },
    appContext,
  })
}
</script>

<template>
  <button @click="insert">Insert component</button>
  <div ref="container"></div>
</template>
