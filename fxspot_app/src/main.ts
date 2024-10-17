import { createApp } from 'vue'
import './app/assets/tailwind.css'
import router from './app/providers/router'
import App from './app/App.vue'

createApp(App).use(router).mount('#app')
