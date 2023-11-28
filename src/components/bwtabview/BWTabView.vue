<template>
  <div>
    <TabView ref="bwtabview" :scrollable="false" v-model:activeIndex="active">
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

    <!-- TODO: Primevue issue: https://github.com/primefaces/primevue/issues/3498 -->
    <Menu ref="menu" id="overlay_menu" :model="tabsMenu" :popup="true" class="bwtabview-menu">
      <template #item="{ item, props }">
        <a v-if="item.props?.header" style="padding: 1.25rem; font-weight: 700; color: #6b7280;" v-ripple v-bind="props.action">
          <span class="p-tabview-title">{{ item.props.header }}</span>
        </a>
        <component v-else :is="item.children?.header" />
      </template>
    </Menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, type VNode, type ComponentPublicInstance } from 'vue';
import TabPanel from 'primevue/tabpanel';
import { BWTabPanel } from '@/components/bwtabview/BWTabPanel';
import { useResizeObserver } from '@vueuse/core';
import type { MenuItem, MenuItemCommandEvent } from 'primevue/menuitem';
/**
 * https://css-tricks.com/container-adapting-tabs-with-more-button/
 * https://dev.to/thomasferro/composition-api-v-renderless-components-let-s-use-vue-3-s-features-to-clean-our-components-n25
 * https://blog.logrocket.com/making-components-dynamic-vue-3/
 * https://stackoverflow.com/questions/74406010/how-to-check-slot-or-vnode-type-in-vue3-render-function
 * https://github.com/primefaces/primevue/issues/3498
 */

//  {
//   "action": {
//     "class": "p-menuitem-link",
//     "tabindex": "-1",
//     "aria-hidden": true,
//     "data-pc-section": "action"
//   },
//   "icon": {
//     "class": "p-menuitem-icon",
//     "data-pc-section": "icon"
//   },
//   "label": {
//     "class": "p-menuitem-text",
//     "data-pc-section": "label"
//   }
// }


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
      active: 0,
      hiddenItems: [] as any[],
      resizer: () => {},
    }
  },
  mounted() {
    const bwTabView = this.$refs.bwtabview as ComponentPublicInstance;
    if (!bwTabView) {
      return;
    }

    (bwTabView as any).scrollInView = () => {
      console.log('override');
    }

    const bwTabMenu = this.$refs.menu as ComponentPublicInstance;
    if (!bwTabMenu) {
      return;
    }

    const container = bwTabView.$el.querySelector('.p-tabview-nav-content');
    const primary = container.querySelector('.p-tabview-nav');
    const primaryItems = container.querySelectorAll('.p-tabview-nav > li.p-tabview-header');

    useResizeObserver(bwTabView, (entries) => {

      this.resizer = () => {
        console.log('resizer');
        const entry = entries[0];
        const { width } = entry.contentRect;
        let primaryWidth = width;
        if (!primaryWidth) {
          primaryWidth = bwTabView.$el.offsetWidth;
        }
        let stopWidth = moreBtn?.offsetWidth

        primaryItems.forEach((item: any) => {
          item.classList.remove('hidden')
        })

        this.hiddenItems = [];
        console.log(primaryItems)


        primaryItems.forEach((item: any, i: number) => {
          if (primaryWidth >= (stopWidth + item.offsetWidth)) {
            stopWidth += item.offsetWidth
          } else {
            console.log('hidden', i)
            item.classList.add('hidden')
            this.hiddenItems.push(i)
          }
        })

        console.log(this.hiddenItems)

        if (!this.hiddenItems.length) {
          moreBtn?.classList.add('hidden')
        } else {
          moreBtn?.classList.remove('hidden')
        }
      }

      this.resizer();
    })

    primary?.insertAdjacentHTML('beforeend', `
      <li class="p-tabview-header p-tabview-nav-more">
        <a class="p-tabview-nav-link p-tabview-header-action">
          <span class="p-tabview-title" data-pc-section="headertitle">More</span>
        </a>
      </li>
    `);

    const moreLi = container.querySelector('.p-tabview-nav-more');
    const moreBtn = moreLi?.querySelector('a');

    moreBtn?.addEventListener('click', (e: MouseEvent) => {
      e.preventDefault()
      this.onToggleMenu(e);
      // container.classList.toggle('p-tabview-secondaary')
      // moreBtn.setAttribute('aria-expanded', `${container.classList.contains('p-tabview-secondary')}`)
    })
  },
  computed: {
    tabsMenu1(): Array<MenuItem> {
      return this.tabs.map((item, i) => {
        console.log(this.hiddenItems[0])
        return {
          ...item,
          command: (event) => { this.onCommand(event, i)}
        }
      });
    },
    tabsMenu(): Array<MenuItem> {
      return this.tabs.reduce((tabs, item, i) => {
        // console.log(this.hiddenItems[0], i)
        if (!this.hiddenItems.includes(i)) {
          return tabs;
        }

        tabs.push(
          {
            ...item,
            command: (event) => { this.onCommand(event, i)}
          } as MenuItem
        )

        return tabs;
      }, []);
    },


    tabs(): Array<any> {
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
      }, [] as Array<any>) ?? []
    }
  },

  methods: {
    isTabPanel(vnode: any) {
      return [TabPanel, BWTabPanel].includes(vnode.type);
    },

    onCommand(event: MenuItemCommandEvent, index: number) {
      console.log(index, event);
      this.active = index;
    },

    onSlotInfo() {
      console.log(this.tabs);
      console.log(this.tabsMenu)
    },

    onToggleMenu(event: any) {
      // console.log('menu');
      (this.$refs.menu as any).toggle(event);
    },
  },

  watch: {
    active() {
      console.log('active')

      this.$nextTick(() => {
        this.resizer();
      })
    }
  }
})
</script>

<style lang="css">
.bwtabview-menu .bwtabview-menuitem {
  padding: 1.25rem;
}

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

.hidden {
  display: none;
}
/*
.p-tabview-secondary {}

.p-tabview-nav {}

.p-tabview-nav-more {} */
</style>

