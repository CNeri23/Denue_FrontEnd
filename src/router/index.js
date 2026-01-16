import { createRouter, createWebHistory } from 'vue-router'
import DenueView from '../views/denue.vue'

const routes = [
  {
    path: '/',
    redirect: '/denue'
  },
  {
    path: '/denue',
    name: 'denue',
    component: DenueView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
