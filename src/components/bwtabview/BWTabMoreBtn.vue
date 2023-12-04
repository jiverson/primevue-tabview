<template>
  <a class="p-tabview-nav-link p-tabview-header-action" aria-haspopup="true" :aria-expanded="expanded"
    @click="$emit('click-more', $event)">
    <slot>
      <span class="p-tabview-title" data-pc-section="headertitle">{{ headerTitle }}</span>
    </slot>
    <Icon icon="ic:baseline-expand-more" class="tab-icon" :class="{ expanded }" />
    <!-- <i class="i-ic:round-expand-more tab-icon" :class="{ expanded }"></i> -->
  </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Icon } from '@iconify/vue';

export default defineComponent({
  name: 'BWTabMoreBtn',
  components: {
    Icon,
  },
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
  font-size: 1.5rem;
  transition: transform 0.25s ease-in-out;
}

.tab-icon.expanded {
  transform: rotate(180deg);
}
</style>
