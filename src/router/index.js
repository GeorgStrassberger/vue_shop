import { createRouter, createWebHashHistory } from 'vue-router'
import NotFoundPage from '@/pages/NotFoundPage.vue'
import routes from './routes'
import store from '../store'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    ...routes,
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFoundPage,
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router
