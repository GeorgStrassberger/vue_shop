<template>
  <div class="card h-100 shadow-sm">
    <img :src="productImage" class="card-img-top" :alt="product.title" />

    <div class="card-body d-flex flex-column">
      <h5 class="card-title">{{ product.title }}</h5>
      <p class="card-text">{{ shortenedDescription }}</p>

      <div class="mt-auto">
        <div class="lead mb-3">
          <strong class="text-vue">{{ formattedPrice }}</strong>
        </div>

        <div class="d-flex gap-2">
          <router-link
            :to="{ name: 'ReadProduct', params: { id: product.id } }"
            class="btn btn-outline-secondary flex-fill"
          >
            Details
          </router-link>

          <button
            type="button"
            class="btn bg-vue2 flex-fill"
            @click="$emit('add-to-cart', product.id)"
          >
            In den Warenkorb
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { resolveProductImage } from '@/utils/product-images'

export default {
  name: 'ProductListItem',
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  emits: {
    'add-to-cart': (productId) => typeof productId === 'string',
  },
  computed: {
    formattedPrice() {
      return `${Number(this.product.price || 0).toFixed(2)} €`
    },
    productImage() {
      return resolveProductImage(this.product)
    },
    shortenedDescription() {
      if (this.product.description.length < 80) {
        return this.product.description
      }

      return this.product.description.slice(0, 80) + '...'
    },
  },
}
</script>

<style scoped>
</style>
