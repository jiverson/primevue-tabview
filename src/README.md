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

```vue
<Menu ref="menu" id="overlay_menu" :model="tabsMenu" :popup="true">
  <template #item="{ item, props }">
    <a style="padding: 1.25rem; font-weight: 700; color: #6b7280;" v-ripple v-bind="props.action">
      <span class="p-tabview-title">{{ item.label }}</span>
    </a>
  </template>
</Menu>
```

```typescript
const primary = container.querySelector('.p-tabview-nav');

primary?.insertAdjacentHTML('beforeend', `
  <li class="p-tabview-header p-tabview-nav-more">
    <a class="p-tabview-nav-link p-tabview-header-action">
      <span class="p-tabview-title" data-pc-section="headertitle">More</span>
    </a>
    <ul class="p-tabview-nav p-tabview-nav-more-list">
      ${primary.innerHTML}
    </ul>
  </li>
`);

const container = bwTabView.$el.querySelector('.p-tabview-nav-content');
const primaryItems = container.querySelectorAll('.p-tabview-nav > li');
const primary = container.querySelector('.p-tabview-nav');

const secondary = container.querySelector('.p-tabview-nav-more-list');
const secondaryItems = secondary?.querySelectorAll('li');
const allItems = container.querySelectorAll('.p-tabview-nav > li');
const moreLi = container.querySelector('.p-tabview-nav-more');
const moreBtn = moreLi?.querySelector('a');


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
