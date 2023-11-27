
<template>
  <div style="background-color: white; padding: 2rem">
    <BWTabView style="border: 1px solid red">
      <BWTabPanel v-for=" tab in 7" :key="tab" :header="`Header ${tab}`">
        <p>{{ tab }} Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita similique sapiente quas, illo
          alias sunt repellendus aut ab suscipit, nobis inventore cumque perspiciatis libero incidunt magnam possimus
          itaque quam delectus.</p>
      </BWTabPanel>
      <TabPanel>
        <template #header>
          <div class="bwtabview-menuitem" style="font-weight: 700; color: blue; line-height: 1;white-space: nowrap;">Amy Rodchester</div>
        </template>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </TabPanel>
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
