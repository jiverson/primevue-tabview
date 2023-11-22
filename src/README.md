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
