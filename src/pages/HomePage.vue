<script setup>
import Register from '@/components/auth/Register.vue'
import TheTwoColumnsLayout from '@/layouts/TheTwoColumnsLayout.vue'
</script>

<template>
  <div>
    <TheTwoColumnsLayout
      :leftColumnClass="'col-md-8 bg-vue'"
      :rightColumnClass="'col-md-4'"
      :fullsize="true"
    >
      <template #leftCol>
        <div class="mt-5 text-center">
          <div class="display-1 my-5">Der Shop</div>
          <div class="display-4 my-5">Erhalten Sie Zugriff auf exklusive Artikel</div>
          <div class="my-5 offset-md-4 col-md-4">
            <img
              class="img-fluid"
              src="/src/assets/shopping.svg"
              alt="Frau mit Einkaufswagen in der Hand vor einem Regal"
            />
          </div>
        </div>
      </template>
      <template #rightCol>
        <Register />
      </template>
    </TheTwoColumnsLayout>
  </div>
</template>

<style scoped></style>
