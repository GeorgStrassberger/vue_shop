<script>
import AuthRegister from '@/components/auth/AuthRegister.vue'
import AuthLogin from '@/components/auth/AuthLogin.vue'
import TheTwoColumnsLayout from '@/layouts/TheTwoColumnsLayout.vue'

export default {
  name: 'HomePage',
  components: {
    TheTwoColumnsLayout,
    AuthRegister,
    AuthLogin,
  },
  data() {
    return {
      componentName: 'AuthRegister',
    }
  },
  methods: {
    changeComponent(payload) {
      this.componentName = payload.componentName
    },
  },
}
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
        <transition
          enter-active-class="animate__animated animate__bounceInRight"
          leave-active-class="animate__animated animate__bounceOutRight"
          mode="out-in"
        >
          <component :is="componentName" @change-component="changeComponent"> </component>
        </transition>
      </template>
    </TheTwoColumnsLayout>
  </div>
</template>

<style scoped></style>
