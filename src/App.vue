<script setup>
import { onBeforeMount } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

onBeforeMount(() => {
  store.dispatch('autoSignin')
})
</script>

<template>
  <RouterView></RouterView>
</template>

<style scoped></style>
