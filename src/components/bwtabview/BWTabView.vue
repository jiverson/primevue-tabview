<template>
  <div>
    <TabView ref="bwtabview" v-model:activeIndex="active" :scrollable="false">
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

    <!-- TODO: Primevue issue: https://github.com/primefaces/primevue/issues/3498 -->
    <Menu
      id="overlay_menu"
      ref="bwtabmenu"
      :model="tabsMenu"
      :popup="true"
      class="bwtabview-menu"
      @blur="onToggleExpand(false)"
      @focus="onToggleExpand(true)"
    >
      <template #item="{ item }">
        <a v-if="item.props?.header" v-ripple style="padding: 1.25rem; font-weight: 700; color: #6b7280">
          <span class="p-tabview-title">{{ item.props.header }}</span>
        </a>
        <component :is="item.children?.header" v-else />
      </template>
    </Menu>
  </div>
</template>

<script lang="ts">
import { cloneVNode, type ComponentPublicInstance, defineComponent, h, render, type VNode } from 'vue';
import type { MenuItem, MenuItemCommandEvent } from 'primevue/menuitem';
import BWTabMoreBtn from '@/components/bwtabview/BWTabMoreBtn.vue';
import { BWTabPanel } from '@/components/bwtabview/BWTabPanel';
import Menu from 'primevue/menu';
import TabPanel from 'primevue/tabpanel';
import { useMenuResizer } from '@/composables/menuResizer';
/**
 * https://css-tricks.com/container-adapting-tabs-with-more-button/
 * https://dev.to/thomasferro/composition-api-v-renderless-components-let-s-use-vue-3-s-features-to-clean-our-components-n25
 * https://blog.logrocket.com/making-components-dynamic-vue-3/
 * https://stackoverflow.com/questions/74406010/how-to-check-slot-or-vnode-type-in-vue3-render-function
 * https://github.com/primefaces/primevue/issues/3498
 * https://stackoverflow.com/questions/69488256/vue-3-append-component-to-the-dom-best-practice
 * https://github.com/vuejs/core/issues/1082
 */

type MoreBtnProps = InstanceType<typeof BWTabMoreBtn>['$props'];
type MenuType = InstanceType<typeof Menu>;

export default defineComponent({
  name: 'BWTabView',
  components: {
    BWTabMoreBtn,
  },
  props: {
    maxNumberOfTabs: {
      type: Number,
      default: 3,
    },
  },
  data() {
    return {
      active: 0,
      forceResize: () => {},
      hiddenItems: [] as Array<number>,
      stopResize: () => {},
      updateMore: undefined as unknown as (props?: MoreBtnProps) => void,
    };
  },
  computed: {
    tabs(): Array<any> {
      return (
        this.$slots.default?.().reduce((tabs, vnode) => {
          if (typeof vnode.type === 'string') {
            // Ignore
            return tabs;
          }

          if (this.isTabPanel(vnode)) {
            tabs.push(vnode);
            return tabs;
          }

          if (typeof vnode.type === 'symbol' && Array.isArray(vnode.children)) {
            // Fragment
            vnode.children.forEach((child) => {
              if (this.isTabPanel(child)) {
                tabs.push(child as VNode);
              }
            });

            return tabs;
          }

          // Ignore everything else
          return tabs;
        }, [] as Array<any>) ?? []
      );
    },

    tabsMenu(): Array<MenuItem> {
      return this.tabs.reduce((tabs, item, i) => {
        if (!this.hiddenItems.includes(i)) {
          return tabs;
        }

        tabs.push({
          ...item,
          command: (event) => {
            this.onCommand(event, i);
          },
        } as MenuItem);

        return tabs;
      }, []);
    },
  },

  watch: {
    active() {
      this.$nextTick(this.forceResize);
    },
  },

  mounted() {
    const bwTabView = this.$refs.bwtabview as ComponentPublicInstance & { scrollInView: () => void };
    // const bwTabMenu = this.$refs.bwtabmenu as ComponentPublicInstance;
    // TODO: May not need this
    bwTabView.scrollInView = () => {
      /* noop */
    };

    const container = bwTabView.$el.querySelector('.p-tabview-nav-content');
    const primary = container.querySelector('.p-tabview-nav');

    const moreContainer = primary.insertAdjacentElement('beforeend', document.createElement('li'));
    moreContainer.classList.add('p-tabview-header', 'p-tabview-nav-more');

    let moreComponent = h(BWTabMoreBtn, {
      onClickMore: this.onToggleMenu,
    });

    this.updateMore = (props?: MoreBtnProps) => {
      moreComponent = props ? cloneVNode(moreComponent, props) : moreComponent;
      render(moreComponent, moreContainer);
    };
    this.updateMore();

    const primaryItems = primary.querySelectorAll('.p-tabview-nav > li.p-tabview-header:not(.p-tabview-nav-more)');

    const { hiddenItems, stop, forceResize } = useMenuResizer(bwTabView, primaryItems, moreContainer);
    this.hiddenItems = hiddenItems;
    this.forceResize = forceResize;
    this.stopResize = stop;
  },

  unmounted() {
    this.stopResize();
  },

  methods: {
    isTabPanel(vnode: any) {
      return [TabPanel, BWTabPanel].includes(vnode.type);
    },

    onCommand(event: MenuItemCommandEvent, index: number) {
      console.log(event);
      this.active = index;
      const headerTitle = this.tabs[index].props.header ?? this.tabs[index].children?.header;
      this.updateMore({ headerTitle });
    },

    onToggleExpand(expanded: boolean) {
      this.updateMore({ expanded });
    },

    onToggleMenu(event: Event) {
      (this.$refs.bwtabmenu as MenuType).toggle(event);
    },
  },
});
</script>

<style lang="css">
.p-tabview .p-tabview-nav li .p-tabview-nav-link:not(.p-disabled):focus {
  outline: 0;
}

.p-tabview .p-tabview-nav li .p-tabview-nav-link:not(.p-disabled):focus:after {
  content: '';
  display: block;
  position: absolute;
  inset: 0;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border: 3px solid var(--primary-200);
  border-bottom-width: 0;
}

.p-tabview .p-tabview-nav li .p-tabview-nav-link {
  height: 100%;
}

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
