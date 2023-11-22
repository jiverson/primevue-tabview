
<template>
  <div class="card">
    <BWTabView>
      <BWTabPanel header="Header I">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </p>
      </BWTabPanel>
      <BWTabPanel v-for="tab in tabs" :key="tab.title" :header="tab.title">
        <p>{{ tab.content }}</p>
      </BWTabPanel>
      <BWTabPanel>
        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
          aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          Nemo enim
          ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui
          ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
        </p>
      </BWTabPanel>
      <BWTabPanel header="Header II">
        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
          aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          Nemo enim
          ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui
          ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
        </p>
      </BWTabPanel>
      <BWTabPanel>
        <template #header>
          <div>
            <span>Ioni Bowcher</span>
          </div>
        </template>
        <p>
          At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque
          corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in
          culpa qui
          officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita
          distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
        </p>
      </BWTabPanel>
    </BWTabView>

    <Button @click="onAddTab">Add Tabs</Button>
    <Button @click="onFilterTab">Filter Tabs</Button>
    <Button @click="onResetTab">Reset Tabs</Button>
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
