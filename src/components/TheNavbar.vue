<template>
  <nav class="navbar navbar-expand-lg bg-vue navbar-dark">
    <div class="container">
      <RouterLink to="/shop" class="navbar-brand">Der Shop</RouterLink>
      <ul class="navbar-nav me-auto">
        <li class="nav-item active">
          <RouterLink to="/shop" class="nav-link">Startseite</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/shop/create/product" class="nav-link">Neuer Artikel</RouterLink>
        </li>
      </ul>
      <button class="btn bg-vue me-3">
        <i class="fa-solid fa-basket-shopping"></i>
        <span>Warenkorb (10€)</span>
      </button>
      <button class="btn bg-vue2" @click="signout()">
        <i class="fa-solid fa-arrow-right-from-bracket"></i>
        <span>Logout</span>
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'TheNavbar',
  methods: {
    async signout() {
      try {
        await this.$store.dispatch('signout')
        this.$router.push('/')
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>

<style scoped></style>
