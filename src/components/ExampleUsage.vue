<template>
  <DynamicSlot>
    <div>Foo</div>
    <template #dynamic>
      <p>This is the slot content</p>
    </template>
    <template #header>
      <h1>Header</h1>
    </template>
  </DynamicSlot>
</template>

<script lang="ts" setup>
import DynamicSlot from '@/components/DynamicSlot.vue'
</script>
