<template>
  <component :is="header" />
  <component :is="base" />
  <component :is="dynamic" />
</template>

<script setup lang="ts">
import { useSlots } from 'vue';

const { dynamic, header, default: base } = useSlots();
</script>
