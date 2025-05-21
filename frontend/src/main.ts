import './assets/index.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowLeft, faPencil, faCirclePlus, faTrashCan } from '@fortawesome/free-solid-svg-icons'

library.add(faArrowLeft)
library.add(faPencil)
library.add(faCirclePlus)
library.add(faTrashCan)

const app = createApp(App)

app.use(router)

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
