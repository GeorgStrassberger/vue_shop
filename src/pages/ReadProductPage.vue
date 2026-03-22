<template>
  <TheShopLayout>
    <template #default>
      <div class="d-flex flex-wrap justify-content-between align-items-center gap-3 mt-4 mb-4">
        <h1 class="mb-0">Produktdetails</h1>
        <button class="btn btn-lg bg-vue" @click="$router.go(-1)">Zurück</button>
      </div>

      <div v-if="isLoading" class="card border-0 shadow-sm">
        <div class="card-body py-5 text-center">
          <div class="spinner-border text-vue2 mb-3"></div>
          <div>Produkt wird geladen...</div>
        </div>
      </div>

      <div v-else-if="error" class="alert alert-danger">
        {{ error }}
      </div>

      <div v-else-if="!product" class="card border-0 shadow-sm">
        <div class="card-body py-5 text-center">
          <h2 class="h4 mb-3">Produkt nicht gefunden</h2>
          <router-link to="/shop" class="btn bg-vue2">
            Zurueck zum Shop
          </router-link>
        </div>
      </div>

      <div v-else class="card border-0 shadow-sm">
        <div class="row g-0">
          <div class="col-md-4">
            <img
              :src="productImage"
              :alt="product.title"
              class="card-img h-100 object-fit-cover"
            />
          </div>

          <div class="col-md-8">
            <div class="card-body">
              <div class="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-4">
                <h5 class="card-title mb-0">{{ product.title }}</h5>
                <button class="btn bg-vue2" @click="addToCart(product.id)">
                  In den Warenkorb - {{ formattedPrice }}
                </button>
              </div>

              <p class="card-text mb-0">{{ product.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <div v-if="relatedProducts.length" class="card border-0 shadow-sm mt-4">
        <div class="card-body">
          <h4 class="mb-3">Das koennte dich auch interessieren</h4>

          <div class="d-flex flex-wrap gap-2">
            <router-link
              v-for="relatedProduct in relatedProducts"
              :key="relatedProduct.id"
              :to="{ name: 'ReadProduct', params: { id: relatedProduct.id } }"
              class="btn btn-outline-secondary"
            >
              {{ relatedProduct.title }}
            </router-link>
          </div>
        </div>
      </div>
    </template>
  </TheShopLayout>
</template>

<script>
import TheShopLayout from '@/layouts/TheShopLayout.vue'
import { resolveProductImage } from '@/utils/product-images'

export default {
  name: 'ReadProductPage',
  components: {
    TheShopLayout,
  },
  props: {
    id: String,
  },
  data() {
    return {
      error: '',
      isLoading: false,
    }
  },
  computed: {
    formattedPrice() {
      return `${Number(this.product?.price || 0).toFixed(2)} €`
    },
    productImage() {
      return resolveProductImage(this.product)
    },
    product() {
      return this.$store.getters.product(this.id)
    },
    relatedProducts() {
      return this.$store.getters.products
        .filter((product) => product.id !== this.id)
        .slice(0, 3)
    },
  },
  created() {
    this.ensureProduct()
  },
  watch: {
    id() {
      this.ensureProduct()
    },
  },
  methods: {
    addToCart(productId) {
      this.$store.dispatch('addItemToCart', {
        productId,
      })
    },
    async ensureProduct() {
      if (this.product || this.isLoading) {
        return
      }

      this.isLoading = true
      this.error = ''

      try {
        await this.$store.dispatch('fetchProducts')

        if (!this.$store.getters.product(this.id)) {
          this.error = 'Das Produkt konnte nicht gefunden werden.'
        }
      } catch (error) {
        this.error = error.message
      } finally {
        this.isLoading = false
      }
    },
  },
}
</script>

<style scoped>
</style>
