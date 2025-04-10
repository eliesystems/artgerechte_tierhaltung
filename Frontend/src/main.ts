import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/authStore'

const startApp = async () => {
    const app = createApp(App);
    app.use(createPinia())
    const authStore = useAuthStore();
    await authStore.initKeycloak();
    app.use(router)
    app.mount('#app')
}

startApp();
