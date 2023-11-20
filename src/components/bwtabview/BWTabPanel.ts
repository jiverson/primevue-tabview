import { defineComponent, h, reactive } from 'vue'
import TabPanel from 'primevue/tabpanel'

export const BWTabPanel = defineComponent({
  name: 'BWTabPanel',
  props: ['header'] as unknown as undefined,
  setup(props, { slots }) {
    const data = reactive({ header: 'foo' })

    console.log('BWTabPanel', (props as any).header)

    return () => {
      if (slots.default) {
        return slots.default(data)
      }
    }

    // return () =>
    //   slots.default?.({
    //     props: {
    //       header: 'internal header'
    //     }
    //   })

    // return () => {
    //   if (slots.default) {
    //     const a = slots.default()
    //     console.log('a', a)
    //     return a
    //   }
    // }

    // return () => {
    //   return h(TabPanel, null, { default: () => slots.default?.() })
    // }

    // return () => {
    //   return h(TabPanel, null, { default: () => 'something' })
    // }

    // return () =>
    //   h(TabPanel, null, {
    //     default: () => 'foo',
    //     header: () => 'internal header'
    //   })
  }
})
