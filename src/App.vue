<template>
  <router-view />
</template>

<script>
export default {
  name: 'App',
  computed: {
    token() {
      return this.$store.getters.token
    },
  },
  methods: {
    async syncProducts() {
      if (!this.token) {
        return null
      }

      try {
        return await this.$store.dispatch('fetchProducts')
      } catch {
        return null
      }
    },
  },
  created() {
    this.$store.dispatch('autoSignin')
  },
  watch: {
    token: {
      async handler() {
        await this.syncProducts()
      },
      immediate: true,
    },
  },
}
</script>

<style>
.bg-vue {
  background-color: rgb(52, 73, 94);
  color: white;
}
.bg-vue2 {
  background-color: rgb(65, 184, 131);
  color: white;
}
.text-vue {
  color: rgb(52, 73, 94);
}
.text-vue2 {
  color: rgb(65, 184, 131);
}
</style>
