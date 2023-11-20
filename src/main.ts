import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import App from './App.vue'

import './assets/main.css'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'

import Button from 'primevue/button'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'

const app = createApp(App)
app.use(PrimeVue)

// This has to come first, otherwise the TabView component will not be
// ;(TabView as any).methods.isTabPanel = (child: any) => {
//   // return child.type.name === 'TabPanel'
//   return ['TabPanel', 'BWTabPanel'].includes(child.type.name)
// }

app.component('Button', Button)
app.component('TabView', TabView)
app.component('TabPanel', TabPanel)

app.mount('#app')
