<script>
import { Field as VeeField, Form as VeeForm } from 'vee-validate'
import * as yup from 'yup'

export default {
  name: 'AuthLogin',
  components: {
    VeeForm,
    VeeField,
  },
  emits: {
    'change-component': (payload) => {
      if (payload.componentName !== 'AuthRegister') {
        return false
      }
      return true
    },
  },
  data() {
    const schema = yup.object().shape({
      email: yup
        .string()
        .required('E-Mail Adresse wird benötigt')
        .trim()
        .email('Das ist keine gütige E-Mail Adresse'),
      password: yup
        .string()
        .required('Passwort wird benötigt')
        .trim()
        .min(6, 'Das Passwort muss mindestens 6 zeichen lang sein'),
    })
    return {
      schema,
      error: '',
      isLoading: false,
    }
  },
  computed: {
    errorDisplayText() {
      if (this.error) {
        if (this.error.includes('INVALID_PASSWORD')) {
          return 'Das Passwort ist nicht gültig'
        }
        if (this.error.includes('EMAIL_NOT_FOUND')) {
          return 'E-Mail Adresse konnte nicht gefunden werden.'
        }
        return 'Es ist ein unbekannter Fehler aufgetreten. Bitte versuchen Sie es noch einmal.'
      }
      return ''
    },
  },
  methods: {
    submitData(values) {
      this.isLoading = true
      this.error = ''
      this.$store
        .dispatch('signin', {
          email: values.email,
          password: values.password,
        })
        .then(() => {
          // Weiterleitung
          this.$router.push({ path: '/shop' })
        })
        .catch((err) => {
          this.error = err.message
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    changeComponent(componentName) {
      this.$emit('change-component', { componentName })
    },
  },
}
</script>

<template>
  <div>
    <div class="my-5 text-center offset-2 col-8">
      <img class="img-fluid" src="/src/assets/lock.svg" alt="" />
    </div>
    <div class="text-center text-vue">
      <h2>Jetzt anmelden</h2>
      <p>
        oder
        <a class="text-vue2" role="button" @click="changeComponent('AuthRegister')"
          >erstellen Sie ein Konto.</a
        >
      </p>
    </div>
    <div class="alert alert-danger col-md-8 offset-md-2" v-if="error">
      {{ errorDisplayText }}
    </div>
    <VeeForm @submit="submitData" :validation-schema="schema" v-slot="{ errors }">
      <div class="row needs-validation text-vue" novalidate>
        <!-- EMAIL -->
        <div class="mb-3 col-8 offset-2">
          <label class="form-label" for="email"><strong>E-Mail-Adresse</strong></label>
          <VeeField as="input" name="email" type="email" class="form-control" id="email" />
          <small class="text-danger" v-if="errors.email">{{ errors.email }}</small>
        </div>
        <!-- PASSWORD -->
        <div class="mb-3 col-8 offset-2">
          <label class="form-label" for="password"><strong>Passwort</strong></label>
          <VeeField as="input" name="password" type="password" class="form-control" id="password" />
          <small class="text-danger" v-if="errors.password">{{ errors.password }}</small>
        </div>
        <!-- BUTTON -->
        <div class="mb-3 col-8 offset-2">
          <div class="d-grid">
            <button class="btn btn-dark bg-vue">
              <span v-if="!isLoading">Einloggen</span>
              <span v-else class="spinner-border spinner-border-sm" role="status"></span>
            </button>
          </div>
        </div>
      </div>
    </VeeForm>
  </div>
</template>

<style scoped></style>
