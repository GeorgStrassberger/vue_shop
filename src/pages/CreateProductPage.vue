<template>
  <TheShopLayout>
    <template #default>
      <div class="d-flex flex-wrap justify-content-between align-items-center gap-3 mt-4 mb-4">
        <div>
          <h1 class="mb-1">Neuer Artikel</h1>
          <p class="text-muted mb-0">
            Erfasse Titel, Preis und Beschreibung und speichere dann dein Produkt.
          </p>
        </div>

        <button
          class="btn btn-lg bg-vue2"
          :disabled="!isFormValid || isSaving"
          @click="createProduct()"
        >
          <span v-if="!isSaving">Speichern</span>
          <span v-else class="spinner-border spinner-border-sm"></span>
        </button>
      </div>

      <div v-if="error" class="alert alert-danger mt-4">
        {{ error }}
      </div>

      <div class="row g-4">
        <div class="col-lg-6">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-body">
              <div class="mb-3">
                <label for="product-title" class="form-label">Titel</label>
                <input
                  id="product-title"
                  v-model.trim="product.title"
                  type="text"
                  class="form-control"
                  placeholder="z. B. Vue Tasse"
                />
              </div>

              <div class="mb-3">
                <label for="product-price" class="form-label">Preis</label>
                <input
                  id="product-price"
                  v-model.number="product.price"
                  type="number"
                  min="0.01"
                  step="0.01"
                  class="form-control"
                  placeholder="29.99"
                />
              </div>

              <div class="mb-0">
                <label for="product-description" class="form-label">
                  Beschreibung
                </label>
                <textarea
                  id="product-description"
                  v-model.trim="product.description"
                  rows="8"
                  class="form-control"
                  placeholder="Beschreibe kurz, was dein Artikel besonders macht."
                ></textarea>
              </div>

              <div class="mt-3">
                <label for="product-image" class="form-label">Produktbild</label>
                <input
                  id="product-image"
                  ref="imageInput"
                  type="file"
                  accept="image/*"
                  class="form-control"
                  @change="handleImageSelection"
                />
                <div class="form-text">
                  Wenn du kein Bild auswaehlst, bekommt der Artikel automatisch ein
                  Zufallsbild.
                </div>

                <div
                  v-if="selectedImageName"
                  class="d-flex flex-wrap justify-content-between align-items-center gap-2 mt-2"
                >
                  <small class="text-muted">
                    Ausgewaehlt: {{ selectedImageName }}
                  </small>
                  <button
                    type="button"
                    class="btn btn-sm btn-outline-secondary"
                    @click="clearSelectedImage"
                  >
                    Bild entfernen
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-6">
          <div class="card border-0 shadow-sm h-100 overflow-hidden">
            <img
              :src="previewImage"
              :alt="previewTitle"
              class="card-img-top preview-image"
            />

            <div class="card-body d-flex flex-column">
              <div class="d-flex justify-content-between align-items-start gap-3 mb-3">
                <h5 class="card-title mb-0">{{ previewTitle }}</h5>
                <span class="badge bg-vue2 fs-6">{{ formattedPrice }}</span>
              </div>

              <p class="card-text mb-0">{{ previewDescription }}</p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </TheShopLayout>
</template>

<script>
import TheShopLayout from '@/layouts/TheShopLayout.vue'
import { createRandomProductImage } from '@/utils/product-images'

export default {
  name: 'CreateProductPage',
  components: {
    TheShopLayout,
  },
  data() {
    return {
      error: '',
      fallbackImageUrl: createRandomProductImage(),
      isSaving: false,
      selectedImageName: '',
      product: {
        title: '',
        description: '',
        imageUrl: '',
        price: null,
      },
    }
  },
  computed: {
    formattedPrice() {
      return `${Number(this.product.price || 0).toFixed(2)} €`
    },
    isFormValid() {
      return (
        this.product.title.trim().length > 0 &&
        this.product.description.trim().length > 0 &&
        Number(this.product.price) > 0
      )
    },
    previewDescription() {
      return (
        this.product.description.trim() ||
        'Hier erscheint die Beschreibung deines Artikels, sobald du sie eingibst.'
      )
    },
    previewImage() {
      return this.product.imageUrl || this.fallbackImageUrl
    },
    previewTitle() {
      return this.product.title.trim() || 'Dein Produkttitel'
    },
  },
  methods: {
    async createProduct() {
      if (!this.isFormValid) {
        this.error = 'Bitte fuelle Titel, Preis und Beschreibung aus.'
        return
      }

      this.isSaving = true
      this.error = ''

      try {
        const product = await this.$store.dispatch('storeProduct', {
          ...this.product,
          imageUrl: this.product.imageUrl || this.fallbackImageUrl,
        })

        this.$router.push({
          name: 'ReadProduct',
          params: { id: product.id },
        })
      } catch (error) {
        this.error = error.message
      } finally {
        this.isSaving = false
      }
    },
    clearSelectedImage() {
      this.product.imageUrl = ''
      this.selectedImageName = ''

      if (this.$refs.imageInput) {
        this.$refs.imageInput.value = ''
      }
    },
    handleImageSelection(event) {
      const [file] = event.target.files || []

      if (!file) {
        this.clearSelectedImage()
        return
      }

      if (!file.type.startsWith('image/')) {
        this.error = 'Bitte waehle eine gueltige Bilddatei aus.'
        this.clearSelectedImage()
        return
      }

      const reader = new FileReader()

      reader.addEventListener('load', () => {
        if (typeof reader.result !== 'string') {
          this.error = 'Das ausgewaehlte Bild konnte nicht geladen werden.'
          this.clearSelectedImage()
          return
        }

        this.product.imageUrl = reader.result
        this.selectedImageName = file.name
        this.error = ''
      })

      reader.addEventListener('error', () => {
        this.error = 'Das ausgewaehlte Bild konnte nicht geladen werden.'
        this.clearSelectedImage()
      })

      reader.readAsDataURL(file)
    },
  },
}
</script>

<style scoped>
.preview-image {
  height: 260px;
  object-fit: cover;
}
</style>
