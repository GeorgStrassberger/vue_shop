<script setup>
import TheTwoColumnsLayout from './layouts/TheTwoColumnsLayout.vue'
</script>

<template>
  <div class="container">
    <TheTwoColumnsLayout
      :leftColumnClass="'col-md-6 bg-vue'"
      :rightColumnClass="'col-md-6 bg-vue2'"
      :fullsize="true"
    />
  </div>
</template>

<style scoped></style>
