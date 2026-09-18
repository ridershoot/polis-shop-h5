import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserView from '../views/UserView.vue'
import BridgeDemoView from '../views/BridgeDemoView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/user',
      name: 'user',
      component: UserView,
    },
    {
      path: '/bridge-demo',
      name: 'bridge-demo',
      component: BridgeDemoView,
    },
  ],
})

export default router
