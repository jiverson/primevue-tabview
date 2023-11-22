<template>
  <div>
    <TabView>
      <!-- <template v-for="(_, name) of $slots" #[name]="slotData">
        <slot :name="name" v-bind="slotData || {}" />
      </template> -->

      <!-- <template v-if="$slots.default">
        <template v-for="(_, name, _index) in $slots.default()" :key="_index">
          <slot :name="name" v-bind="slotData || {}" />
        </template>
      </template> -->

      <template v-for="(item, _index) of tabs" :key="_index">
        <TabPanel v-bind="item.props">
          <component :is="item" />
        </TabPanel>
      </template>

      <!-- <slot>

      </slot> -->

      <!-- <template #default="{ slotProps }">
      <TabPanel header="someheader"></TabPanel>
    </template> -->


      <!-- <TabPanel header=" Header I">
      <p class="m-0">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
        est laborum.
      </p>
    </TabPanel> -->
    </TabView>
    <Button @click="onSlotInfo">All Slots</Button>
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';
import TabPanel from 'primevue/tabpanel';
import { BWTabPanel } from '@/components/bwtabview/BWTabPanel';

const slots = useSlots();

console.log(slots)

const onSlotInfo = () => {
  const tabs = slots.default?.().map((slot) => {
    console.log(slot)
    return {
      title: slot.props?.header,
      content: slot.children
    }
  })

  console.log(tabs);
}

const tabs = computed(() => {
  return slots.default?.().reduce((tabs, vnode) => {
    if (typeof vnode.type === 'string') {
      console.log('String')
      return tabs
    }

    if ([BWTabPanel, TabPanel].includes(vnode.type as any)) {
      tabs.push(vnode)
      console.log('In')
      return tabs
    }

    if (typeof vnode.type === 'symbol' && Array.isArray(vnode.children)) {
      console.log('Fragment')
      // Fragment
      vnode.children.forEach((child) => {
        if ([BWTabPanel, TabPanel].includes((child as any).type)) {
          console.log('Fragment child')
          tabs.push(child)
        }
      })

      return tabs
    }

    // Ignore everything else
    return tabs;
  }, [] as any[])
})



// const tabs = computed(() => {
//   return slots.default?.().map((slot) => {
//     console.log(slot)
//     return {
//       title: slot.props?.header,
//       content: slot.children
//     }
//   });
// })
</script>
