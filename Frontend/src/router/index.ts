import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import { useAuthStore } from '@/stores/authStore'
import RfView from '@/views/RfView.vue'
import MfView from '@/views/MfView.vue'
import TiView from '@/views/TiView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/rf',
      name: 'rf',
      component: RfView,
    },
    {
      path: '/mf',
      name: 'mf',
      component: MfView,
    },
    {
      path: '/ti',
      name: 'ti',
      component: TiView,
    }
  ],
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  if (!authStore.isAuthenticated && to.name !== "login") {
    return next({ name: "login" });
  }
  next();
});

export default router
