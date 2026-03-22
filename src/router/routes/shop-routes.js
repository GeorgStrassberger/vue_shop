import CreateProductPage from '@/pages/CreateProductPage.vue'

const shopRoutes = [
  {
    path: '/shop',
    name: 'Shop',
    component: () => import('@/pages/ShopPage.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/shop/create/product',
    name: 'CreateProduct',
    component: CreateProductPage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/shop/read/product/:id',
    name: 'ReadProduct',
    component: () => import('@/pages/ReadProductPage.vue'),
    props: true,
    meta: {
      requiresAuth: true,
    },
  },
]

export default shopRoutes
