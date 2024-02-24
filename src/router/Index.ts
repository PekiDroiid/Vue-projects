import { createRouter, createWebHistory } from 'vue-router'
import VLogin from '@/views/VLogin.vue'
import VRegister from '@/views/VRegister.vue'
import VDashboard from '@/views/VDashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      name: 'login',
      component: VLogin
    },
    {
      path: '/register',
      name: 'register',
      component: VRegister
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: VDashboard
    },

  ]
})

export default router
