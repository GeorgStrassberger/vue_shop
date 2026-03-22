import store from '@/store'

const appRoutes = [
  {
    path: '/',
    name: 'Home',
    alias: '/home',
    component: () => import('@/pages/HomePage.vue'),
    beforeEnter: (to, from, next) => {
      if (store.getters.isAuthenticated) {
        next('/shop')
      } else {
        next()
      }
    },
  },
]

export default appRoutes
