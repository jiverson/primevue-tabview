<template>
  <div>
    <TabView>
      <template v-for="(panel, _index) of tabs" :key="_index">
        <TabPanel v-bind="panel.props">
          <template #header>
            <component :is="panel.children.header"></component>
          </template>
          <template #default>
            <component :is="panel" />
          </template>
        </TabPanel>
      </template>
    </TabView>
    <Button @click="onSlotInfo">All Slots</Button>
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots, type VNode } from 'vue';
import TabPanel from 'primevue/tabpanel';
import { BWTabPanel } from '@/components/bwtabview/BWTabPanel';

const slots = useSlots();

const onSlotInfo = () => {
  console.log(tabs.value);
}

const isTabPanel = (vnode: any) => {
  return [TabPanel, BWTabPanel].includes(vnode.type);
}

const tabs = computed(() => {
  return slots.default?.().reduce((tabs, vnode) => {
    if (typeof vnode.type === 'string') {
      // Ignore
      return tabs
    }

    if (isTabPanel(vnode)) {
      tabs.push(vnode)
      return tabs
    }

    if (typeof vnode.type === 'symbol' && Array.isArray(vnode.children)) {
      // Fragment
      vnode.children.forEach((child) => {
        if (isTabPanel(child)) {
          tabs.push(child as VNode)
        }
      })

      return tabs
    }

    // Ignore everything else
    return tabs;
  }, [] as any[])
})
</script>
