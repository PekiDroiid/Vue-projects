import { createRouter, createWebHistory } from 'vue-router'
import TaskListVue from '@/components/TaskList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Lista',
      component: TaskListVue
    }
  ]
})

export default router
