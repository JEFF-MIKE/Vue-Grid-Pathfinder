import { createApp } from 'vue'
import store from './store/store'
import App from './App.vue'
import mitt from 'mitt'

const emitter = mitt();
const app = createApp(App).use(store)
  
app.config.globalProperties.emitter = emitter;

app.mount('#app')
