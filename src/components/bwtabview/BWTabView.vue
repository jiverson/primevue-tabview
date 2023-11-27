<template>
  <div>
    <TabView ref="bwtabview" :scrollable="false">
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
    <Button type="button" icon="pi pi-ellipsis-v" @click="onToggleMenu" aria-haspopup="true"
      aria-controls="overlay_menu" />
    <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
  </div>
</template>

<script lang="ts">
import { defineComponent, type VNode, type ComponentPublicInstance } from 'vue';
import TabPanel from 'primevue/tabpanel';
import TabView from 'primevue/tabview';
import { BWTabPanel } from '@/components/bwtabview/BWTabPanel';
import { useResizeObserver } from '@vueuse/core';
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
  data() {
    return {
      items: [
        {
          label: 'New',
          icon: 'pi pi-fw pi-plus',
          command: () => {
            console.log('New');
          }
        },
        {
          label: 'Open',
          icon: 'pi pi-fw pi-download',
          command: () => {
            console.log('Open');
          }
        },
        {
          label: 'Undo',
          icon: 'pi pi-fw pi-refresh',
          command: () => {
            console.log('Undo');
          }
        }
      ]
    }
  },
  mounted() {
    console.log(this.$refs.bwtabview);

    const bwTabView = this.$refs.bwtabview as ComponentPublicInstance;
    if (!bwTabView) {
      return;
    }

    useResizeObserver(bwTabView, () => {
      console.log('resize');
    })

    const container = this.getElement(this.$refs.bwtabview).querySelector('.p-tabview-nav-content');
    if (!container) {
      return;
    }

    const primary = container.querySelector('.p-tabview-nav');
    const primaryItems = container.querySelectorAll('.p-tabview-nav > li:not(.p-tabview-nav-more)');

    primary?.insertAdjacentHTML('beforeend', `
      <li class="p-tabview-header p-tabview-nav-more">
        <a class="p-tabview-nav-link p-tabview-header-action" @click="onToggleMenu">
          <span class="p-tabview-title" data-pc-section="headertitle">More</span>
        </a>
        <ul class="p-tabview-nav p-tabview-nav-more-list">
          ${primary.innerHTML}
        </ul>
      </li>
    `);

    const secondary = container.querySelector('.p-tabview-nav-more-list');
    const secondaryItems = secondary?.querySelectorAll('li');
    const allItems = container.querySelectorAll('.p-tabview-nav > li');
    const moreLi = container.querySelector('.p-tabview-nav-more');
    const moreBtn = moreLi?.querySelector('a');

    // moreBtn?.addEventListener('click', (e) => {
    //   e.preventDefault()
    //   this.onToggleMenu(e);
    //   console.log('click');
    //   // container.classList.toggle('p-tabview-secondary')
    //   // moreBtn.setAttribute('aria-expanded', `${container.classList.contains('p-tabview-secondary')}`)
    // })

    const doAdapt = () => {
      // reveal all items for the calculation
      allItems.forEach((item) => {
        item.classList.remove('--hidden')
      })

      // hide items that won't fit in the Primary
      let stopWidth = moreBtn?.offsetWidth
      let hiddenItems = [] as any[]
      const primaryWidth = primary?.offsetWidth
      primaryItems.forEach((item, i) => {
        if (primaryWidth >= stopWidth + item.offsetWidth) {
          stopWidth += item.offsetWidth
        } else {
          item.classList.add('--hidden')
          hiddenItems.push(i)
        }
      })

      // toggle the visibility of More button and items in Secondary
      if (!hiddenItems.length) {
        moreLi?.classList.add('--hidden')
        container.classList.remove('--show-secondary')
        moreBtn?.setAttribute('aria-expanded', 'false')
      }
      else {
        secondaryItems?.forEach((item, i) => {
          if (!hiddenItems.includes(i)) {
            item.classList.add('--hidden')
          }
        })
      }
    }

    window.addEventListener('resize', doAdapt)
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
      (this.$refs.menu as any).toggle();
    },

    getElement(item: any): Element {
      return (item as any).$el;
    },

    isTabPanel(vnode: any) {
      return [TabPanel, BWTabPanel].includes(vnode.type);
    },

    onToggleMenu(event: any) {
      console.log('menu');
      console.log(this.$refs.menu);
      (this.$refs.menu as any).toggle(event);
      // menu.value.toggle(event);
    }
  },
})
</script>

<style lang="css">
.p-tabview-nav-content {
  position: relative;
  /* overflow: visible; */
}

.p-tabview-nav-content.p-tabview-secondary .p-tabview-nav-more-list {
  display: block;
}

.p-tabview-nav-more-list {
  display: none;
  position: absolute;
  top: calc(100% - 2px);
  /* right: 0; */
}

.p-tabview-nav-more-list .show {
  display: block;
}

.p-tabview-secondary {}

.p-tabview-nav {}

.p-tabview-nav-more {}
</style>

