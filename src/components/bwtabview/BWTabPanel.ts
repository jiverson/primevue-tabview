import { defineComponent } from 'vue'

export const BWTabPanel = defineComponent({
  name: 'BWTabPanel',
  props: ['header'] as unknown as undefined,
  setup(props, { slots }) {
    console.log('BWTabPanel', (props as any).header)
    // console.log(slots)

    return () => {
      return slots.default?.()
    }
  }
})
