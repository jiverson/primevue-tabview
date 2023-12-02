<template>
  <a
    class="p-tabview-nav-link p-tabview-header-action"
    aria-haspopup="true"
    :aria-expanded="expanded"
    @click="$emit('click-more', $event)"
  >
    <span class="p-tabview-title" data-pc-section="headertitle">{{ headerTitle }}</span>
    <i class="i-ic:round-expand-more tab-icon" :class="{ expanded: expanded }"></i>
    <!-- <i :class="{ ' i-ic:round-expand-more': !expanded, 'i-ic:round-expand-less': expanded }"></i> -->
  </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BWTabMoreBtn',
  props: {
    expanded: {
      type: Boolean,
      default: false,
    },
    headerTitle: {
      type: String,
      default: 'More',
    },
  },
  emits: ['click-more'],
});
</script>

<style scoped lang="css">
.tab-icon {
  transition: transform 0.2s ease 0.05s;
}

.tab-icon.expanded {
  transform: rotate(180deg);
}
</style>
