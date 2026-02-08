<template>
  <TheShopLayout>
    <template #default>
      <div class="row">
        <div class="col-12">
          <h1 class="mt-4">
            Neuer Artikel
            <button class="btn btn-large bg-vue float-end">Speichern</button>
          </h1>
        </div>
        <div class="col-12">
          <div class="card mt-4">
            <div class="row g-0">
              <div class="col-md-4">
                <img
                  class="img-fluid rounded-start"
                  src="https://dummyimage.com/600x400/34495e/fff"
                  alt="dummy bild"
                />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <div class="row">
                    <div class="col-9">
                      <h5 class="card-title mb-4">{{ product.title }}</h5>
                    </div>
                    <div class="col-3">
                      <div class="d-grid">
                        <button class="btn bg-vue2">{{ product.price }} €</button>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12">
                      <p class="card-text">{{ product.description }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </TheShopLayout>
  <div></div>
</template>

<script>
import TheShopLayout from '@/layouts/TheShopLayout.vue'
export default {
  name: 'CreateProductPage',
  components: {
    TheShopLayout,
  },
  data() {
    return {
      product: {
        title: 'Produkt' + Math.ceil(Math.random() * 10_000),
        description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
                        dignissimos minus eius sapiente doloribus eveniet illum reiciendis eum vel
                        maiores praesentium magnam, atque, eaque temporibus ipsam fugit debitis
                        perferendis unde?`,
        price: Math.ceil(Math.random() * 100),
      },
    }
  },
}
</script>

<style scoped></style>
