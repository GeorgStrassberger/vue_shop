import axios from 'axios'
import { firebaseConfig } from '@/config/firebase'

const state = {
  products: [],
  isLoading: false,
  fetchError: '',
  hasFetchedProducts: false,
}

export const buildProductsUrl = (token = '') => {
  if (!firebaseConfig.databaseURL) {
    throw new Error('VITE_DATABASE_URL fehlt.')
  }

  const authQuery = token ? `?auth=${token}` : ''
  return `${firebaseConfig.databaseURL}/products.json${authQuery}`
}

export const toProductsList = (products) => {
  if (!products || typeof products !== 'object') {
    return []
  }

  return Object.entries(products).map(([id, product]) => ({
    id,
    ...product,
  }))
}

const createShopError = (error, fallbackMessage) => {
  const errorMessage =
    error.response?.data?.error?.message ||
    error.response?.data?.error ||
    fallbackMessage

  if (errorMessage === 'Permission denied') {
    return new Error(
      'Firebase Realtime Database verweigert den Zugriff. Bitte pruefe die Datenbankregeln fuer Lese- und Schreibrechte.',
    )
  }

  return new Error(errorMessage)
}

const mutations = {
  setProducts(state, payload) {
    state.products = payload
  },
  setProductsLoading(state, payload) {
    state.isLoading = payload
  },
  setProductsError(state, payload) {
    state.fetchError = payload
  },
  setHasFetchedProducts(state, payload) {
    state.hasFetchedProducts = payload
  },
  addProduct(state, payload) {
    state.products.unshift(payload)
    state.fetchError = ''
    state.hasFetchedProducts = true
  },
}

const actions = {
  async fetchProducts(context) {
    if (context.state.isLoading) {
      return context.state.products
    }

    if (!context.rootState.auth.token) {
      const authError = new Error('Du bist nicht angemeldet.')
      context.commit('setProductsError', authError.message)
      context.commit('setHasFetchedProducts', true)
      throw authError
    }

    context.commit('setProductsLoading', true)
    context.commit('setProductsError', '')

    try {
      const response = await axios.get(
        buildProductsUrl(context.rootState.auth.token),
      )
      const products = toProductsList(response.data)

      context.commit('setProducts', products)
      context.commit('setHasFetchedProducts', true)

      return products
    } catch (error) {
      context.commit('setProducts', [])
      const shopError = createShopError(
        error,
        'Produkte konnten nicht geladen werden.',
      )
      context.commit('setProductsError', shopError.message)
      context.commit('setHasFetchedProducts', true)
      throw shopError
    } finally {
      context.commit('setProductsLoading', false)
    }
  },
  async storeProduct(context, payload) {
    if (!context.rootState.auth.token) {
      throw new Error('Du bist nicht angemeldet.')
    }

    const productItem = {
      title: payload.title,
      description: payload.description,
      price: Number(payload.price),
      imageUrl: payload.imageUrl?.trim() || '',
    }

    try {
      const response = await axios.post(
        buildProductsUrl(context.rootState.auth.token),
        productItem,
      )
      const storedProduct = {
        id: response.data.name,
        ...productItem,
      }

      context.commit('addProduct', storedProduct)

      return storedProduct
    } catch (error) {
      throw createShopError(error, 'Produkt konnte nicht gespeichert werden.')
    }
  },
}

const getters = {
  products: (state) => state.products,
  productsLoading: (state) => state.isLoading,
  productsError: (state) => state.fetchError,
  hasFetchedProducts: (state) => state.hasFetchedProducts,
  product: (state) => (id) =>
    state.products.find((product) => product.id === id),
}

const shopModule = {
  state,
  mutations,
  actions,
  getters,
}

export default shopModule
