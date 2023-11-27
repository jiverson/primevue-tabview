# README

```vue
<template v-for="(_, slot, _index) in $slots" #[slot]="scope" :key="_index">
  <slot v-if="scope" :name="slot" v-bind="scope" />
  <slot v-else :name="slot" />
</template>
```

```vue
<template v-for="(item, _index) of tabs" :key="_index">
  <TabPanel v-bind="item.props"><component :is="item" /></TabPanel>
</template>
```

```vue
<template v-for="(item, _index) of tabs" :key="_index">
  <TabPanel v-bind="item.props">
    <component :is="item" />
  </TabPanel>
</template>
```

```typescript
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
```
