import { defineComponent, type PropType } from 'vue';

import { type TabPanelProps } from 'primevue/tabpanel';

export const BWTabPanel = defineComponent({
  props: {
    header: { type: String, default: undefined },
    /* eslint-disable vue/require-default-prop */
    headerStyle: null,
    headerClass: null,
    contentStyle: null,
    contentClass: null,
    /* eslint-enable vue/require-default-prop */
    disabled: { type: Boolean, default: false },
    pt: {
      default: undefined,
      type: Object as PropType<TabPanelProps['pt']>,
    },
  },
  setup(_props, { slots }: any) {
    return () => slots.default?.();
  },
});
