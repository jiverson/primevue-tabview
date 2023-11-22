<template>
  <div>
    <TabView :scrollable="false">
      <template v-for="(panel, _index) of tabs" :key="_index">
        <TabPanel v-bind="panel.props">
          <template #header>
            <component :is="panel.children?.header"></component>
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

<script lang="ts">
import { defineComponent, type VNode } from 'vue';
import TabPanel from 'primevue/tabpanel';
import { BWTabPanel } from '@/components/bwtabview/BWTabPanel';
/**
 * https://css-tricks.com/container-adapting-tabs-with-more-button/
 * https://dev.to/thomasferro/composition-api-v-renderless-components-let-s-use-vue-3-s-features-to-clean-our-components-n25
 * https://blog.logrocket.com/making-components-dynamic-vue-3/
 * https://stackoverflow.com/questions/74406010/how-to-check-slot-or-vnode-type-in-vue3-render-function
 */

export default defineComponent({
  name: 'BWTabView',
  props: {
    maxNumberOfTabs: {
      type: Number,
      default: 3
    },
  },
  created() {
    console.log('BWTabView created');
  },
  computed: {
    tabs() {
      return this.$slots.default?.().reduce((tabs, vnode) => {
        if (typeof vnode.type === 'string') {
          // Ignore
          return tabs
        }

        if (this.isTabPanel(vnode)) {
          tabs.push(vnode)
          return tabs
        }

        if (typeof vnode.type === 'symbol' && Array.isArray(vnode.children)) {
          // Fragment
          vnode.children.forEach((child) => {
            if (this.isTabPanel(child)) {
              tabs.push(child as VNode)
            }
          })

          return tabs
        }

        // Ignore everything else
        return tabs;
      }, [] as any[])
    }
  },

  methods: {
    onSlotInfo() {
      console.log(this.tabs);
    },

    isTabPanel(vnode: any) {
      return [TabPanel, BWTabPanel].includes(vnode.type);
    },
  },
})
</script>
