<template>
  <TheShopLayout>
    <template #default>
      <div class="d-flex flex-wrap justify-content-between align-items-center gap-3 mt-4 mb-4">
        <div>
          <h1 class="mb-1">Shop</h1>
          <p class="text-muted mb-0">{{ subtitle }}</p>
        </div>

        <router-link to="/shop/create/product" class="btn bg-vue2">
          Neuer Artikel
        </router-link>
      </div>

      <div v-if="isLoading" class="card border-0 shadow-sm">
        <div class="card-body py-5 text-center">
          <div class="spinner-border text-vue2 mb-3"></div>
          <div>Produkte werden geladen...</div>
        </div>
      </div>

      <div
        v-else-if="error"
        class="alert alert-danger d-flex flex-wrap justify-content-between align-items-center gap-3"
      >
        <span>{{ error }}</span>
        <button type="button" class="btn btn-sm btn-outline-danger" @click="retryLoad()">
          Erneut laden
        </button>
      </div>

      <div v-else-if="!products.length" class="card border-0 shadow-sm">
        <div class="card-body py-5 text-center">
          <h2 class="h4 mb-3">Noch keine Produkte vorhanden</h2>
          <p class="text-muted mb-4">
            Lege deinen ersten Artikel an, damit die Startseite nicht leer bleibt.
          </p>
          <router-link to="/shop/create/product" class="btn bg-vue2">
            Erstes Produkt anlegen
          </router-link>
        </div>
      </div>

      <div v-else class="row g-4">
        <div class="col-md-6 col-xl-4" v-for="product in products" :key="product.id">
          <ProductListItem :product="product" @add-to-cart="addToCart" />
        </div>
      </div>
    </template>
  </TheShopLayout>
</template>

<script>
import ProductListItem from '@/components/shop/ProductListItem.vue'
import TheShopLayout from '@/layouts/TheShopLayout.vue'

export default {
  name: 'ShopPage',
  components: {
    ProductListItem,
    TheShopLayout,
  },
  computed: {
    error() {
      return this.$store.getters.productsError
    },
    hasFetchedProducts() {
      return this.$store.getters.hasFetchedProducts
    },
    isLoading() {
      return this.$store.getters.productsLoading
    },
    products() {
      return this.$store.getters.products
    },
    subtitle() {
      if (this.products.length === 1) {
        return '1 Produkt im Shop'
      }

      if (this.products.length > 1) {
        return `${this.products.length} Produkte im Shop`
      }

      return 'Hier erscheinen deine Produkte nach dem Login.'
    },
  },
  created() {
    this.ensureProducts()
  },
  methods: {
    addToCart(productId) {
      this.$store.dispatch('addItemToCart', { productId })
    },
    async ensureProducts(force = false) {
      if (this.isLoading || (!force && this.hasFetchedProducts)) {
        return
      }

      try {
        await this.$store.dispatch('fetchProducts')
      } catch {
        // Fehler wird bereits im Store hinterlegt und im Template angezeigt.
      }
    },
    retryLoad() {
      this.ensureProducts(true)
    },
  },
}
</script>

<style scoped>
</style>
