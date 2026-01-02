<script>
export default {
  name: 'TheShopLayout',
}
</script>

<template>
  <div>
    <!-- Navbar -->

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
