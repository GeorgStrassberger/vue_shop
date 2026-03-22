<template>
  <div>
    <TheNavbar />
    <main>
      <div class="container">
        <div class="row">
          <div class="col-12">
            <transition
              enter-active-class="animate__animated animate__fadeIn"
              leave-active-class="animate__animated animate__fadeOut"
              mode="out-in"
              appear
            >
              <div :key="$route.path">
                <slot><h1>Hauptbereich</h1></slot>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import TheNavbar from '@/components/TheNavbar.vue'

export default {
  name: "TheShopLayout",
  components: {
    TheNavbar,
  },
}
</script>

<style scoped>
</style>
