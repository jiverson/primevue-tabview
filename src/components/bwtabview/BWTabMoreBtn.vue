<template>
  <li class="p-tabview-header p-tabview-nav-more">
    <a class="p-tabview-nav-link p-tabview-header-action" @click="$emit('click-more', $event, 'something')">
      <span class="p-tabview-title" data-pc-section="headertitle">{{ stuff }}</span>
    </a>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BWTabMoreBtn',
  props: {
    headerTitle: {
      type: String,
      default: 'More',
    },
  },
  computed: {
    stuff() {
      return this.headerTitle + '!!!';
    },
  },

  methods: {
    update() {
      this.$forceUpdate();
    },
  }
});

</script>
