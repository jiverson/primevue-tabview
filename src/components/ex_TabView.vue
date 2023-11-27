
<template>
  <div style="background-color: white; padding: 2rem">
    <BWTabView style="border: 1px solid red">
      <BWTabPanel v-for=" tab in 6" :key="tab" :header="`Header ${tab}`">
        <p>{{ tab }} Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita similique sapiente quas, illo
          alias sunt repellendus aut ab suscipit, nobis inventore cumque perspiciatis libero incidunt magnam possimus
          itaque quam delectus.</p>
      </BWTabPanel>
    </BWTabView>

    <div style="display: flex; gap: 1rem; padding-top: 1rem">
      <Button @click="onAddTab">Add Tabs</Button>
      <Button @click="onFilterTab">Filter Tabs</Button>
      <Button @click="onResetTab">Reset Tabs</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import BWTabView from '@/components/bwtabview/BWTabView.vue'
import { BWTabPanel } from '@/components/bwtabview/BWTabPanel'

import { ref, computed } from 'vue';

const baseTabs = [
  { title: 'Tab 1', content: 'Tab 1 Content' },
  { title: 'Tab 2', content: 'Tab 2 Content' },
  { title: 'Tab 3', content: 'Tab 3 Content' }
];

const allTabs = ref(baseTabs.concat());
const filtered = ref('')

const onResetTab = () => {
  filtered.value = '';
  allTabs.value = baseTabs.concat();
}

const onFilterTab = () => {
  filtered.value = 'Tab 2';
}

const onAddTab = () => {
  allTabs.value.push({ title: 'Tab 4', content: 'Tab 4 Content' });
}

const tabs = computed(() => {
  return allTabs.value.filter(tab => tab.title !== filtered.value)
});

</script>
