
<template>
  <div class="card">
    <BWTabView>
      <TabPanel header="Header I">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </p>
      </TabPanel>
      <TabPanel v-for="tab in tabs" :key="tab.title" :header="tab.title">
        <p>{{ tab.content }}</p>
      </TabPanel>
      <TabPanel>
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
      </TabPanel>
      <!-- BW TABPANEL -->
      <BWTabPanel header="BW Header 1">
        <p>
          Huh Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
          dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </p>
      </BWTabPanel>
      <BWTabPanel v-for="(tab, _index ) in tabs" :key="_index" :header="tab.title">
        <p>{{ tab.content }} {{ _index }}</p>
      </BWTabPanel>
    </BWTabView>

    <!--
      <BWTabPanel v-for="tab in tabs" :key="tab.title" :header="tab.title">
        <p>{{ tab.content }}</p>
      </BWTabPanel>
      <BWTabPanel>
        <template #header>
          <div>
            <span>BW - Ioni Bowcher</span>
          </div>
        </template>
        <p class="m-0">
          At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque
          corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in
          culpa qui
          officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita
          distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
        </p>
      </BWTabPanel> -->
  </div>
</template>

<script setup lang="ts">
import BWTabView from '@/components/bwtabview/BWTabView_old.vue'
import { BWTabPanel } from '@/components/bwtabview/BWTabPanel'

import { ref } from 'vue';

const tabs = ref([
  { title: 'Tab 1', content: 'Tab 1 Content' },
  { title: 'Tab 2', content: 'Tab 2 Content' },
  { title: 'Tab 3', content: 'Tab 3 Content' }
]);

</script>
