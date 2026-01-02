<script>
import TheNavbar from '@/components/TheNavbar.vue'

export default {
  name: 'TheShopLayout',
  components: {
    TheNavbar,
  },
}
</script>

<template>
  <div>
    <!-- Navbar -->
    <TheNavbar></TheNavbar>
    <!-- Main -->
    <main>
      <div class="container">
        <div class="row">
          <div class="col-12">
            <slot>
              <h1>Hauptbereich</h1>
            </slot>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped></style>
