import { createRouter, createWebHistory } from 'vue-router'
import store from '@/stores'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/pages/HomePage.vue'),
      beforeEnter: (to, from, next) => {
        if (store.getters.isAuthenticated) {
          next('/shop')
        } else {
          next()
        }
      },
    },
    {
      path: '/shop',
      component: () => import('@/pages/ShopPage.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/shop/create/product',
      component: () => import('@/pages/CreateProductPage.vue'),
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
