import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createMemoryHistory, createRouter } from 'vue-router'
import './style.css'
import App from './App.vue'

const pinia = createPinia();

import CreateFormPage from './components/pages/CreateFormPage.vue'
import ListPage from './components/pages/ListPage.vue'

const routes = [
  { path: '/', component: ListPage },
  { path: '/create', component: CreateFormPage },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})


createApp(App).use(pinia).use(router).mount('#app')
