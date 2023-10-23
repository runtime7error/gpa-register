import './assets/main.css'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import PrimeVue from 'primevue/config'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import ToastService from 'primevue/toastservice'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Toast from 'primevue/toast'
import 'primevue/resources/themes/lara-light-teal/theme.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import router from './router'
import App from './App.vue'

createApp(App)
  .use(PrimeVue)
  .use(ToastService)
  .use(router)
  .component('Toast', Toast)
  .component('DataTable', DataTable)
  .component('Column', Column)
  .component('Dialog', Dialog)
  .component('Button', Button)
  .component('InputText', InputText)
  .component('InputNumber', InputNumber)
  .mount('#app')
